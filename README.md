# Recipe API

A RESTful API for managing recipes built with Node.js, Express, and MongoDB. This API allows authenticated users to create, read, update, and delete recipes, with features including authentication, authorization, data validation, and pagination.

## Features

- User authentication with JWT (JSON Web Tokens)
- Role-based access control (RBAC)
- CRUD operations for recipes
- Input validation for all endpoints
- Pagination support for listing recipes
- MongoDB database integration
- Error handling with informative messages
- Data validation for required fields, data types, and custom rules

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ComfortN/recipe_Authentication_mongodb.git
cd recipe_Authentication_mongodb
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your configuration:
```
PORT=8080
MONGO_URI=mongodb://your-mongodb-uri
JWT_SECRET=your_jwt_secret_key_here
```

4. Start the server:
```bash
npm run dev
```

## Authentication

### Register User
- **POST** `/api/auth/register`
- Creates a new user account
- Request body example:
```json
{
  "username": "comfort",
  "email": "comfort@example.com",
  "password": "password123",
  "role": "admin or user"
}
```
- Response includes JWT token

### Login User
- **POST** `/api/auth/login`
- Authenticates a user
- Request body example:
```json
{
  "email": "comfort@example.com",
  "password": "password123"
}
```
- Response includes JWT token

## API Endpoints

All protected routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Create Recipe (Protected - Admin Only)
- **POST** `/api/recipes`
- Creates a new recipe
- Requires admin role
- Request body example:
```json
{
  "title": "Spaghetti Carbonara",
  "description": "Classic Italian pasta dish",
  "ingredients": [
    {
      "name": "spaghetti",
      "quantity": 500,
      "unit": "grams"
    },
    {
      "name": "eggs",
      "quantity": 3,
      "unit": "pieces"
    }
  ],
  "instructions": [
    "Boil the pasta",
    "Mix eggs with cheese",
    "Combine all ingredients"
  ],
  "cookingTime": 30,
  "difficulty": "Medium",
  "servings": 4
}
```

### Get All Recipes (Public)
- **GET** `/api/recipes`
- Supports pagination
- Query parameters:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 5)
- Example: `/api/recipes?page=1&limit=10`

### Get Recipe by ID (Public)
- **GET** `/api/recipes/:id`
- Retrieves a specific recipe by ID

### Update Recipe (Protected - Admin Only)
- **PUT** `/api/recipes/:id`
- Updates an existing recipe
- Requires admin role
- Supports partial updates

### Delete Recipe (Protected - Admin Only)
- **DELETE** `/api/recipes/:id`
- Deletes a specific recipe
- Requires admin role

## Data Validation

### User Validation
- Username: minimum 3 characters
- Email: valid email format
- Password: minimum 6 characters

### Recipe Validation
- Recipe title (3-100 characters, alphanumeric)
- Description (10-500 characters)
- Ingredients (name, quantity, unit)
- Instructions (minimum 5 characters each)
- Cooking time (1-1440 minutes)
- Difficulty level (Easy, Medium, Hard)
- Servings (1-50)

## Authorization Roles

- **Admin**: Can perform all operations (create, read, update, delete)
- **User**: Can only view recipes
- **Public**: Can view recipes without authentication

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 200: Success
- 201: Resource created
- 400: Bad request (validation errors)
- 401: Unauthorized (invalid or missing token)
- 403: Forbidden (insufficient permissions)
- 404: Resource not found
- 500: Server error

## Testing

You can test the API using Postman or Insomnia:
1. Import the API collection (if provided)
2. Set up your environment variables
3. Register a user account
4. Login to get JWT token
5. Add token to request headers
6. Test each endpoint with various scenarios


## Security Considerations

- JWT tokens expire after 30 days
- Passwords are hashed using bcrypt
- Input validation on all routes
- Protected routes require valid JWT tokens
- Role-based access control
- Environment variables for sensitive data

