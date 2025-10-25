import PropTypes from 'prop-types';

export default function Footer({ authorName = "Reyhan Capri Moraga", nim = "123140022" }) {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p>&copy; 2023 ShopApp. All rights reserved.</p>
          <p className="mt-2 text-gray-400">UTS Pemrograman Web</p>
          <p className="mt-1 text-sm text-gray-500">
            Created by {authorName} ({nim})
          </p>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  authorName: PropTypes.string,
  nim: PropTypes.string
};
