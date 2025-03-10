import { RegisterRoutes } from './build/routes';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { AppDataSource, setupMiddleware } from './config';
import logger from './common/logger/logger';
import { globalErrorMiddleware } from './middlewares/globalError.middleware';
import { validationErrorMiddleware } from './middlewares/validation.middleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const initializeApp = async () => {
	try {
		// Setup middleware
		setupMiddleware(app);

		// Initialize database connection
		await AppDataSource.initialize();
		logger.info('Database connected successfully');

		// Register routes
		RegisterRoutes(app);

		// Validation middleware(interceptor)
		app.use(validationErrorMiddleware);

		// Global error middleware(interceptor)
		app.use(globalErrorMiddleware);

		// Start server
		app.listen(port, () => {
			logger.info(`Server is running on port ${port}`);
			logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
			logger.info(
				`Swagger documentation available at http://localhost:${port}/docs`
			);
		});
	} catch (error) {
		logger.error('Error during initialization:', error);
		console.error(error);
		process.exit(1);
	}
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (error: Error) => {
	logger.error('Unhandled Rejection:', error);
	process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
	logger.error('Uncaught Exception:', error);
	process.exit(1);
});

initializeApp().catch((error) => {
	logger.error('Failed to start application:', error);
	process.exit(1);
});
