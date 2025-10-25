import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';
import { translations } from '../../utils/translations';
import githubIcon from '../../assets/icon/github.svg';
import linkedinIcon from '../../assets/icon/linkedin.svg';

function SocialIcon({ icon, href, isDark }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200 ${
        isDark 
          ? 'bg-gray-800/80 hover:bg-gray-700' 
          : 'bg-gray-200/80 hover:bg-gray-300'
      }`}
    >
      <img 
        src={icon} 
        alt="Social Icon" 
        className={`w-5 h-5 transition-opacity duration-200 ${
          isDark 
            ? 'invert brightness-100 opacity-75 hover:opacity-100' 
            : 'opacity-75 hover:opacity-100'
        }`}
      />
    </a>
  );
}

export default function Footer({ authorName = "Reyhan Capri Moraga", nim = "123140022", lang = 'id' }) {
  const { isDark } = useTheme();
  const t = translations[lang].footer;

  const shopLinks = [
    { to: '/products', text: t.allProducts },
    { to: '/categories', text: t.categories },
    { to: '/search', text: t.search },
    { to: '/wishlist', text: t.wishlist }
  ];

  const infoLinks = [
    { to: '/about', text: 'About Us' },
    { to: '/contact', text: 'Contact' },
    { to: '/privacy', text: 'Privacy Policy' },
    { to: '/terms', text: 'Terms of Service' }
  ];

  const renderLinks = (links) => (
    <ul className="space-y-2">
      {links.map(link => (
        <li key={link.to}>
          <Link 
            to={link.to}
            className={`transition-colors duration-200 text-sm block py-1 ${
              isDark 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className={`relative transition-all duration-300 ${
      isDark 
        ? 'bg-black shadow-[0_-1px_15px_rgb(0,0,0,0.4)]' 
        : 'bg-white/70 backdrop-blur-md backdrop-saturate-150 shadow-lg-up'
    }`}>
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-8">
          {/* About Section */}
          <div className="md:pr-8">
            <h3 className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>ShoPPie</h3>
            <p className={`text-sm mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              ShoPPie adalah platform e-commerce yang menyediakan berbagai produk berkualitas dengan harga terbaik. Kami berkomitmen memberikan pengalaman belanja online yang aman dan nyaman.
            </p>
          </div>

          {/* Shop Links - with consistent spacing */}
          <div className="md:px-4">
            <h3 className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>{t.shop}</h3>
            {renderLinks(shopLinks)}
          </div>

          {/* Info Links - with consistent spacing */}
          <div className="md:px-4">
            <h3 className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>{t.information}</h3>
            {renderLinks(infoLinks)}
          </div>

          {/* Connect Section - with consistent spacing */}
          <div className="md:pl-8">
            <h3 className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>{t.connect}</h3>
            <div className="flex space-x-4 mb-6">
              <SocialIcon href="https://github.com" icon={githubIcon} isDark={isDark} />
              <SocialIcon href="https://linkedin.com" icon={linkedinIcon} isDark={isDark} />
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.created} {authorName} <span className="opacity-75">({nim})</span>
            </div>
          </div>
        </div>

        {/* Copyright - with consistent border */}
        <div className="border-t border-gray-700/50 mt-12 pt-6 text-center">
          <p className={`text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            &copy; {new Date().getFullYear()} ShoPPie. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

// Update PropTypes
SocialIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isDark: PropTypes.bool.isRequired
};

Footer.propTypes = {
  authorName: PropTypes.string,
  nim: PropTypes.string,
  lang: PropTypes.oneOf(['id', 'en'])
};
