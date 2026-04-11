import { Request, Response } from 'express';
import { prismaConnector as prisma } from '../../db'

// GET /api/categories
export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: { select: { products: true } },
      },
      orderBy: { name: 'asc' },
    });

    const result = categories.map((cat) => ({
      ...cat,
      productCount: cat._count.products,
      _count: undefined,
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('getCategories error:', error);
    res.status(500).json({ success: false, message: 'Error al obtener categorías' });
  }
};

// GET /api/categories/:slug
export const getCategoryBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: req.params.slug },
      include: {
        _count: { select: { products: true } },
      },
    });

    if (!category) {
      res.status(404).json({ success: false, message: 'Categoría no encontrada' });
      return;
    }

    res.json({
      success: true,
      data: {
        ...category,
        productCount: category._count.products,
        _count: undefined,
      },
    });
  } catch (error) {
    console.error('getCategoryBySlug error:', error);
    res.status(500).json({ success: false, message: 'Error al obtener la categoría' });
  }
};
