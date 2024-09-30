
# **GrubDash API**

## **Project Overview**
The **GrubDash API** was developed as part of the Thinkful curriculum to manage dishes and orders for a food delivery service. This project demonstrates the implementation of **RESTful API principles** and **complex validation** using **Node.js** and **Express.js**. The API supports the creation, reading, updating, and deleting of dishes and orders, following proper REST architecture.

## **Key Features**
- **CRUD Operations**: Complete support for Create, Read, Update, and Delete functionality for dishes and orders.
- **Data Validation**: Ensures that all required fields are provided and valid, such as `name`, `description`, `price`, and `quantity`.
- **Error Handling**: Comprehensive error handling for invalid or missing data.
- **Express.js Middleware**: Efficient request processing using modular middleware functions.
- **RESTful Design**: The API is designed to follow RESTful principles, making it scalable and maintainable.

## **API Endpoints**

### **Dishes Routes**
- **GET /dishes**: Retrieve a list of all dishes.
- **POST /dishes**: Add a new dish.
- **GET /dishes/:dishId**: Retrieve a specific dish by its ID.
- **PUT /dishes/:dishId**: Update a dish by its ID.

### **Orders Routes**
- **GET /orders**: Retrieve a list of all orders.
- **POST /orders**: Add a new order.
- **GET /orders/:orderId**: Retrieve a specific order by its ID.
- **PUT /orders/:orderId**: Update an order by its ID.
- **DELETE /orders/:orderId**: Delete an order by its ID (only if the order status is pending).

## **Project Setup**

### **Installation**
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project folder**:
   ```bash
   cd grubdash-backend
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

### **Running the Server**
Start the server by running:
```bash
npm start
```

The server will run on `http://localhost:5000` (or a different port if set in the `.env` file).

### **Testing**
To ensure the API is functioning correctly, run the test suite:
```bash
npm test
```

## **Technologies Used**
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for building RESTful APIs.
- **Jest**: Testing framework used for unit and integration testing.

## **Learning Outcomes**
Through this project, the following skills were reinforced:
- Building and testing APIs with **complex validation** and **error handling**.
- Implementing **CRUD operations** using proper HTTP methods and routing.
- Designing APIs using **RESTful design principles**.
- Writing custom **middleware** to manage validation and error handling.

