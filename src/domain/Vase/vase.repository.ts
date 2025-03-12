import AppDataSource from '../../config/appDataSource';
import { Vase } from './vase.entity';

export const VaseRepository = AppDataSource.getRepository(Vase);
