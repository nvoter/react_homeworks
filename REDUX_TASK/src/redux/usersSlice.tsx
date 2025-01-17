import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [
    { id: 1, name: 'Катя' },
    { id: 2, name: 'Саша' },
    { id: 3, name: 'Женя' },
  ],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserName: (state, action: PayloadAction<{ id: number; name: string }>) => {
      const { id, name } = action.payload;
      const user = state.users.find(user => user.id === id);
      if (user) {
        user.name = name;
      }
    },
  },
});

export const { updateUserName } = usersSlice.actions;
export const selectUsers = (state: { users: UsersState }) => state.users.users;
export const selectUserById = (state: { users: UsersState }, userId: number) => state.users.users.find(user => user.id === userId);
export default usersSlice.reducer;