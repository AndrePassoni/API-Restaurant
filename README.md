# API Restaurant

API Restaurant is a Node.js REST API for managing restaurant tables, table sessions, products, and orders. It uses Express, Knex, SQLite, Zod, and TypeScript.

## Features

- List, create, update, and delete products.
- List restaurant tables.
- Open and close table sessions.
- Create orders for an open table session.
- Retrieve orders by table session and calculate totals.

## Tech Stack

- Node.js
- Express
- TypeScript
- Knex
- SQLite3
- Zod

## Requirements

- Node.js 20 or newer is recommended.
- npm

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the database migrations:

```bash
npm run knex -- migrate:latest
```

3. Seed the database with initial data:

```bash
npm run knex -- seed:run
```

4. Start the development server:

```bash
npm run dev
```

The server runs on port `3333`.

## Available Scripts

- `npm run dev` - starts the API in watch mode using `tsx`.
- `npm run knex -- migrate:latest` - runs pending migrations.
- `npm run knex -- migrate:rollback` - rolls back the last migration batch.
- `npm run knex -- seed:run` - runs database seeds.

## Database

The project uses a local SQLite database stored at `src/database/database.db`.

Main tables:

- `products` - menu items with name and price.
- `tables` - restaurant tables identified by table number.
- `tables_sessions` - tracks when a table is opened or closed.
- `orders` - stores ordered products, quantities, and item price snapshots.

Seed data includes:

- 11 products.
- Tables 1 through 5.

## API Endpoints

Base URL: `http://localhost:3333`

### Products

`GET /products`

Returns all products. Supports optional search by name:

```bash
/products?name=frango
```

`POST /products`

Creates a new product.

Request body:

```json
{
  "name": "Coconut Shrimp",
  "price": 42.5
}
```

`PUT /products/:id`

Updates an existing product.

`DELETE /products/:id`

Deletes a product.

### Tables

`GET /tables`

Returns all tables ordered by table number.

### Table Sessions

`GET /tables-sessions`

Returns all table sessions.

`POST /tables-sessions`

Opens a new session for a table.

Request body:

```json
{
  "table_id": 1
}
```

`PATCH /tables-sessions/:id`

Closes an open table session.

### Orders

`POST /orders`

Creates an order inside an open table session.

Request body:

```json
{
  "table_session_id": 1,
  "product_id": 2,
  "quantity": 3
}
```

`GET /orders/table-session/:table_session_id`

Returns all orders for the given table session, including product name and line total.

`GET /orders/table-session/:table_session_id/total`

Returns the total quantity and total amount for the session.

## Validation and Errors

The API uses Zod for request validation.

Typical error responses:

```json
{
  "message": "validation error",
  "issues": {}
}
```

Domain errors are returned in the form:

```json
{
  "message": "product not found"
}
```

## Notes

- Product names must have at least 6 characters.
- Product prices must be greater than 0.
- A table cannot be opened twice while a session is still active.
- Orders can only be created for an open session.
- The order price is stored at creation time, so historical totals stay consistent even if product prices change later.

## Project Structure

```text
src/
  controllers/
  database/
    migrations/
    seeds/
    types/
  middlewares/
  routes/
  utils/
```

## License

ISC