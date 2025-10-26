# ShoPPie - E-Commerce Web Application

UTS Pemrograman Web - Modern E-commerce application built with React and DummyJSON API

## Live Demo
[https://uts-pemrograman-web-123140022.vercel.app/](https://uts-pemrograman-web-123140022.vercel.app/)

## Author Information
- **Name:** Reyhan Capri Moraga 
- **NIM:** 123140022
- **Class:** Pemrograman Web

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
- Dark/Light theme toggle
- Multilingual support (ID/EN)
- Wishlist functionality

## Installation

1. Clone repository:
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

### Assets (`/src/assets`)

#### Icons (`/icon`)
- `arrow-right.svg` - Navigation arrow
- `chevron-left.svg` - Previous item navigation
- `chevron-right.svg` - Next item navigation
- `github.svg` - GitHub social link
- `heart.svg` - Wishlist icon
- `languages.svg` - Language selector
- `linkedin.svg` - LinkedIn social link
- `moon.svg` - Dark theme toggle
- `search.svg` - Search functionality
- `shopping-cart.svg` - Cart icon
- `sun.svg` - Light theme toggle

#### Logo (`/logo`)
- `ShoPPie.png` - Main application logo

### Components (`/src/components`)

#### Cart Components (`/cart`)
- `CartItem.jsx` - Individual cart item display
- `CartSummary.jsx` - Cart totals and checkout

#### Common Components (`/common`)
- `ErrorMessage.jsx` - Error state handling
- `Loading.jsx` - Loading state indicators

#### Layout Components (`/layout`)
- `Footer.jsx` - Site footer
- `Navbar.jsx` - Navigation header

#### Product Components (`/product`)
- `ProductCard.jsx` - Product grid item

### Context (`/src/context`)
- `CartContext.jsx` - Shopping cart state
- `ThemeContext.jsx` - Theme preferences
- `WishlistContext.jsx` - Wishlist management

### Hooks (`/src/hooks`)
- `useDebounce.js` - Input debouncing
- `useFetch.js` - Data fetching
- `useFormRef.js` - Form references
- `useScroll.js` - Scroll position

### Pages (`/src/pages`)
- `AboutPage.jsx` - About information
- `CartPage.jsx` - Shopping cart view
- `ContactPage.jsx` - Contact form
- `HomePage.jsx` - Landing page
- `NotFoundPage.jsx` - 404 handler
- `PrivacyPage.jsx` - Privacy policy
- `ProductDetailPage.jsx` - Product details
- `ProductsPage.jsx` - Products listing
- `TermsPage.jsx` - Terms of service
- `WishlistPage.jsx` - Saved items

### Services (`/src/services`)
- `dummyApi.js` - API integration

### Utils (`/src/utils`)
- `constants.js` - App constants
- `translations.js` - i18n strings

### Root Files
- `index.css` - Global styles
- `index.js` - Entry point
- `main.jsx` - App initialization

## Detailed Project Structure

### Assets (`/src/assets`)

#### Icons (`/icon`)
- `arrow-right.svg` - Navigation arrow
- `chevron-left.svg` - Previous item navigation
- `chevron-right.svg` - Next item navigation
- `github.svg` - GitHub social link
- `heart.svg` - Wishlist icon
- `languages.svg` - Language selector
- `linkedin.svg` - LinkedIn social link
- `moon.svg` - Dark theme toggle
- `search.svg` - Search functionality
- `shopping-cart.svg` - Cart icon
- `sun.svg` - Light theme toggle

#### Logo (`/logo`)
- `ShoPPie.png` - Main application logo

### Components (`/src/components`)

#### Cart Components (`/cart`)
- `CartItem.jsx` - Individual cart item display
- `CartSummary.jsx` - Cart totals and checkout

#### Common Components (`/common`)
- `ErrorMessage.jsx` - Error state handling
- `Loading.jsx` - Loading state indicators

#### Layout Components (`/layout`)
- `Footer.jsx` - Site footer
- `Navbar.jsx` - Navigation header

#### Product Components (`/product`)
- `ProductCard.jsx` - Product grid item

### Context (`/src/context`)
- `CartContext.jsx` - Shopping cart state
- `ThemeContext.jsx` - Theme preferences
- `WishlistContext.jsx` - Wishlist management

### Hooks (`/src/hooks`)
- `useDebounce.js` - Input debouncing
- `useFetch.js` - Data fetching
- `useFormRef.js` - Form references
- `useScroll.js` - Scroll position

### Pages (`/src/pages`)
- `AboutPage.jsx` - About information
- `CartPage.jsx` - Shopping cart view
- `ContactPage.jsx` - Contact form
- `HomePage.jsx` - Landing page
- `NotFoundPage.jsx` - 404 handler
- `PrivacyPage.jsx` - Privacy policy
- `ProductDetailPage.jsx` - Product details
- `ProductsPage.jsx` - Products listing
- `TermsPage.jsx` - Terms of service
- `WishlistPage.jsx` - Saved items

### Services (`/src/services`)
- `dummyApi.js` - API integration

### Utils (`/src/utils`)
- `constants.js` - App constants
- `translations.js` - i18n strings

### Root Files
- `index.css` - Global styles
- `index.js` - Entry point
- `main.jsx` - App initialization

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

## Routes
- `/` - Homepage with featured products
- `/products` - Product listing and search
- `/product/:id` - Product details
- `/cart` - Shopping cart
- `/wishlist` - Saved items
- `/about` - About information
- `/contact` - Contact form
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## API Integration
Uses DummyJSON API (https://dummyjson.com) for:
- Product catalog
- Product details
- Search functionality
- Category filtering

## License
This project is MIT licensed.
