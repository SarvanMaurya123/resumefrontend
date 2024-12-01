import { Navigate } from 'react-router-dom';
import { useAuth } from '../ContaxtApi/useAuth'; // Corrected path
import Loader from '../../Loder';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return <div><Loader /></div>;
    }

    return isLoggedIn ? element : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired, // Expecting `element` instead of `children`
};

export default ProtectedRoute;
