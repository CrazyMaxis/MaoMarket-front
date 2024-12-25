import { createSlice } from '@reduxjs/toolkit';

interface RefreshState {
  refresh: boolean;
}

const initialState: RefreshState = {
  refresh: false,
};

const refreshSlice = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
    toggleRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { setRefresh, toggleRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
