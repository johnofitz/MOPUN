import classes from './PageContent.module.css';
import { ReactNode } from 'react';

type PageContentProps={
    title: string;
    children: ReactNode;
}

const  PageContent=(props: PageContentProps)=> {
  return (
    <div className={classes.content}>
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
}

export default PageContent;