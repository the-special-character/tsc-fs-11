/* eslint-disable react/jsx-props-no-spreading */
import clsx from 'clsx';
import React from 'react';
import { useController } from 'react-hook-form';

function CustomSlider({
  control,
  name,
  defaultValue = '',
  disabled = false,
  shouldUnregister = false,
  rules,
  label,
  ...props
}) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
    disabled,
    rules,
    shouldUnregister,
  });

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          type="range"
          aria-errormessage={error?.message}
          aria-invalid={error}
          className={clsx(
            'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
            {
              'ring-red-300 focus:ring-red-600 outline-red-300': !!error,
            },
          )}
          {...field}
          {...props}
        />
      </div>
      {error && <p className="text-red-400">{error?.message}</p>}
    </div>
  );
}

export default CustomSlider;
