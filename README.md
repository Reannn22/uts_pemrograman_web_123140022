# React E-Commerce UTS

UTS Pemrograman Web - React E-commerce application using DummyJSON API

## Author

- Nama: Reyhan Capri Moraga
- NIM: 123140022

## Tech Stack

- React 18
- React Router DOM v6
- Context API for state management
- Tailwind CSS for styling
- DummyJSON API for product data

## Features

- Product listing with search & filtering
- Dynamic product detail pages
- Shopping cart functionality
- Responsive navbar with glass effect
- Loading states & error handling
- Mobile-friendly design

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/uts_pemrograman_web_123140022.git
cd uts_pemrograman_web_123140022
```

2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm start
```

4. Build for production:

```bash
npm run build
```

## Project Structure

```
src/
├── assets/        # Static assets
├── components/    # Reusable components
│   ├── cart/     # Cart related components
│   ├── common/   # Common UI components
│   ├── layout/   # Layout components
│   └── product/  # Product related components
├── context/      # Context providers
├── hooks/        # Custom React hooks
├── pages/        # Page components
├── services/     # API services
└── utils/        # Utility functions
```

## Detailed Project Structure

```
src/
├── assets/                    # Static assets and images
├── components/               # Reusable UI components
│   ├── cart/                # Cart related components
│   │   ├── CartItem.jsx    # Individual cart item component
│   │   └── CartSummary.jsx # Cart total and checkout summary
│   ├── common/             # Shared UI components
│   │   ├── ErrorMessage.jsx # Error state display
│   │   └── Loading.jsx     # Loading spinner/states
│   ├── layout/             # Layout components
│   │   ├── Footer.jsx     # Site footer with author info
│   │   └── Navbar.jsx     # Navigation with glass effect
│   └── product/           # Product related components
│       └── ProductCard.jsx # Product display card
├── context/               # React Context providers
│   └── CartContext.jsx   # Shopping cart state management
├── hooks/                # Custom React hooks
│   ├── useDebounce.js   # Debouncing user input
│   ├── useFetch.js      # Data fetching with loading states
│   ├── useFormRef.js    # Form input references
│   └── useScroll.js     # Scroll position detection
├── pages/                # Route components
│   ├── CartPage.jsx     # Shopping cart view
│   ├── HomePage.jsx     # Landing page
│   ├── NotFoundPage.jsx # 404 error page
│   ├── ProductDetailPage.jsx # Single product view
│   └── ProductsPage.jsx # Products listing
├── services/            # API and external services
│   └── dummyApi.js     # DummyJSON API integration
├── utils/              # Utility functions and constants
│   └── constants.js    # API endpoints and config
├── index.css          # Global styles and Tailwind
├── index.js          # App entry point
└── main.jsx         # Root component and routing
```

## Component Details

### Cart Components

- **CartItem**: Displays individual items in cart with quantity controls
- **CartSummary**: Shows order total, tax, and checkout options

### Common Components

- **ErrorMessage**: Standardized error display with retry option
- **Loading**: Customizable loading indicators with size variants

### Layout Components

- **Navbar**:
  - Responsive navigation with mobile menu
  - Glass effect on scroll
  - Cart counter badge
  - Active link indicators
- **Footer**: Site credits and author information

### Product Components

- **ProductCard**:
  - Product display with image
  - Price and discount display
  - Quick add to cart
  - Rating display

### Context

- **CartContext**:
  - Global cart state management
  - Add/Remove items
  - Update quantities
  - Calculate totals

### Custom Hooks

- **useDebounce**: Delay function execution (search input)
- **useFetch**: Data fetching with loading/error states
- **useFormRef**: Form input focus management
- **useScroll**: Scroll position detection for navbar

### Pages

- **HomePage**: Featured products and hero section
- **ProductsPage**: Product listing with filters
- **ProductDetailPage**: Detailed product view
- **CartPage**: Shopping cart management
- **NotFoundPage**: 404 error handling

### Services

- **dummyApi**:
  - Product fetching
  - Category filtering
  - Search functionality
  - Error handling

## Screenshots

### Homepage

![Homepage](screenshots/homepage.png)

- Hero section with featured products
- Product grid layout
- Quick add to cart functionality

### Products Page

![Products](screenshots/products.png)

- Search functionality
- Filter by category
- Sort by price/rating
- Product cards with details

### Product Detail

![Product Detail](screenshots/product-detail.png)

- Product images
- Detailed description
- Add to cart with quantity selector

### Shopping Cart

![Shopping Cart](screenshots/cart.png)

- Cart items list
- Quantity adjustment
- Price calculations
- Remove items functionality

### Mobile View

![Mobile Navigation](screenshots/mobile.png)

- Responsive design
- Mobile-friendly navigation
- Adaptive layout

## Key Implementation Details

### State Management

- Using Context API for global cart state
- Custom hooks for data fetching and UI state

### API Integration

- DummyJSON API for product data
- Error handling and loading states
- Data caching implementation

### UI/UX Features

- Liquid glass effect on navbar scroll
- Smooth animations and transitions
- Responsive design breakpoints
- Loading skeletons

## Deployment

This project is deployed on Vercel. You can visit the live site at:
[https://your-vercel-deployment-url.vercel.app](https://your-vercel-deployment-url.vercel.app)

## Development Notes

Make sure to create a `screenshots` directory in your project root and add the following screenshots:

1. Homepage with featured products
2. Products page with filters
3. Product detail page
4. Shopping cart page
5. Mobile responsive view

Screenshots should clearly demonstrate the key features and UI components of your application.
