import prisma from '../config/prisma';

export async function findCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { products: true } },
    },
    orderBy: { name: 'asc' },
  });

  type CategoryWithCount = (typeof categories)[number];

  return categories.map(({ _count, ...category }: CategoryWithCount) => ({
    ...category,
    productCount: _count.products,
  }));
}

export async function findCategoryBySlug(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      _count: { select: { products: true } },
    },
  });

  if (!category) {
    return null;
  }

  const { _count, ...rawCategory } = category;

  return {
    ...rawCategory,
    productCount: _count.products,
  };
}
