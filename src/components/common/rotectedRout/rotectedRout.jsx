import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import userService from '../../services/userService';

const ProtectedRoute = ({ component: Component, render,  ClAdmin,...rest }) => {
  const currentUser = userService.getCurrentUser();
  return (
    <Route
    user={currentUser}
    {...rest}
    render={(props) => {
        if ((!currentUser || (rest.biz && !currentUser.biz))  || (ClAdmin && !currentUser.ClAdmin) ) {
          return (
            <Redirect
              to={{ pathname: '/signin', state: { from: props.location } }}
            />
          );
        }
        return Component ? <Component user={currentUser} {...props} /> : render(props);
      }}
    />
  );
};
export default ProtectedRoute;
