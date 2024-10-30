import express from "express"
import recipeController from "../controllers/recipeController.js"
import { validateCreateRecipe, validatePagination, validateRecipeId, validateUpdateRecipe } from "../middleware/recipeValidation.js"
import { validateRegister, validateLogin } from "../middleware/userValidation.js"
import { protect, authorize } from "../middleware/auth.js"
import { register, login } from "../controllers/userController.js"

const router = express.Router()

router.post('/auth/register', validateRegister, register);
router.post('/auth/login', validateLogin, login);

router.post('/recipes', protect, authorize('admin'), validateCreateRecipe, recipeController.CreateRecipe)
router.get('/recipes', validatePagination, recipeController.getRecipes)
router.get('/recipes/:id', validateRecipeId, recipeController.getRecipe)
router.put('/recipes/:id', protect, authorize('admin'), [...validateRecipeId, validateUpdateRecipe], recipeController.updateRecipe)
router.delete('/recipes/:id', protect, authorize('admin'), validateRecipeId, recipeController.deleteRecipe)


export default router;