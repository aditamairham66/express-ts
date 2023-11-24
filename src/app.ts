import App from './utils/app';
import indexRoute from './routes';

const app = new App();

// Routes
app.use('', indexRoute);

// Server
const PORT: number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
