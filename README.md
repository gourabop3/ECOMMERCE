# 🛒 ShopCart - Professional E-commerce Platform

A modern, full-stack e-commerce application built with React.js, Node.js, and MongoDB. This project is inspired by contemporary e-commerce platforms and features a comprehensive admin panel for complete store management.

![ShopCart Banner](https://via.placeholder.com/1200x400/4F46E5/FFFFFF?text=ShopCart+-+Professional+E-commerce+Platform)

## ✨ Features

### 🛍️ Customer Features
- **Modern Homepage** with hero sliders, featured products, and testimonials
- **Product Catalog** with advanced filtering and search functionality
- **Shopping Cart** with real-time updates and quantity management
- **User Authentication** with secure login/registration
- **Order Management** with order tracking and history
- **Responsive Design** optimized for all devices
- **Payment Integration** with PayPal support
- **Product Reviews** and ratings system
- **Wishlist** functionality
- **Newsletter Subscription**

### 👨‍💼 Admin Features
- **Comprehensive Dashboard** with analytics and key metrics
- **Product Management** with image upload and inventory tracking
- **Order Management** with status updates and order processing
- **Customer Management** with user insights
- **Feature Images Management** for homepage banners
- **Analytics & Reports** with sales insights
- **Inventory Management** with stock tracking
- **Category Management** for product organization
- **Professional UI** with modern design patterns

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - State management with RTK Query
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage and management
- **PayPal SDK** - Payment processing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the repository
```bash
git clone <repository-url>
cd shopcart-ecommerce
```

### 2. Install Dependencies

#### Backend Dependencies
```bash
cd server
npm install
```

#### Frontend Dependencies
```bash
cd client
npm install
```

### 3. Environment Setup

#### Server Environment Variables
Create a `.env` file in the `server` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/shopcart
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopcart

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox

# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:5173
```

#### Client Environment Variables
Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### 4. Start the Application

#### Start Backend Server
```bash
cd server
npm run dev
```

#### Start Frontend Development Server
```bash
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🔧 Configuration

### Database Setup
1. Install MongoDB locally or create a MongoDB Atlas account
2. Update the `MONGODB_URI` in your server `.env` file
3. The application will automatically create the necessary collections

### Cloudinary Setup
1. Create a free Cloudinary account at https://cloudinary.com
2. Get your cloud name, API key, and API secret from the dashboard
3. Update the Cloudinary variables in your server `.env` file

### PayPal Setup
1. Create a PayPal Developer account at https://developer.paypal.com
2. Create a new application and get your client ID and secret
3. Update the PayPal variables in both client and server `.env` files

## 📱 Application Structure

```
shopcart-ecommerce/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── admin-view/    # Admin panel components
│   │   │   ├── shopping-view/ # Customer components
│   │   │   ├── auth/          # Authentication components
│   │   │   └── ui/            # UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   ├── lib/           # Utility functions
│   │   └── assets/        # Images and media
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── helpers/          # Utility functions
│   └── server.js         # Entry point
└── README.md
```

## 🎨 Design Features

### Modern UI/UX
- **Gradient Backgrounds** - Professional color schemes
- **Smooth Animations** - Hover effects and transitions
- **Responsive Design** - Mobile-first approach
- **Professional Typography** - Clean and readable fonts
- **Consistent Branding** - Unified color palette and styling

### Admin Dashboard
- **Analytics Cards** - Key metrics and statistics
- **Data Visualization** - Charts and graphs (ready for integration)
- **Quick Actions** - Easy access to common tasks
- **Recent Activity** - Real-time updates and notifications
- **Professional Layout** - Clean and organized interface

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the production version:
```bash
cd client
npm run build
```

2. Deploy the `dist` folder to your hosting platform

### Backend Deployment (Heroku/Railway)
1. Set up your production database (MongoDB Atlas recommended)
2. Configure environment variables on your hosting platform
3. Deploy the server directory

### Environment Variables for Production
- Update `VITE_API_URL` to your production backend URL
- Update `CLIENT_URL` to your production frontend URL
- Use production MongoDB URI
- Set PayPal mode to `live` for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/check-auth` - Check authentication status

### Product Endpoints
- `GET /api/shop/products/get` - Get all products
- `GET /api/shop/products/get/:id` - Get product by ID
- `POST /api/admin/products/add` - Add new product (Admin)
- `PUT /api/admin/products/edit/:id` - Edit product (Admin)
- `DELETE /api/admin/products/delete/:id` - Delete product (Admin)

### Order Endpoints
- `POST /api/shop/order/create` - Create new order
- `GET /api/shop/order/list/:userId` - Get user orders
- `GET /api/shop/order/details/:id` - Get order details
- `PUT /api/admin/orders/update/:id` - Update order status (Admin)

## 📈 Performance Features

- **Code Splitting** - Optimized bundle sizes
- **Image Optimization** - Cloudinary integration
- **Caching** - Efficient API caching
- **Responsive Images** - Multiple device support
- **Fast Loading** - Optimized for performance

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs encryption
- **Input Validation** - Server-side validation
- **CORS Protection** - Cross-origin request security
- **Environment Variables** - Secure configuration

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern e-commerce platforms like Shopify and Amazon
- Built with love using open-source technologies
- Special thanks to the React and Node.js communities

---

**Made with ❤️ by the ShopCart Team**