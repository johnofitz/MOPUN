import { ReactNode } from 'react';


interface CardProps {
  children: ReactNode;
  className?: string; // Make className prop optional
}

const Card =(props: CardProps)=> {
    const classes = 'card ' + props.className;
  return <div className={classes}>{props.children}</div>;
}

export default Card;
