import React from 'react';
import AuthenticationForm from '../components/AuthenticationForm';

function CreateAccount(): JSX.Element {
  return (
    <AuthenticationForm
      heading="Register"
      subHeading="create your amazing account!"
      endpoint="/user"
      linkedRoute="/login"
      linkedRouteText="go back to login page."
      buttonTitle="Create Account"
    />
  );
}

export default CreateAccount;
