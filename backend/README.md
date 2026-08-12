# MSME Digital Operations Backend

Express + MySQL backend for the MSME Digital Operations Platform.

## Setup

```bash
cd backend
npm install
node server.js
```

The server runs on:

```text
http://localhost:5000
```

## Required Packages

This project already includes these dependencies in `package.json`:

```bash
npm install express mysql2 cors dotenv bcryptjs jsonwebtoken
```

## Environment

Update `.env` with your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=msme_operations
```

## API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET|POST /api/inventory`
- `GET|PUT|DELETE /api/inventory/:id`
- `GET|POST /api/orders`
- `GET|PUT|DELETE /api/orders/:id`
- `GET|POST /api/vendors`
- `GET|PUT|DELETE /api/vendors/:id`
- `GET|POST /api/employees`
- `GET|PUT|DELETE /api/employees/:id`
- `GET|POST /api/attendance`
- `GET|PUT|DELETE /api/attendance/:id`
- `GET|POST /api/production`
- `GET|PUT|DELETE /api/production/:id`
- `GET|POST /api/notifications`
- `GET|PUT|DELETE /api/notifications/:id`
- `GET /api/reports/inventory`
- `GET /api/reports/sales`
- `GET /api/reports/employees`
- `GET /api/dashboard`

## MySQL Schema

Run this in MySQL before starting the backend.

```sql
CREATE DATABASE IF NOT EXISTS msme_operations;
USE msme_operations;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vendors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vendor_name VARCHAR(120) NOT NULL,
  phone VARCHAR(30),
  email VARCHAR(120),
  material_supplied VARCHAR(120),
  payment_status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(120) NOT NULL,
  category VARCHAR(80) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  unit VARCHAR(30) NOT NULL,
  minimum_stock INT NOT NULL DEFAULT 0,
  supplier_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (supplier_id) REFERENCES vendors(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(120) NOT NULL,
  product_name VARCHAR(120) NOT NULL,
  quantity INT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Pending',
  delivery_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  department VARCHAR(80) NOT NULL,
  role VARCHAR(80) NOT NULL,
  salary DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(30) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS production (
  id INT AUTO_INCREMENT PRIMARY KEY,
  batch_number VARCHAR(80) NOT NULL,
  product_name VARCHAR(120) NOT NULL,
  quantity INT NOT NULL,
  start_date DATE,
  end_date DATE,
  status VARCHAR(50) NOT NULL DEFAULT 'Planned',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  read_status BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Frontend Connection

In React, set:

```env
REACT_APP_API_URL=http://localhost:5000/api
```
