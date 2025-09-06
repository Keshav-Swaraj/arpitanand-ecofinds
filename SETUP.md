# MERN Stack Setup Guide

## Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Create .env file in backend directory:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecofinds
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=222425471589455
   CLOUDINARY_API_SECRET=h_upIveq2sau8ObJDY0e20cbOv0
   ```

3. **Start MongoDB** (make sure MongoDB is running on your system)

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   Backend will run on http://localhost:5000

## Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)
- `DELETE /api/products/:id` - Delete product (requires auth)

### Orders
- `POST /api/orders` - Create new order (requires auth)
- `GET /api/orders` - Get user orders (requires auth)

## Features Implemented

✅ **Frontend-Backend Connection:**
- Axios API helper with base configuration
- Proxy configuration for development
- CORS setup for React frontend

✅ **Authentication:**
- Login/Signup forms with API integration
- JWT token management
- Auth context for state management
- Protected routes

✅ **Product Management:**
- Fetch products from API
- Add new products with image uploads
- Product detail view
- Search functionality
- Image upload with Cloudinary integration

✅ **Shopping Cart:**
- Add products to cart
- Cart state management with Context API
- Cart sidebar with item management
- Quantity adjustment
- Total price calculation
- Checkout functionality

✅ **User Profile:**
- User information display
- My Products tab (user's listed products)
- My Orders tab (purchase history)
- Order details with item breakdown

✅ **Error Handling:**
- Loading states
- Error messages
- Form validation

✅ **User Experience:**
- Responsive design
- Navigation with auth state
- Success/error notifications
