import { createSlice } from '@reduxjs/toolkit';


// services
import MainState from '../interfaces/main-state';

const initialState: { isOpen: boolean } = {
  isOpen: true,
};

const sidebarSlicer = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    openClose(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const selectIsOpen = (state: MainState) => state.sidebar.isOpen;

export const { openClose } = sidebarSlicer.actions;

export default sidebarSlicer.reducer;
