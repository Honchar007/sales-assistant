import IAccountState from './account-state';
import ISideBarState from './sidebar-state';
import ITableState from './table-state';

interface MainState {
  auth: IAccountState,
  sidebar: ISideBarState,
  table: ITableState,
}

export default MainState;
