import React from 'react';
import AuthenticationForm from '../components/AuthenticationForm';

function Login(): JSX.Element {
  return (
    <AuthenticationForm
      heading="Brain Bytes"
      subHeading="Byte-sized tech trivia for your brain!"
      endpoint="/login"
      linkedRoute="/create-account"
      linkedRouteText="new here? register now!"
      buttonTitle="Login"
    />
  );
}

export default Login;
