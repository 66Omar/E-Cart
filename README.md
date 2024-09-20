# E-Cart

## Introduction
:rocket: A backend REST API designed to manage products, users, and user carts in an e-commerce environment, built using TypeScript (NestJS) with PostgreSQL and Prisma ORM.

## Enviroment Variables
To run this application properly, you will need to configure the following variables in your .env file based on **.env.example**:
| Variable | Description |
| --- | --- |
| APP_SECRET | Used for signing and verifying JWT tokens |
| DATABASE_URL | URL for connecting to the remote PostgreSQL database |

## Running the application
To get the application running, follow these steps:
```
npm install
npm run start
```

## Important notes
- Admins have access to all CRUD operations, users can only manage their own resources
- Product quantity is not deducted when a product is added to the cart, as adding to the cart does not confirm a purchase.
