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
  console.log(response);
  if (response.isSuccess) {
    setData(response.data);
  } else {
    setData(null);
  }
};

const getDate = (data) => {
  try {
    console.log(data)
    let date = new Date(data);
    const timeZone =  'Asia/Dhaka';
    const options = {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    return new Intl.DateTimeFormat('en-US', options).format(date).replace(/\//g, '-');
  } catch (error) {
    console.log(error)
    return null;
  }
};
export const dataProcess = (day, data) => {
  try {
    let dateWise = {};
    let dateWiseContributorsCommitsCount = {};
    let contributors = Object.keys(data.dateWiseContributorsCommitsCount);
    console.log(contributors);
    for (let i = 0; i < day; i++) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      let lastDate = getDate(date);
     
      dateWise[lastDate] = data.dateWiseCommitsCount[lastDate] || 0;
      for (let contributor of contributors) {
        if (!dateWiseContributorsCommitsCount[contributor]) {
          dateWiseContributorsCommitsCount[contributor] = {};
        }
        dateWiseContributorsCommitsCount[contributor][lastDate] = data.dateWiseContributorsCommitsCount[contributor][lastDate] || 0;
      }
    }
  
    return { dateWise, dateWiseContributorsCommitsCount };
  } catch (error) {
    console.log(error)
  }
};
