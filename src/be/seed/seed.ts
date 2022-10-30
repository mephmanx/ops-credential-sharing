import "reflect-metadata"
import { DataSource } from 'typeorm';
import { DATABASE, SEED_DATA } from '../../common/variables/commonVariables';
import ormConfig from '../config/ormConfig';
import { Category, Language, TagType } from '../entity/entity';
import { fileExists, initDirectory } from '../../utilities/utilityFunctions';
let dataSource: DataSource;
const initDatabase = async (): Promise<void> => {
  if (!fileExists(DATABASE.PATH)) {
    initDirectory(DATABASE.DIRECTORY);
    // Generate database
    dataSource = new DataSource(ormConfig);

    // Generate tables
    const connection = dataSource.manager.connection;

    // Seeding data
    const queryBuilder = connection.createQueryBuilder();
    await queryBuilder
      .insert()
      .into(Category)
      .values(Object.values(SEED_DATA.CATEGORY).map(c => ({ Category: c })))
      .execute();
    await queryBuilder
      .insert()
      .into(Language)
      .values(Object.values(SEED_DATA.LANGUAGE).map(l => ({ Language: l })))
      .execute();
    await queryBuilder
      .insert()
      .into(TagType)
      .values(Object.values(SEED_DATA.TAG_TYPE).map(tt => ({ TagType: tt })))
      .execute();
  }
};

export default initDatabase;
