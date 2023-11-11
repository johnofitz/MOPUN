export enum DataTypeKeys {
    TripId = "tripId",
    CallSign = "callSign",
    Location = "location",
    Reason = "reason",
    LastLocation = "lastlocation",
    MotoId = "motoId",
    LastTime = "lastTimeUpdate",
    startTime = "startTime",
    ActiveDate = "lastDateUpdate",
    Priority = "priority",
    InCamp = "inCamp",
    Active = "active"
  }
  
  export type DataType = {
    [DataTypeKeys.TripId]: string;
    [DataTypeKeys.CallSign]: string;
    [DataTypeKeys.Location]: string;
    [DataTypeKeys.Reason]: string;
    [DataTypeKeys.LastLocation]: string;
    [DataTypeKeys.MotoId]: string;
    [DataTypeKeys.LastTime]: string;
    [DataTypeKeys.Priority]: string;
    [DataTypeKeys.ActiveDate]: Date;
    [DataTypeKeys.Active]: boolean;
    [DataTypeKeys.InCamp]: boolean;
    [DataTypeKeys.startTime]: string;
  };