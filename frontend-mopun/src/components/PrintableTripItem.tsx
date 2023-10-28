import React, { forwardRef } from "react";
import { TripTypes } from "../services/TripTypes";
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
              <p>Mobile No: {tripInfo.mobile}</p>
              <div>
            Vehicles:
            <ul>
              {tripInfo.vehicle.map((vehicle, index) => (
                <li key={index}>
                  {tripInfo.vehicle[index]?.registration}{" "}
                  {tripInfo.vehicle[index]?.make}{" "}
                  {tripInfo.vehicle[index]?.model}
                </li>
              ))}
            </ul>
          </div>
              <div>
            Personnel:
            <ul>
              {tripInfo.personnel.map((personnel, index) => (
                <li key={index}>
                  {tripInfo.personnel[index]?.bunkerNum}{" "}
                  {tripInfo.personnel[index]?.firstName}{" "}
                  {tripInfo.personnel[index]?.lastName}
                </li>
              ))}
            </ul>
          </div>
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
