import axios from 'axios';
import { BASE_API } from '../../common/variables/api';

const axiosConfig = (): void => {
  axios.defaults.baseURL = BASE_API;
};

export default axiosConfig;
