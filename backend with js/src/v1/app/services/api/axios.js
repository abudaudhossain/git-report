import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.github.com",
  timeout: 5000,
  headers: {
    "X-Custom-Header-Name": "by me",
  },
});
const cookiesGet = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

instance.interceptors.request.use(
  (config) => {
    try {
        console.log("Intercepting request...");
        config.headers["X-interceptor-header"] = "interception";

        console.log("Interceptor Config:", config);
        console.log(
            "======================================== End request interceptor ============================="
        );

      return config;
    } catch (error) {
      console.error("Error in interceptor:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Error from interceptors:", error);
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

export const getAPI = async (endPoint) => {
  try {
    let response = await instance.get(endPoint);
    return {
      isSuccess: true,
      message: "Successful",
      data: response.data,
    };
  } catch (error) {
    console.error(
      `code: ${error.code} ${error.message}\n${
        error?.response?.data && JSON.stringify(error.response.data)
      }\n${error.stack}`
    );

    return {
      isSuccess: false,
      message: error?.response?.data?.message || error.message,
      errorCode: error.code,
      statusCode: error.response?.status || error?.status,
      statusText: error.response.statusText,
      data: error.response.data,
    };
  }
};

export const postAPI = async (endPoint, data, config) => {
  try {
    let response = await instance.post(endPoint, data, config);
    return {
      isSuccess: true,
      message: "Successful",
      data: response.data,
    };
  } catch (error) {
    console.error(
      `code: ${error.code} ${error.message}\n${
        error?.response?.data && JSON.stringify(error.response.data)
      }\n${error.stack}`
    );

    return {
      isSuccess: false,
      message: error?.response?.data?.message || error.message,
      errorCode: error.code,
      statusCode: error.response?.status || error?.status,
      statusText: error.response.statusText,
      data: error.response.data,
    };
  }
};
