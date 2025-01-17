import React from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUsers } from '../redux/usersSlice';
import { RootState } from '../redux/store';

const UserList: React.FC = () => {
  const users = useSelector((state: RootState) => selectUsers(state));

  return (
    <div className="container">
      <h1>Список пользователей</h1>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;