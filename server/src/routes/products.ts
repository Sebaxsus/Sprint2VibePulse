import { Router } from 'express';
import {
  getProducts,
  getProductById,
  getFeaturedProducts,
} from '../controllers/productController';

const router: Router = Router();

// GET /api/products/featured  (debe ir ANTES de /:id)
router.get('/featured', getFeaturedProducts);

// GET /api/products?categoryId=&search=&page=&limit=
router.get('/', getProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

export default router;
