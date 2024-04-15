import React, { useCallback } from 'react';
import CustomForm from '../../components/CustomForm';
import axiosInstance from '../../utils';

const fields = [
  {
    name: 'name',
    id: 'name',
    label: 'Name',
    autoComplete: 'name',
    placeholder: 'Elon Musk',
    component: 'input',
    defaultValue: '',
    rules: {
      required: 'Name is mendatory',
    },
  },
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
    name: 'gender',
    id: 'gender',
    label: 'Gender',
    placeholder: 'Please Select Gender',
    autoComplete: 'sex',
    defaultValue: '',
    component: 'select',
    options: [
      {
        text: 'Male',
        value: 'male',
      },
      {
        text: 'Female',
        value: 'female',
      },
      {
        text: 'Other',
        value: 'other',
      },
    ],
    rules: {
      required: 'Gender is mendatory',
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

function Register({ register }) {
  const onSubmit = useCallback(async data => {
    try {
      const res = await axiosInstance.post('register', data);
      register(res);
    } catch (error) {
      // error
    }
  }, []);

  return <CustomForm fields={fields} onSubmit={onSubmit} />;
}

export default Register;
