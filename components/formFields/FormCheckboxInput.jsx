import React from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Checkbox } from '../ui/checkbox';

function FormCheckboxInput({ field, label, options }) {
  return (
    <FormItem>
      <div className="mb-4">
        <FormLabel className="text-base">{label}</FormLabel>
      </div>
      {options.map(x => (
        <FormItem
          key={x.value}
          className="flex flex-row items-start space-x-3 space-y-0"
        >
          <FormControl>
            <Checkbox
              checked={field.value?.includes(x.value)}
              onCheckedChange={checked => {
                checked
                  ? field.onChange([...field.value, x.value])
                  : field.onChange(
                      field.value?.filter(value => value !== x.value),
                    );
              }}
            />
          </FormControl>
          <FormLabel className="font-normal">{x.text}</FormLabel>
        </FormItem>
      ))}
      <FormMessage />
    </FormItem>
  );
}

export default FormCheckboxInput;
