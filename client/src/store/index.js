import {createStore, applyMiddleware} from "redux";// no me deja createStore
import {composeWithDevTools} from "@redux-devtools/extension";
import thunk from "redux-thunk";
import rootReducer from"../reducer/index";


export const store= createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))