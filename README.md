1. Finance Backend API

A backend system for managing financial transactions with role-based access control and dashboard analytics.

->Tech Stack
  Node.js
  Express.js
  MongoDB
  JWT Authentication

->Features
 User Registration & Login
 Role-Based Access Control (Viewer, Analyst, Admin)
 Transaction CRUD (Create, Read, Update, Delete)
 Dashboard Summary (Income, Expense, Balance)
 Filtering & Pagination
 Secure APIs using JWT

 -->API Endpoints
->Auth
 POST /api/auth/register
POST /api/auth/login

->Transactions
GET /api/transactions
POST /api/transactions
PUT /api/transactions/
DELETE /api/transactions/

->Dashboard
GET /api/transactions/summary

->Filter
GET /api/transactions/filter

-->Setup Instructions
Clone repo
Run npm install

Create .env:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
Run npm run dev

-->Key Concepts
 JWT Authentication
Role-Based Access Control (RBAC)
REST API Design
Data Filtering & Pagination
Error Handling

-->Roles
Viewer → Read only
Analyst → Read + Summary
Admin → Full access