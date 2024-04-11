import React, { useCallback } from 'react';
import CustomForm from '../../components/CustomForm';
import axiosInstance from '../../utils';

const fields = [
  {
    name: 'email',
    id: 'email',
    label: 'Email',
    autoComplete: 'email',
    type: 'email',
    placeholder: 'elon@tesla.com',
    defaultValue: '',
    rules: {
      required: 'Email is mendatory',
    },
  },
  {
    name: 'password',
    id: 'password',
    label: 'Password',
    autoComplete: 'new-password',
    type: 'password',
    placeholder: 'somehting strong...',
    defaultValue: '',
    rules: {
      required: 'Password is mendatory',
    },
  },
];

function Login({ login }) {
  const onSubmit = useCallback(async data => {
    try {
      const res = await axiosInstance.post('login', data);
      localStorage.setItem('user', JSON.stringify(res));
      login(res);
    } catch (error) {}
  }, []);

  return <CustomForm fields={fields} onSubmit={onSubmit} />;
}

export default Login;
