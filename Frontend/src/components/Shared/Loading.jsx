import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css';

const Loading = ({
  size = 'medium',
  variant = 'primary',
  fullScreen = false,
  text = 'Loading...',
  className = '',
}) => {
  const loadingClasses = [
    'loading',
    `loading--${size}`,
    `loading--${variant}`,
    fullScreen ? 'loading--full-screen' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={loadingClasses}>
      <div className="loading__spinner">
        <div className="loading__circle"></div>
        <div className="loading__circle"></div>
        <div className="loading__circle"></div>
      </div>
      {text && <p className="loading__text">{text}</p>}
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'light']),
  fullScreen: PropTypes.bool,
  text: PropTypes.string,
  className: PropTypes.string,
};

export default Loading; 