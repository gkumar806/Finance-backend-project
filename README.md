# Finance Backend API

## Overview
A backend system for managing financial transactions with role-based access control (RBAC) and dashboard analytics. It allows users to securely manage financial records based on their roles.

## Tech Stack
* Node.js
* Express.js
* MongoDB
* JWT Authentication
  
 Features
* User Registration and Login
* Role-Based Access Control (Viewer, Analyst, Admin)
* Transaction CRUD (Create, Read, Update, Delete)
* Dashboard Summary (Income, Expense, Balance)
* Filtering and Pagination
* Secure APIs using JWT

## API Endpoints

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Transactions
* GET /api/transactions
* POST /api/transactions
* PUT /api/transactions/:id
* DELETE /api/transactions/:id

### Dashboard
* GET /api/transactions/summary

### Filter
* GET /api/transactions/filter

## Setup Instructions
1. Clone the repository
2. Install dependencies:  '''npm install'''
3. Create a `.env` file:
   PORT=5000  
   MONGO_URI=your_mongodb_uri  
   JWT_SECRET=your_secret  
5. Run the server:  '''npm run dev'''
   
## Key Concepts Implemented
* JWT Authentication
* Role-Based Access Control (RBAC)
* REST API Design
* Data Filtering and Pagination
* Error Handling and Validation
  
## Roles and Permissions
 Viewer: Read-only access              
 Analyst: Read and dashboard summary    
 Admin: Full access (CRUD operations) 

