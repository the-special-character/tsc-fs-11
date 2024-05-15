/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { useController } from 'react-hook-form';

function CustomCheckbox({
  control,
  name,
  defaultValue = '',
  disabled = false,
  shouldUnregister = false,
  rules,
  label,
  options,
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

  const value = useMemo(() => field.value || [], [field.value]);

  return (
    <fieldset>
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        {label}
      </legend>
      <div className="mt-6 space-y-6">
        {options.map(item => (
          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id={item.value}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                name={field.name}
                onBlur={field.onBlur}
                disabled={field.disabled}
                checked={value.some(x => x === item.value)}
                onChange={() => {
                  const index = value.findIndex(x => x === item.value);
                  if (index === -1) {
                    field.onChange([...value, item.value]);
                  } else {
                    field.onChange([
                      ...value.slice(0, index),
                      ...value.slice(index + 1),
                    ]);
                  }
                }}
              />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor={item.value} className="font-medium text-gray-900">
                {item.text}
              </label>
              {item.desc && <p className="text-gray-500">{item.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default CustomCheckbox;
