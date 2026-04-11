import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import productRoutes from './routes/products';
import categoryRoutes from './routes/categories';

const app: Application = express();

// ============================================
// MIDDLEWARE
// ============================================
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ============================================
// ROUTES
// ============================================
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'VibePulse API corriendo 🚀' });
});

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// ============================================
// 404 HANDLER
// ============================================
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

// ============================================
// ERROR HANDLER
// ============================================
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
  });
});

export default app;
