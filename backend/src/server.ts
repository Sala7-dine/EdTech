import app from './app';
import { env } from './config/env';

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`\u2705 Server is running on http://localhost:${PORT}`);
  console.log(`\u2705 Health check: http://localhost:${PORT}/api/health`);
});
