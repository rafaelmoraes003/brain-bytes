import React, { useEffect, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import getToken from '../utils/getToken';
import Form from './Form';
import authenticationRequest from '../utils/authenticationRequest';
import Input from './Input';
import Button from './Button';
import backgroundImage from '../assets/background.svg';
import '../styles/authForm.css';

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
    const request = await authenticationRequest(route, { username, password });
    if (request) {
      navigate('/home');
    }
  };

  const enableButton = (): boolean => {
    const MIN_LENGTH: number = 6;
    return !(username.length >= MIN_LENGTH && password.length >= MIN_LENGTH);
  };

  return (
    <div className="auth-form-container">
      <Form>
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
      </Form>
      <img src={backgroundImage} alt="background" />
    </div>
  );
}

export default AuthenticationForm;
