import { getAPI } from 'api/axios';

export const getRepositories = async (setData, config) => {
  let response = await getAPI('/api/v1/repositories/selected', config);

  if (response.isSuccess) {
    setData(response.data);
  } else {
    setData([]);
  }
};
export const getRepositoriesDetails = async (setData, id, config) => {
  let response = await getAPI(`/api/v1/repositories/report-generated/${id}`, config);
  console.log(response)
  if (response.isSuccess) {
    setData(response.data);
  } else {
    setData(null);
  }
};
