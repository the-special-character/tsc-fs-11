/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../../contexts/register.context';

function Home3() {
  const { setRegister, register: registerData } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: registerData,
  });

  const onSubmit = data => {
    setRegister(val => {
      const finalData = { ...val, ...data };
      console.log(finalData);
      return finalData;
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email here"
          {...register('email', {
            required: {
              value: true,
              message: 'email is mendatory',
            },
          })}
        />
        {errors?.email && <p>{errors.email.message}</p>}
      </div>
      <Link to="/home/second">Prev Page</Link>
      <button type="submit">Next Page</button>
    </form>
  );
}

export default Home3;
