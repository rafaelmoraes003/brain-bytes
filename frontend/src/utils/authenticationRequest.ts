import getToast from './getToast';

interface UserBody {
  username: string,
  password: string,
}

interface AuthenticationServerResponse {
  _id?: string,
  message?: string,
}

const authenticationRequest = async (
  route: string,
  body: UserBody,
): Promise<boolean> => {
  try {
    const response: Response = await fetch(route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data: AuthenticationServerResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    localStorage.setItem('id', data._id as string);
    return true;
  } catch (error) {
    getToast('error', (error as Error).message);
    return false;
  }
};

export default authenticationRequest;
