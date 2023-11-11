export type TripTypes = {
  tripId: string;
  callSign: string;
  location: string;
  lastLocation: string;
  mobile: string;
  motoId: string;
  reason: string;
  priority: string;
  startDate: string;
  startTime: string;
  endTime: string;
 
  vehicle: {
    registration:string,
    make: string,
    model:string
  }[];

  personnel: {
    bunkerNum:string,
    firstName: string,
    lastName: string
  }[];
  
};
