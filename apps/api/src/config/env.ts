import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT || 3000);
if (Number.isNaN(PORT)) {
  throw new Error('PORT must be a valid number');
}

const NODE_ENV = process.env.NODE_ENV || 'development';

const env = {
  PORT,
  NODE_ENV,
};

export default env;
