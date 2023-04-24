import IQuestion from '../../interfaces/IQuestion';

const questions: IQuestion[] = [
  {
    question: 'What is Node.js?',
    correctAnswer: 'Node.js is a server-side JavaScript runtime environment built on Chrome\'s V8 JavaScript engine',
    incorrectAnswers: [
      'Node.js is a front-end JavaScript framework.',
      'Node.js is a database management system.',
      'Node.js is a web browser extension.',
    ],
    category: 'node.js',
  },
  {
    question: 'What is NPM?',
    correctAnswer: 'NPM stands for Node Package Manager, which is a package manager for the Node.js platform.',
    incorrectAnswers: [
      'NPM stands for New Programming Methodology.',
      'NPM stands for Non-Printable Markup.',
      'NPM stands for Network Port Manager.',
    ],
    category: 'node.js',
  },
  {
    question: 'What is the difference between require and import in Node.js?',
    correctAnswer: 'require is used to import modules in CommonJS format, while import is used to import modules in ES6 format.',
    incorrectAnswers: [
      'require and import are interchangeable in Node.js.',
      'require is used to import built-in Node.js modules, while import is used to import third - party modules.',
      'require and import both import modules in CommonJS format.',
    ],
    category: 'node.js',
  },
  {
    question: 'What is an event loop in Node.js?',
    correctAnswer: 'The event loop is a mechanism that allows Node.js to handle multiple events simultaneously in a non-blocking way.',
    incorrectAnswers: [
      'The event loop is a data structure used to store events in Node.js.',
      'The event loop is a tool used to debug Node.js applications.',
      'The event loop is a function used to create new events in Node.js.',
    ],
    category: 'node.js',
  },
  {
    question: 'What is a callback function in Node.js?',
    correctAnswer: 'A callback function is a function that is passed as an argument to another function and is called when the parent function has completed its task.',
    incorrectAnswers: [
      'A callback function is a function that is called before the parent function starts its task.',
      'A callback function is a function that is only used in front-end JavaScript.',
      'A callback function is a function that is used to create new functions in Node.js.',
    ],
    category: 'node.js',
  },
  {
    question: 'What is Python?',
    correctAnswer: 'Python is a high-level, interpreted programming language.',
    incorrectAnswers: [
      'Python is a low-level, compiled programming language.',
      'Python is a markup language used for web development.',
      'Python is a type of database management system.',
    ],
    category: 'python',
  },
  {
    question: 'What is the difference between Python 2 and Python 3?',
    correctAnswer: 'Python 3 is the latest version of the Python programming language and includes many new features and improvements, while Python 2 is an older version that is no longer being actively developed or supported.',
    incorrectAnswers: [
      'Python 2 is the latest version of the Python programming language and includes many new features and improvements, while Python 3 is an older version that is no longer being actively developed or supported.',
      'Python 2 and Python 3 are completely different programming languages that cannot be used interchangeably.',
      'Python 2 and Python 3 are both equally popular and widely used in the programming community.',
    ],
    category: 'python',
  },
  {
    question: 'What is a Python package?',
    correctAnswer: 'A Python package is a collection of modules that can be used to add additional functionality to a Python program.',
    incorrectAnswers: [
      'A Python package is a type of data structure used to store variables in a Python program.',
      'A Python package is a built-in feature of the Python programming language that cannot be modified or extended.',
      'A Python package is a tool used to create new Python programs from scratch.',
    ],
    category: 'python',
  },
];

export default questions;
