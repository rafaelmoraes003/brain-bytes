import nodeLogo from './nodejs-icon.svg';
import javaLogo from './java-svgrepo-com.svg';
import pythonLogo from './python-5.svg';

interface Categories {
  name: string,
  uri: string,
  backgroundColor: string,
}

const categories: Categories[] = [
  {
    name: 'Node.js',
    uri: nodeLogo,
    backgroundColor: '#43853d',
  },
  {
    name: 'Java',
    uri: javaLogo,
    backgroundColor: '#DFFF00',
  },
  {
    name: 'Python',
    uri: pythonLogo,
    backgroundColor: '#191970',
  },
];

export default categories;
