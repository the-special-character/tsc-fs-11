import React from 'react';
import { Input } from '../ui/input';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

function FormInput({ label, desc, field, className, inputStyle, ...props }) {
  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          placeholder="shadcn"
          {...field}
          {...props}
          className={inputStyle}
        />
      </FormControl>
      {desc && <FormDescription>{desc}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

export default FormInput;
