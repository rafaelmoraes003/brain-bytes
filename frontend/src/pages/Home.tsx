import React from 'react';
import categories from '../assets/categories';

function Home(): JSX.Element {
  return (
    <div>
      {categories.map((category) => (
        <div
          style={{
            backgroundColor: category.backgroundColor,
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 15,
            padding: 10,
            borderRadius: 8,
            fontFamily: 'Lexend Deca',
          }}
        >
          <img src={category.uri} alt={category.name} />
          <h2>{category.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default Home;
