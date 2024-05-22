import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/customInput';
import { AuthContext } from '../../contexts/auth.context';

const fields = [
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
    component: CustomInput,
    name: 'password',
    type: 'password',
    label: 'Password',
    labelComponent: () => (
      <div className="text-sm">
        <a
          href="#forgotPassword"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Forgot password?
        </a>
      </div>
    ),
    autoComplete: 'new-password',
    rules: {
      required: {
        value: true,
        message: 'Password is mendatory',
      },
    },
  },
];

function Login() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
    setError,
  } = useForm({
    mode: 'all',
  });
  const { login } = useContext(AuthContext);

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(login)}>
        {fields.map(({ component: Component, ...props }) => (
          <Component key={props.name} control={control} {...props} />
        ))}

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{' '}
        <Link
          to="register"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Start a 14 day free trial
        </Link>
      </p>
    </div>
  );
}

export default Login;
