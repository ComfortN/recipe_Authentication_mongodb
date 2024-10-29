import Recipe from "../models/recipe.js";


// Creating a new recipe
const CreateRecipe = async (req, res) => {
    try {
        const item = await Recipe.create(req.body)
        res.status(201).json(item)
    } catch (error) {
        res.status(500).json({error: "An error occured while creating the item"})
    }
};


// Get all recipes with pagination
const getRecipes = async (req, res) => {
    try {
        const {page = 1, limit =5} =req.query;
        const skip = (page - 1) * limit;
        const recipes = await Recipe.find().skip(skip).limit(limit).sort('-createdAt')

        const totalRecipes = await Recipe.countDocuments()

        res.status(200).json({recipes, totalRecipes, page, limit})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "An error occured while fetching recipes"})
    }
};


// Get a recipe by id
const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({
                success: false,
                error: 'Recipe not found'
        });
        }
        res.status(200).json({
        success: true,
        data: recipe
        });
    } catch (error) {
        res.status(500).json({error: "An error occurred while fetching recipes"})
    }
};


// Update recipe
const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true});

        if (!recipe) {
            return res.status(404).json({
            success: false,
            error: 'Recipe not found'
            });
        }

        res.status(200).json({
            success: true,
            data: recipe
        });
    } catch (error) {
        res.status(500).json({error: "An error occurred while updating recipe"})
    }
};


// Delete recipe
const deleteRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        
        if (!recipe) {
            return res.status(404).json({success: false,  error: 'Recipe not found'});
        }

        res.status(200).json({
        success: true,
        data: {}
        });
    } catch (error) {
        next(error);
    }
};


export default {CreateRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe};