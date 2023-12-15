import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const withAuthorization = (WrappedComponent) => {
  const WithAuthorization = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const user = auth.currentUser || (await auth.getRedirectResult()).user;
          if (!user) {
            navigate('/login');
          }
        } catch (error) {
          navigate('/login');
        }
      };

      // Check authorization status immediately on component mount
      checkAuth();

      // Subscribe to authentication changes
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          navigate('/login');
        }
      });

      // Cleanup function to unsubscribe when the component unmounts
      return () => {
        unsubscribe();
      };
    }, [navigate]); // Adding navigate as a dependency

    return <WrappedComponent {...props} />;
  };

  return WithAuthorization;
};

export default withAuthorization;
