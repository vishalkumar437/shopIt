import { userInfo } from "../interface/interface";
export const userLogin = (userInfo:userInfo) => {
    return {
      type: 'USER_LOGIN',
      payload: userInfo
    };
  };
  
  export const sellerLogin = (sellerInfo:userInfo) => {
    return {
      type: 'SELLER_LOGIN',
      payload: sellerInfo
    };
  };
  
  export const logout = () => {
    return {
      type: 'LOGOUT'
    };
  };
  