import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userRegister, userLogin } from "./Reducers/AuthReducers";
// import { createTickets, showTickets } from "./Reducers/AddTicketsReducers";
import { createTickets } from "./Reducers/AddTicketsReducers";

const initialState = {
  // userSignInInfo: localStorage.getItem('userRegister')?JSON.parse(localStorage.getItem('userRegister')):{},
  // userLoginInfo:localStorage.getItem('userLogin')? JSON.parse(localStorage.getItem('userLogin')):{},
  // userTickets:{
  // //    addedTickets: localStorage.getItem('allTickets')? JSON.parse(localStorage.getItem('allTickets')):[],
  //    allTickets:[]
  // },
//   userTickets: localStorage.getItem("allTickets")
//     ? JSON.parse(localStorage.getItem("allTickets"))
//     : [],
//   allTickets: localStorage.getItem("allTickets")
//     ? JSON.parse(localStorage.getItem("allTickets"))
//     : [],
  addedTickets: [],

  userRegisterInfo: localStorage.getItem("userRegister")
    ? JSON.parse(localStorage.getItem("userRegister"))
    : "",
  userLoginInfo: localStorage.getItem("userLogin")
    ? {loading:false,userLoginInfo:JSON.parse(localStorage.getItem("userLogin"))}
    : "",
    // userLoginInfo: {loading:false,userLoginInfo:{'name':'aa'}},
  // userSignOut:''
};

const reducer = combineReducers({
  userRegisterInfo: userRegister,
  userLoginInfo: userLogin,
  addedTickets: createTickets,
});
const composeEnhancer = window.__Redux_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default Store;
