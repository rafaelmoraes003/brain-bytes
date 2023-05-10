import React, { useEffect, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import getToken from '../utils/getToken';
import Form from './Form';
import authenticationRequest from '../utils/authenticationRequest';
import Input from './Input';
import Button from './Button';
import backgroundImage from '../assets/background.svg';

interface AuthenticationFormProps {
  heading: string,
  subHeading: string,
  endpoint: string,
  linkedRoute: string,
  linkedRouteText: string,
  buttonTitle: string,
}

function AuthenticationForm({
  heading,
  subHeading,
  endpoint,
  linkedRoute,
  linkedRouteText,
  buttonTitle,
}: AuthenticationFormProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const token: string | null = getToken();
    if (token) {
      navigate('/home');
    }
  }, []);

  const handleSubmit = async (): Promise<void> => {
    const route: string = `http://localhost:3001${endpoint}`;
    authenticationRequest(route, { username, password });
    navigate('/home');
  };

  const enableButton = (): boolean => {
    const MIN_PASSWORD_LENGTH: number = 3;
    const regex: RegExp = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return !(regex.test(username) && password.length >= MIN_PASSWORD_LENGTH);
  };

  return (
    <Form>
      <div className="user-form-container">
        <h1>{heading}</h1>
        <h3>{subHeading}</h3>

        <Input
          placeholder="Username"
          type="text"
          value={username}
          id="username"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          id="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />

        <Button
          title={buttonTitle}
          id="form-button"
          disabled={enableButton()}
          onClick={handleSubmit}
        />

        <Link to={linkedRoute}>{linkedRouteText}</Link>
      </div>
      <img src={backgroundImage} alt="background" />
    </Form>
  );
}

export default AuthenticationForm;
