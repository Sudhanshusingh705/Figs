import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const FormInput = forwardRef(({
  type = 'text',
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  className,
  inputClassName,
  labelClassName,
  errorClassName,
  required,
  disabled,
  readOnly,
  autoComplete,
  min,
  max,
  step,
  pattern,
  multiple,
  accept,
  rows,
  ...props
}, ref) => {
  const baseInputClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors';
  const errorInputClasses = 'border-red-500 focus:ring-red-500';
  const disabledInputClasses = 'bg-gray-100 cursor-not-allowed';
  
  const inputClasses = twMerge(
    baseInputClasses,
    error && touched ? errorInputClasses : 'border-gray-300',
    disabled && disabledInputClasses,
    inputClassName
  );

  const renderInput = () => {
    const commonProps = {
      id: name,
      name,
      value: value || '',
      onChange,
      onBlur,
      disabled,
      readOnly,
      required,
      'aria-invalid': error && touched,
      'aria-describedby': error ? `${name}-error` : undefined,
      className: inputClasses,
      ref,
      ...props
    };

    switch (type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={rows || 4}
          />
        );

      case 'select':
        return (
          <select {...commonProps}>
            {props.children}
          </select>
        );

      case 'checkbox':
      case 'radio':
        return (
          <input
            {...commonProps}
            type={type}
            checked={value}
            className={twMerge(
              'h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded',
              type === 'radio' && 'rounded-full',
              inputClassName
            )}
          />
        );

      case 'file':
        return (
          <input
            {...commonProps}
            type={type}
            multiple={multiple}
            accept={accept}
            className={twMerge(
              'file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100',
              inputClassName
            )}
          />
        );

      default:
        return (
          <input
            {...commonProps}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            min={min}
            max={max}
            step={step}
            pattern={pattern}
          />
        );
    }
  };

  return (
    <div className={twMerge('mb-4', className)}>
      {label && (
        <label
          htmlFor={name}
          className={twMerge(
            'block text-sm font-medium text-gray-700 mb-1',
            labelClassName
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && touched && (
        <div
          id={`${name}-error`}
          role="alert"
          className={twMerge(
            'mt-1 text-sm text-red-500',
            errorClassName
          )}
        >
          {Array.isArray(error) ? error[0] : error}
        </div>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

FormInput.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'number',
    'tel',
    'url',
    'search',
    'date',
    'time',
    'datetime-local',
    'month',
    'week',
    'textarea',
    'select',
    'checkbox',
    'radio',
    'file',
    'color',
    'range'
  ]),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  touched: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  autoComplete: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pattern: PropTypes.string,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  rows: PropTypes.number,
  children: PropTypes.node
};

export default FormInput; 