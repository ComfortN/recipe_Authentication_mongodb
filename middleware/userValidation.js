import { body } from 'express-validator';
import { handleValidationErrors } from './recipeValidation.js';

export const validateRegister = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email'),
    
    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    
    handleValidationErrors
];

export const validateLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email'),
    
    body('password')
        .trim()
        .notEmpty().withMessage('Password is required'),
    
    handleValidationErrors
];