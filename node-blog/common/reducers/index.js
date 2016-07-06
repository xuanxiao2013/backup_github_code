import { combineReducers } from 'redux';

import articleList from "./ArticleListReducer";
import article from "./ArticleReducer";

export default combineReducers({
  articleList,
  article
});
