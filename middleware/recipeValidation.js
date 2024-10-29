import { body, param, query, validationResult } from 'express-validator';

// Utility function to handle validation results
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
            field: err.path,
            message: err.msg
        }))
        });
    }
    next();
};

// Validation rules for creating a recipe
export const validateCreateRecipe = [
  // Title validation
    body('title')
        .trim()
        .notEmpty().withMessage('Recipe title is required')
        .isString().withMessage('Title must be text')
        .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters')
        .matches(/^[a-zA-Z0-9\s-]+$/).withMessage('Title can only contain letters, numbers, spaces, and hyphens'),

  // Description validation
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be text')
        .isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),

  // Ingredients validation
    body('ingredients')
        .isArray().withMessage('Ingredients must be an array')
        .notEmpty().withMessage('At least one ingredient is required'),

    body('ingredients.*.name')
        .trim()
        .notEmpty().withMessage('Ingredient name is required')
        .isString().withMessage('Ingredient name must be text')
        .isLength({ min: 2, max: 50 }).withMessage('Ingredient name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s-]+$/).withMessage('Ingredient name can only contain letters, spaces, and hyphens'),

    body('ingredients.*.quantity')
        .notEmpty().withMessage('Quantity is required')
        .isFloat({ min: 0 }).withMessage('Quantity must be a positive number')
        .custom((value) => {
        if (typeof value !== 'number') {
            throw new Error('Quantity must be a number');
        }
        return true;
    }),

    body('ingredients.*.unit')
        .trim()
        .notEmpty().withMessage('Unit is required')
        .isString().withMessage('Unit must be text')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Unit can only contain letters and spaces'),

  // Instructions validation
    body('instructions')
        .isArray().withMessage('Instructions must be an array')
        .notEmpty().withMessage('At least one instruction is required'),

    body('instructions.*')
        .trim()
        .notEmpty().withMessage('Instruction cannot be empty')
        .isString().withMessage('Instructions must be text')
        .isLength({ min: 5 }).withMessage('Each instruction must be at least 5 characters long'),

  // Cooking time validation
    body('cookingTime')
        .notEmpty().withMessage('Cooking time is required')
        .isInt({ min: 1, max: 1440 }).withMessage('Cooking time must be between 1 and 1440 minutes')
        .custom((value) => {
        if (typeof value !== 'number') {
            throw new Error('Cooking time must be a number');
        }
        return true;
    }),

  // Difficulty validation
    body('difficulty')
        .trim()
        .notEmpty().withMessage('Difficulty is required')
        .isString().withMessage('Difficulty must be text')
        .isIn(['Easy', 'Medium', 'Hard']).withMessage('Difficulty must be either Easy, Medium, or Hard'),

  // Servings validation
    body('servings')
        .notEmpty().withMessage('Servings is required')
        .isInt({ min: 1, max: 50 }).withMessage('Servings must be between 1 and 50')
        .custom((value) => {
        if (typeof value !== 'number') {
            throw new Error('Servings must be a number');
        }
        return true;
    }),

  // Apply validation
    handleValidationErrors
];

// Validation rules for updating a recipe
export const validateUpdateRecipe = [
  // Optional title validation
    body('title')
        .optional()
        .trim()
        .isString().withMessage('Title must be text')
        .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters')
        .matches(/^[a-zA-Z0-9\s-]+$/).withMessage('Title can only contain letters, numbers, spaces, and hyphens'),

  // Optional description validation
    body('description')
        .optional()
        .trim()
        .isString().withMessage('Description must be text')
        .isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),

  // Optional ingredients validation
    body('ingredients')
        .optional()
        .isArray().withMessage('Ingredients must be an array')
        .notEmpty().withMessage('At least one ingredient is required'),

    body('ingredients.*.name')
        .optional()
        .trim()
        .isString().withMessage('Ingredient name must be text')
        .isLength({ min: 2, max: 50 }).withMessage('Ingredient name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s-]+$/).withMessage('Ingredient name can only contain letters, spaces, and hyphens'),

    body('ingredients.*.quantity')
        .optional()
        .isFloat({ min: 0 }).withMessage('Quantity must be a positive number')
        .custom((value) => {
        if (typeof value !== 'number') {
            throw new Error('Quantity must be a number');
        }
        return true;
    }),

    body('ingredients.*.unit')
        .optional()
        .trim()
        .isString().withMessage('Unit must be text')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Unit can only contain letters and spaces'),

  // Apply validation
    handleValidationErrors
];

// Validation for pagination parameters
export const validatePagination = [
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page must be a positive integer')
        .toInt(),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
        .toInt(),

    handleValidationErrors
];

// Validation for ID parameter
export const validateRecipeId = [
    param('id')
        .notEmpty().withMessage('Recipe ID is required')
        .isMongoId().withMessage('Invalid recipe ID format'),

    handleValidationErrors
];