import { ReactNode } from 'react';
import classes from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string; // Make className prop optional
}

const Card =(props: CardProps)=> {
    const classes = 'card ' + props.className;
  return <div className={classes}>{props.children}</div>;
}

export default Card;
