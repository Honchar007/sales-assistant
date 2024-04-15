import { ReactNode, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { initialFetchingDone, selectFetching, selectInitialFetching } from '../redux/authSlicer';

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
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectFetching);
  const initialFetching = useAppSelector(selectInitialFetching);

  useEffect(() => {
    if (!initialFetching) {
      dispatch(initialFetchingDone(true));
    }
  }, [initialFetching, dispatch]);

  if (!isAllowed && initialFetching && !loading) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
