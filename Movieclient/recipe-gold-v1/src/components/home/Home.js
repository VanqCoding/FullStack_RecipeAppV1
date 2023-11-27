import React from 'react';
import Hero from '../hero/Hero';

const Home = ({ recipes }) => {
  return (
    <Hero recipes={recipes} />
  )
}

export default Home