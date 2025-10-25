import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function NotFoundPage({ message = "Page not found" }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">{message}</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

NotFoundPage.propTypes = {
  message: PropTypes.string
};
