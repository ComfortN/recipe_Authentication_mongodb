import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Ingredient name is required']},
    quantity: {type: Number,required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']},
    unit: {type: String, required: [true, 'Unit is required']}
});

const recipeSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Recipe title is required'],
        trim: true, minlength: [3, 'Title must be at least 3 characters long'] },

    description: {type: String, required: [true, 'Description is required'],
        trim: true},

    ingredients: [ingredientSchema],

    instructions: {type: [String], required: [true, 'Instructions are required'],
        validate: [arr => arr.length > 0, 'At least one instruction is required']},

    cookingTime: {type: Number, required: [true, 'Cooking time is required'],
        min: [1, 'Cooking time must be at least 1 minute']},

    difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },

    servings: {type: Number, required: true, min: [1, 'Servings must be at least 1']},

    createdAt: {type: Date, default: Date.now}
});

export default mongoose.model('Recipe', recipeSchema);