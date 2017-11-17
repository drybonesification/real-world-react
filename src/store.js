import { createStore, applyMiddleware,combineReducers,compose } from "redux";
import { promiseMiddleware, localStorageMiddleware } from "./middleware";

import auth from "./reducers/auth"
import common from "./reducers/common"
import home from "./reducers/home"
import settings from "./reducers/settings"
import article from "./reducers/article"

const reducer = combineReducers({
  auth,
  common,
  home,
  settings,
  article
})

const middleware = applyMiddleware(promiseMiddleware);

const store = createStore(
    reducer,
    compose(
      applyMiddleware(promiseMiddleware,localStorageMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

export default store;
