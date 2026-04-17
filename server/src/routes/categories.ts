import { Router } from 'express';
import { getCategories, getCategoryBySlug } from '../controllers/categoryController';

const router: Router = Router();

// GET /api/categories
router.get('/', getCategories);

// GET /api/categories/:slug
router.get('/:slug', getCategoryBySlug);

export default router;
