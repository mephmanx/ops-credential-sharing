import { Dispatch } from 'redux';
import { IpcEvent } from '../../common/enums/commonEnums';
import {
  addFolders,
  exportFolders,
  importFolders,
  clearFoldersUpdateThumbnails
} from '../redux/folder/folderAction';
import { calculateTagRelations, clearUnusedTags } from '../redux/tag/tagAction';
import ipcRenderer = Electron.ipcRenderer;

const initIpcEventListeners = (
  dispatch: Dispatch,
  onOpenSettingDialog: () => void,
  onOpenManageTagsDialog: () => void,
  refreshFolders: () => void
): void => {
  ipcRenderer.on(IpcEvent.AddFolders, (_event, data) => {
    const { folderLocations } = data;
    addFolders(dispatch, folderLocations, refreshFolders).then((r: any) => r != undefined ? console.log(r) :console.log(""));
  });
  ipcRenderer.on(IpcEvent.OpenSetting, () => {
    onOpenSettingDialog();
  });
  ipcRenderer.on(IpcEvent.OpenManageTags, () => {
    onOpenManageTagsDialog();
  });
  ipcRenderer.on(IpcEvent.ImportData, async (_event, data) => {
    const { json, isOverwrite } = data;
    await importFolders(dispatch, json, isOverwrite, refreshFolders);
  });
  ipcRenderer.on(IpcEvent.ExportData, () => {
    exportFolders(dispatch).then((r: any) => r != undefined ? console.log(r) :console.log(""));
  });
  ipcRenderer.on(IpcEvent.OnStartupExport, () => {
    exportFolders().then((r: any) => r != undefined ? console.log(r) :console.log(""));
  });
  ipcRenderer.on(IpcEvent.ClearFoldersUpdateThumbnails, () => {
    clearFoldersUpdateThumbnails(dispatch, refreshFolders).then((r: any) => r != undefined ? console.log(r) :console.log(""));
  });
  ipcRenderer.on(IpcEvent.ClearUnusedTags, () => {
    clearUnusedTags(dispatch).then((r: any) => r != undefined ? console.log(r) :console.log(""));
  });
  ipcRenderer.on(IpcEvent.CalculateTagRelations, () => {
    calculateTagRelations(dispatch).then((r: any) => r != undefined ? console.log(r) :console.log(""));
  });
};

const clearIpcEventListeners = (): void => {
  ipcRenderer.removeAllListeners(IpcEvent.AddFolders);
  ipcRenderer.removeAllListeners(IpcEvent.OpenSetting);
  ipcRenderer.removeAllListeners(IpcEvent.OpenManageTags);
  ipcRenderer.removeAllListeners(IpcEvent.ImportData);
  ipcRenderer.removeAllListeners(IpcEvent.ExportData);
  ipcRenderer.removeAllListeners(IpcEvent.OnStartupExport);
  ipcRenderer.removeAllListeners(IpcEvent.ClearFoldersUpdateThumbnails);
  ipcRenderer.removeAllListeners(IpcEvent.ClearUnusedTags);
  ipcRenderer.removeAllListeners(IpcEvent.CalculateTagRelations);
};

export { initIpcEventListeners, clearIpcEventListeners };
