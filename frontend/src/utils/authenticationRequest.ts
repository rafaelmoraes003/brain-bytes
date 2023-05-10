import getToast from './getToast';

interface UserBody {
  username: string,
  password: string,
}

interface AuthenticationServerResponse {
  token?: string,
  error?: string,
}

const authenticationRequest = async (
  route: string,
  body: UserBody,
): Promise<void> => {
  try {
    const response: Response = await fetch(route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data: AuthenticationServerResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    localStorage.setItem('token', data.token as string);
  } catch (error) {
    getToast('error', (error as Error).message);
  }
};

export default authenticationRequest;
