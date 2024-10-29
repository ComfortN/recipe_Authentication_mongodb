import express from "express"
import recipeController from "../controllers/recipeController.js"
import { validateCreateRecipe, validatePagination, validateRecipeId, validateUpdateRecipe } from "../middleware/recipeValidation.js"

const router = express.Router()

router.post('/recipes', validateCreateRecipe, recipeController.CreateRecipe)
router.get('/recipes', validatePagination, recipeController.getRecipes)
router.get('/recipes/:id', validateRecipeId, recipeController.getRecipe)
router.put('/recipes/:id', [...validateRecipeId, validateUpdateRecipe], recipeController.updateRecipe)
router.delete('/recipes/:id', validateRecipeId, recipeController.deleteRecipe)


export default router;