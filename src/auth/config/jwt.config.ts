import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  expirationTime: parseInt(process.env.JWT_EXPIRATION_TIME ?? '3600', 10),
}));
