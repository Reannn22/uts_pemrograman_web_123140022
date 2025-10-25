import { useTheme } from '../context/ThemeContext';
import { useLocation } from 'react-router-dom';
import { translations } from '../utils/translations';

export default function PrivacyPage() {
  const { isDark } = useTheme();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lang = searchParams.get('lang') || localStorage.getItem('lang') || 'id';
  const texts = translations[lang]?.privacy || {};

  return (
    <div className={`min-h-screen py-16 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{texts.title}</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">{texts.dataCollection.title}</h2>
            <p>{texts.dataCollection.content}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{texts.dataUsage.title}</h2>
            <p>{texts.dataUsage.content}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
