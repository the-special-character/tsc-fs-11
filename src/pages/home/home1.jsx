/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../contexts/register.context';

function Home1() {
  const { setRegister, register: registerData } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: registerData,
  });
  const navigate = useNavigate();

  const onSubmit = data => {
    setRegister(val => ({ ...val, ...data }));
    navigate('second');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter your first name here"
          {...register('firstName', {
            required: {
              value: true,
              message: 'First Name is mendatory',
            },
          })}
        />
        {errors?.firstName && <p>{errors.firstName.message}</p>}
      </div>
      <button type="submit">Next Page</button>
    </form>
  );
}

export default Home1;
