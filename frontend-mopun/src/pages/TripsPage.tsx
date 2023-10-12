import { Suspense } from 'react';
import TripList from '../components/CommcenComponents/TripList';


const TripPage = () => {

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <TripList /> {/* Render the TripList component here */}
    </Suspense>
  );
};

export default TripPage;

