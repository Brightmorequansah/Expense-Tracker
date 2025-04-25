export const useGetUserInfo = () => {
    const authData = localStorage.getItem("auth");
  
    if (!authData) {
      return { email: null, profilePhoto: null, userID: null, isAuth: false };
    }
  
    const { email, profilePhoto, userID, isAuth } = JSON.parse(authData);
  
    return { email, profilePhoto, userID, isAuth };
  };
  