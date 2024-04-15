import { createSlice } from '@reduxjs/toolkit';


// models
import MainState from '../interfaces/main-state';
import ISideBarState from '../interfaces/sidebar-state';

const initialState: ISideBarState = {
  isOpen: true,
  currentTab: 'upwork-feed',
};

const sidebarSlicer = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    openClose(state, action) {
      state.isOpen = action.payload;
    },
    changeTab(state, action) {
      state.currentTab = action.payload;
    },
  },
});

export const selectIsOpen = (state: MainState) => state.sidebar.isOpen;
export const selectCurrentTab = (state: MainState) => state.sidebar.currentTab;

export const { openClose, changeTab } = sidebarSlicer.actions;

export default sidebarSlicer.reducer;
