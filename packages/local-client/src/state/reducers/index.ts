import { combineReducers } from "redux";
import cellsReducer from "./cellReducer";
import bundlesReducer from "./bundlesReducer";

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
