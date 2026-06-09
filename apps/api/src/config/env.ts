import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT || 3000);
if (Number.isNaN(PORT)) {
  throw new Error('PORT must be a valid number');
}

const NODE_ENV = process.env.NODE_ENV || 'development';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

const env = {
  PORT,
  NODE_ENV,
  DATABASE_URL,
};

export default env;
