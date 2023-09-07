import { useRouteError } from 'react-router-dom';
import MainNav from '../components/MainNavBoard';
import PageContent from '../components/PageContent';

// Define the ErrorType type to match the expected error structure
type ErrorType = {
  status: number;
  data: {
    message: string;
  };
}

const ErrorPage = () => {
  const error = useRouteError() as ErrorType | null;

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error) {
    if (error.status === 500) {
      message = error.data.message;
    } else if (error.status === 404) {
      title = 'Not found!';
      message = 'Could not find resource or page.';
    }
  }
  
  return (
    <>
      <MainNav />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
