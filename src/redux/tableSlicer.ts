import { createSlice } from '@reduxjs/toolkit';

// models
import MainState from '../interfaces/main-state';
import ITableState from '../interfaces/table-state';

const initialState: ITableState = {
  pagination: {
    pageIndex: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  },
  sortDirection: '',
  sortBy: '',
  searchParameters: null,
  options: {
    scoreOptions: [],
    keywordsOptions: [],
  },
};

// Create a slice
const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    paginationChange(state, action) {
      state.pagination = {...state.pagination, ...action.payload};
    },
    columnFiltersChange(state, action) {
      state.searchParameters = {...action.payload};
    },
    optionsChange(state, action) {
      state.options = {...action.payload};
    },
  },
});

export const selectPagination = (state: MainState) => state.table.pagination;
export const selectOptions = (state: MainState) => state.table.options;
export const selectFilters = (state: MainState) => state.table.searchParameters;
export const selectSortBy = (state: MainState) => state.table.sortBy;
export const selectSortDirection = (state: MainState) => state.table.sortDirection;

export const { paginationChange, columnFiltersChange, optionsChange } = tableSlice.actions;

export default tableSlice.reducer;
