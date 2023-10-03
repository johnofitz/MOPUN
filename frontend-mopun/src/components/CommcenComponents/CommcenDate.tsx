import classes from "./CommcenDate.module.css";

// Create the prop type
type dateProp = {
  lastDateUpdate: Date;
};

const CommcenDate = (props: dateProp) => {
  // Pass the date to a javascript date object
  const dateObject = new Date(props.lastDateUpdate);
  // Set the date format
  const month = dateObject.toLocaleString("en-US", { month: "short" });
  const day = dateObject.toLocaleString("en-US", { day: "2-digit" });
  const year = dateObject.toLocaleString("en-US", { year: "numeric" });

  return (
    <div className={classes.expensedate}>
      <div className={classes.expensedateday}>{day}</div>
      <div className={classes.expensedatemonth}>{month}</div>
      <div className={classes.expensedateyear}>{year}</div>
    </div>
  );
};

export default CommcenDate;
