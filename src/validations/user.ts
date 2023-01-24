import * as Yup from 'yup';

const addressSchema = Yup.object().shape({
  city: Yup.string().min(3).required(),
  street: Yup.string().min(3).required(),
  zipcode: Yup.string().min(6).required(),
  number: Yup.number().required(),
});

export const userDetailsSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  phone: Yup.string().min(10).required(),
  username: Yup.string().min(5).required(),
  password: Yup.string().min(5).required(),
  address: addressSchema,
  name: Yup.object().shape({
    firstname: Yup.string().min(3).required(),
    lastname: Yup.string().min(3).required(),
  }),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});
