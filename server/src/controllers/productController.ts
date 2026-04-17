import { Request, Response } from 'express';
import {
  findFeaturedProducts,
  findProductById,
  findProducts,
  ProductQueryFilters,
} from '../services/productService';

// GET /api/products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId, search, minPrice, maxPrice, featured, page = '1', limit = '12' } = req.query;

    const pageNum = Math.max(1, Number.parseInt(String(page), 10));
    const limitNum = Math.min(50, Math.max(1, Number.parseInt(String(limit), 10)));

    const filters: ProductQueryFilters = {
      categoryId: categoryId ? Number.parseInt(String(categoryId), 10) : undefined,
      search: search ? String(search).trim() : undefined,
      minPrice: minPrice ? Number.parseFloat(String(minPrice)) : undefined,
      maxPrice: maxPrice ? Number.parseFloat(String(maxPrice)) : undefined,
      featured: featured === 'true' ? true : undefined,
      page: pageNum,
      limit: limitNum,
    };

    const { data, total } = await findProducts(filters);

    res.json({
      success: true,
      data,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    console.error('getProducts error:', error);
    res.status(500).json({ success: false, message: 'Error al obtener productos' });
  }
};

// GET /api/products/:id
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number.parseInt(String(req.params.id), 10);

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: 'ID inválido' });
      return;
    }

    const product = await findProductById(id);

    if (!product) {
      res.status(404).json({ success: false, message: 'Producto no encontrado' });
      return;
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error('getProductById error:', error);
    res.status(500).json({ success: false, message: 'Error al obtener el producto' });
  }
};

// GET /api/products/featured
export const getFeaturedProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await findFeaturedProducts();

    res.json({ success: true, data: products });
  } catch (error) {
    console.error('getFeaturedProducts error:', error);
    res.status(500).json({ success: false, message: 'Error al obtener productos destacados' });
  }
};
