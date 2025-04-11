import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Select.css';

const Select = forwardRef(({
  label,
  options,
  error,
  helperText,
  fullWidth = false,
  className = '',
  required = false,
  disabled = false,
  placeholder = 'Select an option',
  ...props
}, ref) => {
  const selectClasses = [
    'select',
    fullWidth ? 'select--full-width' : '',
    error ? 'select--error' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={selectClasses}>
      {label && (
        <label className="select__label">
          {label}
          {required && <span className="select__required">*</span>}
        </label>
      )}
      <div className="select__wrapper">
        <select
          ref={ref}
          className="select__field"
          disabled={disabled}
          required={required}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="select__arrow">▼</span>
      </div>
      {(error || helperText) && (
        <span className={`select__helper ${error ? 'select__helper--error' : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Select; 