import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

const _dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(_dirname, 'dist');

// const PORT_ = process.env.PORT || 4000;
const PORT =4000;
const DOMAIN = `http://localhost:${PORT}`;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(publicPath);
});

app.listen(PORT, () => {
  console.log(`website is available on ${DOMAIN}`);
});

export default app;