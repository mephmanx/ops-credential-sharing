import moment from 'moment';
import {DataSourceOptions, FileLogger} from 'typeorm';
import {DATABASE, LOG} from '../../common/variables/commonVariables';
import {DateTime} from '../../common/enums/commonEnums';
import {Category, Folder, Language, Tag, TagType} from '../entity/entity';
import {initDirectory} from '../../utilities/utilityFunctions';

/**
 * Since typeorm logger base path is where
 * main process is running and the Log folder
 * is outside at program directory, backtrack is
 * necessary to get desired location.
 */
const getLogPath = (): string => {
  initDirectory(LOG.DIRECTORY);
  const programDirectory = process.cwd();
  const needToBeRemovedPath = __dirname.replace(programDirectory, '');
  const backtrackCount = (needToBeRemovedPath.match(/\\/g) || []).length;
  const backtrackString = '../'.repeat(backtrackCount);
  return `${backtrackString}/${LOG.DIRECTORY}/${moment().format(
      DateTime.DateFileFormat
  )}-QUERY.log`;
};

const ormConfig: DataSourceOptions = {
  type: "sqlite",
  database: DATABASE.PATH,
  driver: {
    "type": "sqlite",
    "database": DATABASE.PATH
  },
  synchronize: true,
  logging: true,
  entities: [Folder, Category, Language, Tag, TagType],
  logger: new FileLogger('all', {logPath: getLogPath()}),
  subscribers: [],
  migrations: [],
};

export default ormConfig;
