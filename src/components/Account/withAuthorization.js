import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; 

const withAuthorization = (WrappedComponent) => {
  const WithAuthorization = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = () => {
        const user = auth.currentUser;
        if (!user) {
          navigate('/login'); 
        }
      };

      checkAuth();
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthorization;
};

export default withAuthorization;
