import { Request, Response } from 'express';
import { prismaConnector as prisma } from '../../db'

// GET /api/products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      categoryId,
      search,
      minPrice,
      maxPrice,
      featured,
      page = '1',
      limit = '12',
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10)));
    const skip = (pageNum - 1) * limitNum;

    const where: Record<string, unknown> = {};

    if (categoryId) {
      where.categoryId = parseInt(categoryId as string, 10);
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) (where.price as Record<string, number>).gte = parseFloat(minPrice as string);
      if (maxPrice) (where.price as Record<string, number>).lte = parseFloat(maxPrice as string);
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

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
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: 'ID inválido' });
      return;
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

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
    const products = await prisma.product.findMany({
      where: { featured: true },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      take: 8,
    });

    res.json({ success: true, data: products });
  } catch (error) {
    console.error('getFeaturedProducts error:', error);
    res.status(500).json({ success: false, message: 'Error al obtener productos destacados' });
  }
};
