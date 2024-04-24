import IAccountState from './account-state';
import ISideBarState from './sidebar-state';

interface MainState {
  auth: IAccountState,
  sidebar: ISideBarState,
}

export default MainState;
