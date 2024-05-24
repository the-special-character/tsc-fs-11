/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../../contexts/register.context';

function Home2() {
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
    navigate('/home/final');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter your last name here"
          {...register('lastName', {
            required: {
              value: true,
              message: 'Last Name is mendatory',
            },
          })}
        />
        {errors?.lastName && <p>{errors.lastName.message}</p>}
      </div>
      <Link to="/home">Prev Page</Link>
      <button type="submit">Next Page</button>
    </form>
  );
}

export default Home2;
