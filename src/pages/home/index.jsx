/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Outlet } from 'react-router-dom';
import { RegisterProvider } from '../../contexts/register.context';

function Home() {
  return (
    <RegisterProvider>
      <Outlet />
    </RegisterProvider>
  );
}

// function Home() {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       users: [
//         {
//           firstName: '',
//           lastName: '',
//         },
//       ],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     name: 'users',
//     control,
//   });

//   const onSubmit = data => {
//     console.log(data);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {fields.map((field, i) => (
//           <div key={field.id}>
//             <div>
//               <label htmlFor="firstName">First Name</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 placeholder="Enter your first name here"
//                 {...register(`users.${i}.firstName`, {
//                   required: {
//                     value: true,
//                     message: 'First Name is mendatory',
//                   },
//                 })}
//               />
//               {errors?.users?.length && errors?.users[i]?.firstName && (
//                 <p>{errors.users[i].firstName.message}</p>
//               )}
//             </div>
//             <div>
//               <label htmlFor="lastName">Last Name</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 placeholder="Enter your first name here"
//                 {...register(`users.${i}.lastName`, {
//                   required: {
//                     value: true,
//                     message: 'Last Name is mendatory',
//                   },
//                 })}
//               />
//               {errors?.users?.length && errors?.users[i]?.lastName && (
//                 <p>{errors.users[i].lastName.message}</p>
//               )}
//             </div>
//             <button type="button" onClick={() => remove(i)}>
//               Delete Item
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={() => append({ firstName: '', lastName: '' })}
//         >
//           Append Element
//         </button>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

export default Home;
