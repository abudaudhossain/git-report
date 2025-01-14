export const generatedReport = (repo, owner) => {
  try {
    // find to github user access token by user installation id
    


    // get repo details api
    
    return {
        isSuccess: true,
        message: "Report generated success",
        data:[]
    }
  } catch (error) {
    console.error(`${error.message} ${error.stack}`);
    return {
      isSuccess: false,
      message: `Report generated failed.`,
    };
  }
};
