import app from './src/app';
import config from './src/config/config';

app.listen(config.port, () => {
  console.log(`Express server listening on port ${config.port}`);
});
export default app;
