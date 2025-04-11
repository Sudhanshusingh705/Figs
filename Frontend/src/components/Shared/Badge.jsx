import React from 'react';
import PropTypes from 'prop-types';
import './Badge.css';

const Badge = ({ text, color, size, className }) => {
  const badgeClasses = `badge badge-${color} badge-${size} ${className || ''}`;
  
  return (
    <span className={badgeClasses}>
      {text}
    </span>
  );
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

Badge.defaultProps = {
  color: 'primary',
  size: 'md',
  className: ''
};

export default Badge; 