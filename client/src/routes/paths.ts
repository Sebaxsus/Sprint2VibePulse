export const ROUTES = {
  home: '/',
  catalog: '/catalogo',
  product: '/producto/:id',
  productDetail: (id: number | string) => `/producto/${id}`,
} as const;

export const catalogQuery = {
  byCategory: (categoryId: number | string) => `${ROUTES.catalog}?categoryId=${categoryId}`,
  featured: `${ROUTES.catalog}?featured=true`,
  search: (term: string) => `${ROUTES.catalog}?search=${encodeURIComponent(term)}`,
} as const;
