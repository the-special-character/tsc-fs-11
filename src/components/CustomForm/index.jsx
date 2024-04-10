import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { useForm } from 'react-hook-form';

function FormSelect({
  label,
  desc,
  field,
  options,
  placeholder,
  formState,
  fieldState,
  ...props
}) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map(x => (
            <SelectItem key={x.value} value={x.value}>
              {x.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {desc && <FormDescription>{desc}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

function FormInput({ label, desc, field, formState, fieldState, ...props }) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input placeholder="shadcn" {...props} {...field} />
      </FormControl>
      {desc && <FormDescription>{desc}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

const getComponent = component => {
  switch (component) {
    case 'select':
      return FormSelect;

    default:
      return FormInput;
  }
};

function CustomForm({ onSubmit, fields }) {
  const form = useForm({
    mode: 'all',
    defaultValues: fields.reduce(
      (previous, current) => ({
        ...previous,
        [current.name]: current.defaultValue,
      }),
      {},
    ),
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {fields.map(({ name, rules, component, defaultValue, ...props }) => {
          const Component = getComponent(component);
          return (
            <FormField
              key={name}
              control={form.control}
              name={name}
              rules={rules}
              render={inputProps => <Component {...inputProps} {...props} />}
            />
          );
        })}

        <Button
          disabled={form.formState.isSubmitting || !form.formState.isValid}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default CustomForm;
