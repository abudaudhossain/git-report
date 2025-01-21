import { getAPI } from 'api/axios';

export const getRepositories = async (setData, config) => {
  let response = await getAPI('/api/v1/repositories/selected',config);
  if (response.isSuccess) {
    setData(response.data);
  } else {
    setData([]);
  }
};
