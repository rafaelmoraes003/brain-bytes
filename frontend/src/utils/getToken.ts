const getToken = (): string | null => {
  const token: string | null = localStorage.getItem('token');
  return token;
};

export default getToken;
