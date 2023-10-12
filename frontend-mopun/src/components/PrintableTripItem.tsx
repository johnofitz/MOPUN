import React, { forwardRef } from "react";
import { TripTypes } from '../services/TripTypes';
import classes from "./PrintMop.module.css";

type PrintableTripItemProps = {
  tripInfo: TripTypes | null;
};

const PrintableTripItem: React.ForwardRefRenderFunction<
  HTMLDivElement,
  PrintableTripItemProps
> = ({ tripInfo }, ref) => {
  return (
    <div ref={ref}>
      {tripInfo ? (
        <>
          <div className={classes.print}>
            <div className={classes.printForm}>
            <div className={classes.container}>
                {/* Wrap the image and heading in a container div */}
                <div className={classes.headingcontainer}>
                <h1>{tripInfo.callSign}</h1>
                  <img
                    src={require("../images/irishPoll.png")}
                    alt="profile-img"
                    className={classes.images}
                  />
               
                </div>
              </div>
             
              <p>Moto Id: {tripInfo.motoId}</p>
              <h3>Vehicle Registrations:</h3>
            
              {tripInfo.vehicleTrips.map((vehicle, index) => (
                <p key={index}>{vehicle}</p>
              ))}
             
              <h3>Bunker No's:</h3>
              {tripInfo.personnelTrips.map((personnel, index) => (
                <p key={index}>{personnel}</p>
              ))}
              <p>Priority: {tripInfo.priority}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default forwardRef(PrintableTripItem);
