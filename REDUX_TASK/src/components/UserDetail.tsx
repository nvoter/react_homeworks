import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { selectUserById, updateUserName } from '../redux/usersSlice';
import { RootState } from '../redux/store';

const UserDetail: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = useSelector((state: RootState) =>
    selectUserById(state, parseInt(userId || '0'))
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState<string>(user ? user.name : '');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError('');
  };

  const handleSave = () => {
    if (name.trim() === '') {
      setError('Имя не может быть пустым'); 
    } else {
      if (user) {
        dispatch(updateUserName({ id: user.id, name }));
        navigate('/');
      }
    }
  };

  if (!user) {
    return <div>Пользователь не найден.</div>;
  }

  return (
    <div className="container">
      <h1>Детали пользователя</h1>
      <div className="user-detail">
        <label htmlFor="name">Имя:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <button onClick={handleSave}>Сохранить</button>
      </div>
    </div>
  );
};

export default UserDetail;