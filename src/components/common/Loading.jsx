import PropTypes from "prop-types";

export default function Loading({ size = "md", className = "" }) {
  return (
    <div className={`flex justify-center items-center p-4 ${className}`}>
      <div
        className={`${
          size === "sm" ? "h-4 w-4" : size === "lg" ? "h-12 w-12" : "h-8 w-8"
        }`}
      />
    </div>
  );
}

Loading.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};
