import React from 'react';
import { Suspense } from 'react';
import TripList from '../components/TripList';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';

type TripId = string;

const TripPage = () => {

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <TripList /> {/* Render the TripList component here */}
    </Suspense>
  );
};

export default TripPage;

