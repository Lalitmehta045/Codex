import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import authRouter from './routes/authRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

const app = express();

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is healthy' });
});

app.use('/api/v1/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
