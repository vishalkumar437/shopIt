export interface user {
  email: string;
  name: string;
  password: string;
}

export interface userInfo{
    name:string;
    id:string;
}

export interface ProductFormData {
  name: string;
  description: string;
  seller: string;
  images: File[];
  price: string;
  category: string;
  subcategory: string;
  stock: string;
}

// Define action types
export interface UserLoginAction {
  type: "USER_LOGIN";
  payload: {
    name: string;
    id: string;
  };
}

export interface SellerLoginAction {
  type: "SELLER_LOGIN";
  payload: {
    name: string;
    id: string;
  };
}

export interface LogoutAction {
  type: "LOGOUT";
}


// Define initial state
export interface AppState {
  auth: AppState;
  isLoggedIn: boolean;
  isSeller: boolean;
  userInfo: { name: string,id:string } | null;
}
