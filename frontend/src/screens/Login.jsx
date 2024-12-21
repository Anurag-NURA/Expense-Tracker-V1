import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { IoWalletOutline } from "@icons";
import { useInputReducer } from "@hooks";
import { Button } from "@components";
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from "../slices/authSlice.js";

export const Login = () => {

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInputReducer(value => value.includes('@'));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput
  } = useInputReducer(value => value.trim() !== '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);


  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredEmailIsValid && !enteredPasswordIsValid) {
      console.log("Form is invalid");
      return;//value was an empty string
    } else {
      try {
        const res = await login({ email: enteredEmail, password: enteredPassword }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }

    resetEmailInput();
    resetPasswordInput();
  }

  const emailInputClassName = emailInputHasError ? 'form-control invalid' : 'form-control';
  const passwordInputClassName = passwordInputHasError ? 'form-control invalid' : 'form-control';

  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-500 to-indigo-600'>
      <ToastContainer />

      <form
        className='h-3/4 custom_lg:w-1/3 custom_md:w-1/2 w-3/4 flex flex-col px-10 py-10 bg-white rounded-md overflow-hidden'
        onSubmit={formSubmissionHandler}
      >
        <div className="flex flex-col items-center pb-7">
          <IoWalletOutline className="font-semibold text-5xl text-purple-600" />
          <h1 className="font-semibold text-4xl">Welcome Back!</h1>
        </div>
        <div className={`mb-5 flex flex-col ${emailInputClassName}`}>
          <label htmlFor="email">
            {emailInputHasError ? 'Invalid ' : ''}Email
          </label>
          <input
            type='email'
            id='email'
            name="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            className={`px-5 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-purple-500`}
          />
          {emailInputHasError &&
            <p style={{ color: 'red' }}>
              *Enter valid email
            </p>}
        </div>

        <div className={`mb-5 flex flex-col ${passwordInputClassName}`}>
          <label htmlFor="password">
            {emailInputHasError ? 'Invalid ' : ''}Password
          </label>
          <input
            type='password'
            id='password'
            name="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
            className={`px-5 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-purple-500`}
          />
          {passwordInputHasError &&
            <p style={{ color: 'red' }}>
              *Enter valid password
            </p>}
        </div>


        <Button
          className={`py-2 text-white bg-purple-600 ${formIsValid && 'hover:bg-purple-700'}`}
          disabled={!formIsValid}
          onClick={formSubmissionHandler}
          type="submit"
        >
          {isLoading ? 'Loading...' : 'Login'}
        </Button>

        {/* Does user have an account or not */}
        <div className='mt-4 flex custom_md:flex-row flex-col text-center gap-2 justify-center items-center'>
          <p>Don't have an account? </p>
          <Link to='/register' className='font-semibold text-indigo-500 hover:underline' >
            Sign up
          </Link>
        </div>
      </form>
    </div >
  );
};
