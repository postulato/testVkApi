import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default function GuardedRoute ({component: Component, ...rest}) {
  const params = new URLSearchParams(rest.location.hash);
  const token = params.get('#access_token');
  if (token !== '') {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', params.get('user_id'));
  }
  const auth = localStorage.getItem('token');
  return <Route {...rest} render={
    (props) => ( 
      auth && auth !== 'null'
      ? <Component {...props}/>
      : <Redirect to = '/'
      />)}
    />
}