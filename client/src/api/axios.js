import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 15000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true
  }
});

instance.interceptors.request.use(
  (config) => {
    try {
      // console.log("Intercepting request...");
      // config.headers["X-interceptor-header"] = "interception";

      console.log("Interceptor Config:", config.headers);
      // console.log(
      //     "======================================== End request interceptor ============================="
      // );

      return config;
    } catch (error) {
      console.error('Error in interceptor:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error('Error from interceptors:', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // console.log(
    //     " from res inter: ",
    //     response.status,
    //     "headers: ",
    //     response.headers,
    //     "data: ",
    //     response.data,
    //     "=====================================end res interceptor ==============================="
    // );
    return response;
  },
  (error) => {
    console.log(error.code);

    // console.log("error from res inter: ", error.response,"===================================================== end inter res error ==========================================");
    // console.log("error from res inter: ", error.resp);

    return Promise.reject(error);
  }
);

export const getAPI = async (endPoint, config = {}) => {
  try {
    let response = await instance.get(endPoint, config);
    return {
      isSuccess: true,
      message: 'Successful',
      data: response.data
    };
  } catch (error) {
    console.error(
      `end point - (get): ${endPoint}\ncode: ${error.code} ${error.message}\n${
        error?.response?.data && JSON.stringify(error.response.data)
      }\n${error.stack}`
    );

    return {
      isSuccess: false,
      message: error?.response?.data?.message || error.message,
      errorCode: error.code,
      statusCode: error.response?.status || error?.status,
      statusText: error.response?.statusText,
      data: error.response.data
    };
  }
};

export const postAPI = async (endPoint, data, config) => {
  try {
    let response = await instance.post(endPoint, data, config);
    return {
      isSuccess: true,
      message: 'Successful',
      data: response.data
    };
  } catch (error) {
    console.error(`code: ${error.code} ${error.message}\n${error?.response?.data && JSON.stringify(error.response.data)}\n${error.stack}`);

    return {
      isSuccess: false,
      message: error?.response?.data?.message || error.message,
      errorCode: error.code,
      statusCode: error.response?.status || error?.status,
      statusText: error.response.statusText,
      data: error.response.data
    };
  }
};
