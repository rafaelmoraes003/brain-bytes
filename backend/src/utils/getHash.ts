import md5 from 'md5';

const getHash = (string: string): string => {
  const hash: string = md5(string);
  return hash;
};

export default getHash;
