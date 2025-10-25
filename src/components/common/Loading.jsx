import PropTypes from 'prop-types';

export default function Loading({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`flex justify-center items-center p-4 ${className}`}>
      <div className={`animate-spin rounded-full border-4 border-primary-500 border-t-transparent ${sizeClasses[size]}`} />
    </div>
  );
}

Loading.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};
