import { useLocation, Navigate } from 'react-router-dom';

export const RequireAuth = ({children}) => {
  const location = useLocation();
  const adminAuth = false; //information about authorization
	if (!adminAuth) {
		return <Navigate to='/adminAuth' state={{from:location}}
	}
	return children;
};
