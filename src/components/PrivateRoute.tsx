import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';
import { selectFetching, selectInitialFetching } from '../redux/authSlicer';

interface PrivateRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  children?: ReactNode;
}

const PrivateRoute = ({
  isAllowed,
  redirectPath = '/login',
  children,
}: PrivateRouteProps) => {
  const loading = useAppSelector(selectFetching);
  const initialFetching = useAppSelector(selectInitialFetching);

  if (!isAllowed && initialFetching && !loading) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
