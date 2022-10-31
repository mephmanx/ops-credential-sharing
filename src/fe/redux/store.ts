import { createStore } from 'redux';
import { RootState } from '../../common/interfaces/feInterfaces';
import rootReducer from './rootReducer';
import { folderInitState } from './folder/folderReducer';
import { settingInitState } from './setting/settingReducer';
import { statusInitState } from './status/statusReducer';
import { tagInitState } from './tag/tagReducer';

const initState: RootState = {
  status: { ...statusInitState },
  folder: { ...folderInitState },
  tag: { ...tagInitState },
  setting: { ...settingInitState }
};

export default createStore(rootReducer, initState);
