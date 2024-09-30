const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

/* ===========================
   | Middleware Functions     |
   =========================== */

function orderExists(req, res, next) {
  const { orderId } = req.params;
  const foundOrder = orders.find((order) => order.id === orderId);
  if (foundOrder) {
    res.locals.order = foundOrder;
    return next();
  }
  next({
    status: 404,
    message: `Order does not exist: ${orderId}`,
  });
}

function validateOrder(req, res, next) {
  const { data: { deliverTo, mobileNumber, dishes } = {} } = req.body;
  const requiredFields = ["deliverTo", "mobileNumber", "dishes"];
  
  for (const field of requiredFields) {
    if (!req.body.data[field]) {
      return next({
        status: 400,
        message: `Order must include a ${field}`,
      });
    }
  }

  if (!Array.isArray(dishes) || dishes.length === 0) {
    return next({
      status: 400,
      message: "Order must include at least one dish",
    });
  }

  dishes.forEach((dish, index) => {
    if (!dish.quantity || dish.quantity <= 0 || !Number.isInteger(dish.quantity)) {
      return next({
        status: 400,
        message: `Dish ${index} must have a quantity that is an integer greater than 0`,
      });
    }
  });

  next();
}

function validateStatus(req, res, next) {
  const { data: { status } = {} } = req.body;
  const validStatuses = ["pending", "preparing", "out-for-delivery", "delivered"];
  
  if (!status || !validStatuses.includes(status)) {
    return next({
      status: 400,
      message: "Order must have a status of pending, preparing, out-for-delivery, delivered",
    });
  }

  if (status === "delivered") {
    return next({
      status: 400,
      message: "A delivered order cannot be changed",
    });
  }

  next();
}

/* ===========================
   | Route Handlers           |
   =========================== */

function list(req, res) {
  res.json({ data: orders });
}

function create(req, res) {
  const { data: { deliverTo, mobileNumber, status, dishes } = {} } = req.body;
  const newOrder = {
    id: nextId(),
    deliverTo,
    mobileNumber,
    status,
    dishes,
  };
  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
}

function read(req, res) {
  res.json({ data: res.locals.order });
}

function update(req, res, next) {
  const order = res.locals.order;
  const { data: { id, deliverTo, mobileNumber, status, dishes } = {} } = req.body;

  if (id && id !== order.id) {
    return next({
      status: 400,
      message: `Order id does not match route id. Order: ${id}, Route: ${order.id}`,
    });
  }

  order.deliverTo = deliverTo;
  order.mobileNumber = mobileNumber;
  order.status = status;
  order.dishes = dishes;

  res.json({ data: order });
}

function destroy(req, res, next) {
  const { order } = res.locals;
  if (order.status !== "pending") {
    return next({
      status: 400,
      message: "An order cannot be deleted unless it is pending",
    });
  }
  const index = orders.findIndex((o) => o.id === order.id);
  orders.splice(index, 1);
  res.sendStatus(204);
}

/* ===========================
   | Exports                  |
   =========================== */

module.exports = {
  list,
  create: [validateOrder, create],
  read: [orderExists, read],
  update: [orderExists, validateOrder, validateStatus, update],
  delete: [orderExists, destroy],
};
