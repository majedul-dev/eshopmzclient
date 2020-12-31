import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createProductReducer,
  deleteProductReducer,
  porductListReducer,
  productDetailsReducer,
  productReviewSaveReducer,
  updateProductReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  userLoginReducer,
  registerUserReducer,
  userDetaiilsReducer,
  userUpdateReducer,
  allUsersReducer,
  userDeleteReducer,
  getUserForUpdateReducer,
  updateUserByAdminReducer,
} from "./reducers/userReducer";
import {
  orderReducer,
  ordersDetailsReducer,
  orderPayReducer,
  orderListReducer,
  getOrderListReducer,
  orderDeliveryReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  createProduct: createProductReducer,
  productList: porductListReducer,
  productDetails: productDetailsReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,
  productReviewSave: productReviewSaveReducer,

  cart: cartReducer,

  userLogin: userLoginReducer,
  registerUser: registerUserReducer,
  userDetails: userDetaiilsReducer,
  userUpdate: userUpdateReducer,
  getUserForUpdate: getUserForUpdateReducer,
  updateUserByAdmin: updateUserByAdminReducer,
  allUsers: allUsersReducer,
  deleteUser: userDeleteReducer,

  order: orderReducer,
  orderDetails: ordersDetailsReducer,
  orderPay: orderPayReducer,
  orderLists: orderListReducer,
  getOrderList: getOrderListReducer,
  orderDelivery: orderDeliveryReducer,
});

const cartItemFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAdderessFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemFromStorage,
    shippingAddress: shippingAdderessFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
