import React from 'react';
import { Redirect } from 'react-router';

const Home = () => (
    <Redirect to={`/accommodation`}/> // For now  redirect to accommodation page
);

export default Home;
