import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../utils/translations";
import githubIcon from "../../assets/icon/github.svg";
import linkedinIcon from "../../assets/icon/linkedin.svg";
import { useLocation } from "react-router-dom"; // Add this import

function SocialIcon({ icon, href, isDark }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        isDark
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      <img
        src={icon}
        alt="Social Icon"
        className={`w-5 h-5 ${isDark ? "invert brightness-100" : ""}`}
      />
    </a>
  );
}

export default function Footer({
  authorName = "Reyhan Capri Moraga",
  nim = "123140022",
}) {
  const { isDark } = useTheme();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lang = searchParams.get("lang") || localStorage.getItem("lang") || "id";
  const t = translations[lang]?.footer || {};

  const shopLinks = [
    { to: "/products", text: t.allProducts },
    { to: "/products", text: t.search },
    { to: "/cart", text: t.cart },
    { to: "/wishlist", text: t.wishlist },
  ];

  const infoLinks = [
    { to: "/about", text: t.aboutUs },
    { to: "/contact", text: t.contact },
    { to: "/privacy", text: t.privacy },
    { to: "/terms", text: t.terms },
  ];

  const renderLinks = (links) => (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.to}>
          <Link
            to={link.to}
            className={`transition-colors duration-200 text-sm block py-1 ${
              isDark
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <footer
      className={`relative ${
        isDark
          ? "bg-black shadow-[0_-1px_15px_rgb(0,0,0,0.4)]"
          : "bg-white shadow-[0_-1px_15px_rgb(0,0,0,0.1)]"
      }`}
    >
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-8">
          {/* About Section */}
          <div className="md:pr-8">
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.about?.title || "ShoPPie"}
            </h3>
            <p
              className={`text-sm mb-4 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {t.about?.description}
            </p>
          </div>

          {/* Shop Links */}
          <div className="md:px-4">
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.shop}
            </h3>
            {renderLinks(shopLinks)}
          </div>

          {/* Info Links */}
          <div className="md:px-4">
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.information}
            </h3>
            {renderLinks(infoLinks)}
          </div>

          {/* Connect Section */}
          <div className="md:pl-8">
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.connect}
            </h3>
            <div className="flex space-x-4 mb-6">
              <SocialIcon
                href="https://github.com/Reannn22"
                icon={githubIcon}
                isDark={isDark}
              />
              <SocialIcon
                href="https://linkedin.com/reyhan-capri-moraga"
                icon={linkedinIcon}
                isDark={isDark}
              />
            </div>
            <div
              className={`text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {t.created} {authorName}{" "}
              <span className="opacity-75">({nim})</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700/50 mt-12 pt-6 text-center">
          <p
            className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            &copy; {new Date().getFullYear()} {t.about?.title || "ShoPPie"}.{" "}
            {t.rights}
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
  isDark: PropTypes.bool.isRequired,
};

Footer.propTypes = {
  authorName: PropTypes.string,
  nim: PropTypes.string,
  lang: PropTypes.oneOf(["id", "en"]),
};
