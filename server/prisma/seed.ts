import { prismaConnector as prisma } from '../db'
import bcrypt from 'bcryptjs';


async function main() {
  console.log('🌱 Iniciando seed de VibePulse...\n');

  // ──────────────────────────────────────────
  // USUARIOS
  // ──────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@vibepulse.com' },
    update: {},
    create: {
      name: 'Admin VibePulse',
      email: 'admin@vibepulse.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'cliente@vibepulse.com' },
    update: {},
    create: {
      name: 'Cliente Demo',
      email: 'cliente@vibepulse.com',
      password: hashedPassword,
      role: 'CLIENT',
    },
  });

  console.log('✅ Usuarios creados');

  // ──────────────────────────────────────────
  // CATEGORÍAS
  // ──────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'electronica' },
      update: {},
      create: {
        name: 'Electrónica',
        slug: 'electronica',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
        description: 'Gadgets y tecnología de vanguardia',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'moda' },
      update: {},
      create: {
        name: 'Moda',
        slug: 'moda',
        imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80',
        description: 'Tendencias exclusivas para ti',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'hogar' },
      update: {},
      create: {
        name: 'Hogar',
        slug: 'hogar',
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
        description: 'Diseño y confort para tu espacio',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'deporte' },
      update: {},
      create: {
        name: 'Deporte',
        slug: 'deporte',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
        description: 'Equipamiento para tu mejor versión',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'belleza' },
      update: {},
      create: {
        name: 'Belleza',
        slug: 'belleza',
        imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
        description: 'Cuida tu imagen con lo mejor',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'libros' },
      update: {},
      create: {
        name: 'Libros',
        slug: 'libros',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
        description: 'Conocimiento y entretenimiento',
      },
    }),
  ]);

  console.log(`✅ ${categories.length} categorías creadas`);

  const [electronica, moda, hogar, deporte, belleza, libros] = categories;

  // ──────────────────────────────────────────
  // PRODUCTOS
  // ──────────────────────────────────────────
  const products = [
    {
      name: 'Auriculares Inalámbricos Pro X',
      description: 'Sonido premium con cancelación activa de ruido y 30h de batería.',
      price: 299900,
      comparePrice: 399900,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
      stock: 15,
      featured: true,
      badge: 'Más vendido',
      categoryId: electronica.id,
    },
    {
      name: 'Smartwatch Serie 8 Ultra',
      description: 'Reloj inteligente con GPS, monitor cardíaco y pantalla AMOLED.',
      price: 549900,
      comparePrice: 699900,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
      stock: 8,
      featured: true,
      badge: 'Nuevo',
      categoryId: electronica.id,
    },
    {
      name: 'Chaqueta Bomber Premium',
      description: 'Corte moderno con forro interior suave. Disponible en 4 colores.',
      price: 189900,
      imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
      stock: 22,
      featured: true,
      categoryId: moda.id,
    },
    {
      name: 'Silla de Oficina Ergonómica',
      description: 'Soporte lumbar ajustable, reposabrazos 4D y respaldo de malla.',
      price: 749900,
      comparePrice: 899900,
      imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80',
      stock: 5,
      featured: true,
      badge: 'Oferta',
      categoryId: hogar.id,
    },
    {
      name: 'Zapatillas Running Cloud',
      description: 'Tecnología de amortiguación avanzada para máximo rendimiento.',
      price: 349900,
      comparePrice: 420000,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
      stock: 30,
      featured: true,
      badge: 'Trending',
      categoryId: deporte.id,
    },
    {
      name: 'Cámara Mirrorless 4K',
      description: 'Sensor full-frame, estabilización óptica y video 4K 60fps.',
      price: 2499900,
      comparePrice: 2899900,
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
      stock: 3,
      featured: false,
      badge: 'Premium',
      categoryId: electronica.id,
    },
    {
      name: 'Set Skincare Vitamina C',
      description: 'Rutina completa: sérum, crema de día y contorno de ojos.',
      price: 159900,
      imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80',
      stock: 45,
      featured: false,
      categoryId: belleza.id,
    },
    {
      name: 'Laptop Ultrabook 14"',
      description: 'Procesador i7 de 12ª gen, 16GB RAM, SSD 512GB, pantalla IPS.',
      price: 3299900,
      comparePrice: 3799900,
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
      stock: 7,
      featured: false,
      badge: 'Oferta',
      categoryId: electronica.id,
    },
    {
      name: 'Vestido Midi Floral',
      description: 'Tela de viscosa premium, corte midi con estampado botánico exclusivo.',
      price: 129900,
      imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80',
      stock: 18,
      featured: false,
      categoryId: moda.id,
    },
    {
      name: 'Altavoz Bluetooth 360°',
      description: 'Sonido omnidireccional, resistente al agua IPX7, 20h de autonomía.',
      price: 199900,
      comparePrice: 249900,
      imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
      stock: 12,
      featured: false,
      badge: 'Popular',
      categoryId: electronica.id,
    },
    {
      name: 'Yoga Mat Antideslizante',
      description: 'Material ecológico TPE, grosor 6mm, incluye correa de transporte.',
      price: 89900,
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80',
      stock: 55,
      featured: false,
      categoryId: deporte.id,
    },
    {
      name: 'Libro "Atomic Habits"',
      description: 'El bestseller de James Clear sobre hábitos y cambio de comportamiento.',
      price: 59900,
      imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80',
      stock: 100,
      featured: false,
      categoryId: libros.id,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`✅ ${products.length} productos creados`);
  console.log('\n🎉 Seed completado exitosamente!\n');
  console.log('👤 Usuarios de prueba:');
  console.log('   Admin   → admin@vibepulse.com   / password123');
  console.log('   Cliente → cliente@vibepulse.com / password123\n');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
