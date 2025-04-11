import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  helperText,
  fullWidth = false,
  className = '',
  required = false,
  disabled = false,
  startIcon,
  endIcon,
  ...props
}, ref) => {
  const inputClasses = [
    'input',
    fullWidth ? 'input--full-width' : '',
    error ? 'input--error' : '',
    startIcon ? 'input--with-start-icon' : '',
    endIcon ? 'input--with-end-icon' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={inputClasses}>
      {label && (
        <label className="input__label">
          {label}
          {required && <span className="input__required">*</span>}
        </label>
      )}
      <div className="input__wrapper">
        {startIcon && <span className="input__icon input__icon--start">{startIcon}</span>}
        <input
          ref={ref}
          type={type}
          className="input__field"
          disabled={disabled}
          required={required}
          {...props}
        />
        {endIcon && <span className="input__icon input__icon--end">{endIcon}</span>}
      </div>
      {(error || helperText) && (
        <span className={`input__helper ${error ? 'input__helper--error' : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
};

export default Input; 