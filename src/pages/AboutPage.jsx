import { useTheme } from '../context/ThemeContext';
import { useLocation } from 'react-router-dom';
import { translations } from '../utils/translations';

export default function AboutPage() {
  const location = useLocation();
  const { isDark } = useTheme();
  const lang = new URLSearchParams(location.search).get('lang') || 'en';

  // Add default values for translations
  const defaultTexts = {
    title: 'About ShoPPie',
    description: 'ShoPPie is a modern e-commerce platform.',
    features: {
      title: 'Our platform offers:',
      catalog: 'Extensive product catalog',
      secure: 'Secure shopping experience',
      responsive: 'Responsive design',
      multilang: 'Multi-language support'
    }
  };

  // Safe access to translations with fallback
  const pageTexts = translations[lang]?.aboutPage || defaultTexts;

  return (
    <div className={`min-h-screen py-16 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{pageTexts.title}</h1>
        <div className="prose lg:prose-lg dark:prose-invert">
          <p className="mb-4">{pageTexts.description}</p>
          <p className="mb-2">{pageTexts.features.title}</p>
          <ul className="list-disc pl-5 mb-4">
            <li>{pageTexts.features.catalog}</li>
            <li>{pageTexts.features.secure}</li>
            <li>{pageTexts.features.responsive}</li>
            <li>{pageTexts.features.multilang}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
