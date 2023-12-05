import authedUser from "./reducers/authedUser";
import users from "./reducers/users";
import questions from "./reducers/questions";
import { combineReducers } from "redux";
import { createStore } from "redux";

import reducer from "./reducers";
import middleware from "./middleware";

 combineReducers({
    users,
    questions,
    authedUser,
})

const store = createStore(reducer, middleware);
export default store;