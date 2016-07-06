import React from 'react'
import { Route, IndexRoute } from 'react-router'
import BlogApp from '../components/BlogApp';
import NotFound from '../components/NotFound';

import ArticleList from '../components/ArticleList';
import ArticleDetail from '../components/ArticleDetail';



export default (
    <Route component={BlogApp}>
        <IndexRoute component={ArticleList}/>
        <Route path="/:id" components={ArticleDetail}/>
        <Route path="*" components={{main: NotFound}}/>
    </Route>

)
