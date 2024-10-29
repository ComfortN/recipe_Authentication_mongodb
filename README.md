# Recipe API

A RESTful API for managing recipes built with Node.js, Express, and MongoDB. This API allows users to create, read, update, and delete recipes, with features including data validation and pagination.

## Features

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
git clone https://github.com/ComfortN/recipe_mongoDB.git
cd recipe_mongoDB
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
```
PORT=8080
MONGO_URI=mongodb://your-mongodb-uri
```

4. Start the server:
```bash
npm start
```

## API Endpoints

### Create Recipe
- **POST** `/api/recipes`
- Creates a new recipe
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

### Get All Recipes
- **GET** `/api/recipes`
- Supports pagination
- Query parameters:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 5)
- Example: `/api/recipes?page=1&limit=10`

### Get Recipe by ID
- **GET** `/api/recipes/:id`
- Retrieves a specific recipe by ID

### Update Recipe
- **PUT** `/api/recipes/:id`
- Updates an existing recipe
- Supports partial updates

### Delete Recipe
- **DELETE** `/api/recipes/:id`
- Deletes a specific recipe

## Data Validation

The API includes comprehensive validation for:
- Recipe title (3-100 characters, alphanumeric)
- Description (10-500 characters)
- Ingredients (name, quantity, unit)
- Instructions (minimum 5 characters each)
- Cooking time (1-1440 minutes)
- Difficulty level (Easy, Medium, Hard)
- Servings (1-50)

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 200: Success
- 201: Resource created
- 400: Bad request (validation errors)
- 404: Resource not found
- 500: Server error

## Testing

You can test the API using Postman or Insomnia:
1. Import the API collection (if provided)
2. Set up your environment variables
3. Test each endpoint with various scenarios
