import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLocation } from 'react-router-dom';
import { translations } from '../utils/translations';

export default function ContactPage() {
  const { isDark } = useTheme();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lang = searchParams.get('lang') || localStorage.getItem('lang') || 'id';
  const texts = translations[lang]?.contact || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className={`min-h-screen py-16 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{texts.title}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">{texts.name}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full p-3 rounded-lg border ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
              required
            />
          </div>
          <div>
            <label className="block mb-2">{texts.email}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full p-3 rounded-lg border ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
              required
            />
          </div>
          <div>
            <label className="block mb-2">{texts.subject}</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className={`w-full p-3 rounded-lg border ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
              required
            />
          </div>
          <div>
            <label className="block mb-2">{texts.message}</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full p-3 rounded-lg border h-32 resize-none ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg ${
              isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-medium`}
          >
            {texts.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
