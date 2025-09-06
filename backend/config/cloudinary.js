import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'do2bp6ryt',
  api_key: process.env.CLOUDINARY_API_KEY || '222425471589455',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'h_upIveq2sau8ObJDY0e20cbOv0'
});

export default cloudinary;
