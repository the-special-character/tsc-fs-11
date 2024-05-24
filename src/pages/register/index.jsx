/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CustomInput from '../../components/customInput';
import CustomSelect from '../../components/customSelect';
import CustomCheckbox from '../../components/customCheckbox';
import CustomSlider from '../../components/customSlider';

const fields = [
  {
    component: CustomInput,
    name: 'name',
    placeholder: 'Elon Musk',
    autoComplete: 'name',
    label: 'Name',
    rules: {
      required: {
        value: true,
        message: 'Name is mendatory',
      },
    },
  },
  {
    component: CustomInput,
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'elon.musk@tesla.com',
    autoComplete: 'email',
    rules: {
      required: {
        value: true,
        message: 'Email is mendatory',
      },
      // validate: async data => {
      //   const res = await fetch(`http://localhost:3000/users?email=${data}`);
      //   const json = await res.json();
      //   if (json.length > 0) return 'Email already exist';
      //   return null;
      // },
    },
  },
  {
    component: CustomSlider,
    name: 'age',
    label: 'age',
    min: '0',
    max: '100',
    step: '1',
    rules: {
      required: {
        value: true,
        message: 'Name is mendatory',
      },
    },
  },
  {
    component: CustomSelect,
    name: 'gender',
    autoComplete: 'sex',
    label: 'Gender',
    placeholder: 'Please Select gender',
    options: [
      {
        value: 'male',
        text: 'Male',
      },
      {
        value: 'female',
        text: 'Female',
      },
      {
        value: 'other',
        text: 'Other',
      },
    ],
    rules: {
      required: {
        value: true,
        message: 'Gender is mendatory',
      },
    },
  },
  {
    component: CustomCheckbox,
    name: 'hobbies',
    label: 'Hobbies',
    options: [
      {
        value: 'cricket',
        text: 'Cricket',
      },
      {
        value: 'football',
        text: 'Football',
      },
      {
        value: 'tennis',
        text: 'Tennis',
      },
    ],
    rules: {
      required: {
        value: true,
        message: 'Gender is mendatory',
      },
    },
  },
  {
    component: CustomInput,
    name: 'password',
    type: 'password',
    label: 'Password',
    autoComplete: 'new-password',
    rules: {
      required: {
        value: true,
        message: 'Password is mendatory',
      },
    },
  },
  {
    component: CustomInput,
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    autoComplete: 'new-password',
    rules: {
      required: {
        value: true,
        message: 'Confirm Password is mendatory',
      },
    },
  },
];

function Register() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
    setError,
  } = useForm({
    mode: 'all',
  });

  const onSubmit = async value => {
    try {
      const { confirmPassword, ...rest } = value;
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify(rest),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json);
      localStorage.setItem('user', JSON.stringify(json));
      reset();
    } catch (error) {
      setError('email', {
        message: error.message,
      });
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {fields.map(({ component: Component, ...props }) => (
          <Component key={props.name} control={control} {...props} />
        ))}
        <div>
          <button
            type="submit"
            disabled={!isValid}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-400 disabled:cursor-wait"
          >
            Sign in
          </button>
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
        Already a member?{' '}
        <Link
          to="/auth"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
