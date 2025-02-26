import express from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { RegisterRoutes } from './build/routes';
import { AppDataSource } from './config/orm';

const app = express();

app.use(express.json());

AppDataSource.initialize();
// Serve swagger.json
app.use('/build', express.static(path.join(__dirname, 'build')));

// Register TSOA routes
try {
	RegisterRoutes(app);
} catch (err) {
	console.error('Error registering routes:', err);
}

// Swagger UI
app.use(
	'/docs',
	swaggerUi.serve,
	swaggerUi.setup(undefined, {
		swaggerOptions: {
			url: '/build/swagger.json' // Serve file via static route
		}
	})
);

app.listen(3000, () => {
	console.log('Server started on http://localhost:3000/docs');
});

export default app;
