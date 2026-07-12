# E-Commerce Backend API

A RESTful E-Commerce Backend API built with Node.js, Express.js, MongoDB, and Mongoose.

---

## Features

- Categories CRUD
- Products CRUD
- Shopping Cart
- Orders Management
- Central Error Handling
- Async Error Handling
- MongoDB Atlas Integration
- RESTful API Design

---
## GitHub Repository
- https://github.com/yassenmmdouh/ecommerce-backend.git
## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Postman
- Git & GitHub
- Morgan
- CORS
- Dotenv

---

## Project Structure
```
config/
controllers/
middleware
models/
routes/
seed/
utils/
postman/
server.js
package.json
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
NODE_ENV=development
```

Run the server

```bash
npm run dev
```

---

## API Endpoints

### Categories

| Method | Endpoint |
|---------|----------|
| GET | /api/categories |
| GET | /api/categories/:id |
| POST | /api/categories |
| PUT | /api/categories/:id |
| DELETE | /api/categories/:id |

---

### Products

| Method | Endpoint |
|---------|----------|
| GET | /api/products |
| GET | /api/products/:id |
| POST | /api/products |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |

---

### Cart

| Method | Endpoint |
|---------|----------|
| GET | /api/cart |
| POST | /api/cart |
| PUT | /api/cart/:productId |
| DELETE | /api/cart/:productId |

---

### Orders

| Method | Endpoint |
|---------|----------|
| GET | /api/orders |
| GET | /api/orders/:id |
| POST | /api/orders |

---

## Testing

All endpoints were tested using Postman.

The project includes:

- Postman Collection
- Postman Environment

---

## Author

**Yassen Ahmed**

Backend Development Project
