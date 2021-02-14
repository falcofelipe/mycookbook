import React, { useContext, useEffect } from 'react';
import UserItem from './UserItem.js';
import Spinner from '../layout/Spinner'; //'../' goes up one folder
import GithubContext from '../../context/github/githubContext';
import { getFirstUsers } from '../../context/github/githubActions';
import { GET_FIRST_USERS, SET_LOADING } from '../../context/types';

const Users = () => {
  const githubContext = useContext(GithubContext);

  const { users, loading, firstLoad, dispatch } = githubContext;

  useEffect(() => {
    if (firstLoad) {
      dispatch({ type: SET_LOADING });

      getFirstUsers().then(users => {
        dispatch({ type: GET_FIRST_USERS, payload: users });
      });
    }
  }, [dispatch, firstLoad]);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem user={user} key={user.id} />
        ))}
      </div>
    );
  }
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default Users;
