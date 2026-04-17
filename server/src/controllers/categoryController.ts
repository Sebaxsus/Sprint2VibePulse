import { Request, Response } from 'express';
import { findCategories, findCategoryBySlug } from '../services/categoryService';

// GET /api/categories
export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await findCategories();

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('getCategories error:', error);
    res.status(500).json({ success: false, message: 'Error al obtener categorías' });
  }
};

// GET /api/categories/:slug
export const getCategoryBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await findCategoryBySlug(String(req.params.slug));

    if (!category) {
      res.status(404).json({ success: false, message: 'Categoría no encontrada' });
      return;
    }

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('getCategoryBySlug error:', error);
    res.status(500).json({ success: false, message: 'Error al obtener la categoría' });
  }
};
