import { useTheme } from '../context/ThemeContext';
import { useLocation } from 'react-router-dom';
import { translations } from '../utils/translations';

export default function AboutPage() {
  const { isDark } = useTheme();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lang = searchParams.get('lang') || localStorage.getItem('lang') || 'id';
  const texts = translations[lang]?.about || {};

  return (
    <div className={`min-h-screen py-16 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{texts.title}</h1>
        <div className="prose lg:prose-lg dark:prose-invert">
          <p className="mb-4">{texts.description}</p>
          <p className="mb-2">{texts.features.title}</p>
          <ul className="list-disc pl-5 mb-4">
            <li>{texts.features.catalog}</li>
            <li>{texts.features.secure}</li>
            <li>{texts.features.responsive}</li>
            <li>{texts.features.multilang}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
