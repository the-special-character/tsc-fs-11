import { useAuth } from '../../context/authContext';
import FormInput from '@/components/formFields/FormInput';
import { Form, FormField } from '@/components/ui/form';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const fields = [
  {
    id: 'name',
    label: 'Name',
    name: 'name',
    placeholder: 'Elon Musk',
    autoComplete: 'name',
    component: FormInput,
    rules: {
      required: {
        value: true,
        message: 'Name is required...',
      },
    },
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'elon.musk@tesla.com',
    type: 'email',
    autoComplete: 'email',
    component: FormInput,
    rules: {
      required: {
        value: true,
        message: 'Name is required...',
      },
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Entered value does not match email format',
      },
    },
  },
  {
    id: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'Some strong Password',
    type: 'password',
    autoComplete: 'new-password',
    component: FormInput,
    rules: {
      required: {
        value: true,
        message: 'Name is required...',
      },
    },
  },
  {
    id: 'confirm-password',
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'same as password',
    type: 'password',
    autoComplete: 'new-password',
    component: FormInput,
    rules: {
      required: {
        value: true,
        message: 'Name is required...',
      },
      compare: {
        value: 'password',
        message: 'Password and confirmPassword should same',
      },
    },
  },
];

function Register() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  });
  const { register } = useAuth();

  const onSubmit = useCallback(async value => {
    const { confirmPassword, ...rest } = value;
    register(rest);
  }, []);

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map(({ component: Component, name, rules, ...props }) => {
          const { compare, ...customRules } = rules;
          if (compare) {
            customRules.validate = val =>
              val === form.getValues(rules.compare.value);
          }
          return (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => <Component field={field} {...props} />}
              rules={customRules}
            />
          );
        })}
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </Form>
  );
}

export default Register;
