
import {combineReducers} from 'redux';
import pointsReducer from "./pointsReducer";
import rReducer from "./rReducer";
import xReducer from "./xReducer";
import yReducer from "./yReducer";

//Combine all the sub reducers
const rootReducer = combineReducers({
    points:pointsReducer,
    r: rReducer,
    y: yReducer,
    x: xReducer
    // myCounter: counterReducer,
    // todos:todoReducer
})

export default rootReducer