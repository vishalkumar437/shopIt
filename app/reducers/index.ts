import { InitialAppState,UserLoginAction,SellerLoginAction,LogoutAction } from "../interface/interface";

type ActionTypes = UserLoginAction | SellerLoginAction | LogoutAction;
  const initialState: InitialAppState = {
    isLoggedIn: false,
    isSeller: false,
    userInfo: null
  };
  
  // Define the reducer
  const authReducer = (state: InitialAppState = initialState, action: ActionTypes): InitialAppState => {
    switch (action.type) {
      case 'USER_LOGIN':
        return {
            ...state,
            isLoggedIn: true,
            isSeller: false,
            userInfo: {
              name: action.payload.name,
              id: action.payload.id
            }
        };
      case 'SELLER_LOGIN':
        return {
            ...state,
            isLoggedIn: true,
            isSeller: true,
            userInfo: {
              name: action.payload.name,
              id: action.payload.id
            }
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          isSeller: false,
          userInfo: null
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  