# CANTEEN42 Backend

A standalone, API-ready, modular dropshipping platform backend.

## Project Overview

CANTEEN42 is a comprehensive dropshipping platform with the following components:

- **Backend API**: Express.js server with modular architecture
- **Admin Panel**: Dashboard for product, user, and order management
- **Checkout System**: Integrated with Stripe for secure payments
- **Analytics**: Track user behavior and sales performance
- **Email System**: Automated transactional emails

## Phase 1 Scope (MVP)

- **Products**: CRUD operations, categories, inventory management
- **Users**: Authentication, profiles, roles (customer, admin)
- **Orders**: Processing, status tracking, Stripe integration
- **Admin Controls**: Dashboard, user management, product management
- **Checkout**: Stripe integration, cart functionality
- **Email Triggers**: Order confirmations, shipping updates

## Tech Stack

- **Server**: Node.js with Express
- **Database**: PostgreSQL for relational data
- **Authentication**: Firebase Authentication
- **Payment Processing**: Stripe
- **Cloud Services**: Firebase for additional services

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Firebase account
- Stripe account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/kevink51/Canteen42-Backend-Devin.git
   cd Canteen42-Backend-Devin
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

4. Update the `.env` file with your credentials.

5. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Orders
- `GET /api/orders` - Get all orders (admin) or user orders (customer)
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id` - Update an order
- `DELETE /api/orders/:id` - Delete an order

### Admin
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/products` - Manage products
- `GET /api/admin/users` - Manage users
- `GET /api/admin/orders` - Manage orders
- `GET /api/admin/analytics` - Get analytics data

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── models/         # Data models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
└── server.js       # Main application file
```

## Development Team

- **Main Developer**: Devin
- **Strategic Lead**: Kevin

## License

This project is proprietary and confidential.
