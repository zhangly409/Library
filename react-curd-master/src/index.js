import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import HomePage from './pages/Home';
import UserAddPage from './pages/UserAdd';
import UserListPage from './pages/UserList';
import UserEditPage from './pages/UserEdit';
import BookAddPage from './pages/BookAdd';
import BookListPage from './pages/BookList';
import BookEditPage from './pages/BookEdit';
import LoginPage from './pages/Login';
import HomeLayout from './layouts/HomeLayout';
import FeedbackListPage from './pages/FeedbackListPage'
import FeedbackAddPage from './pages/FeedbackAddPage'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route component={HomeLayout}>
      <Route path="/" component={HomePage}/>
      <Route path="/user/add" component={UserAddPage}/>
      <Route path="/user/list" component={UserListPage}/>
      <Route path="/user/edit/:id" component={UserEditPage}/>
      <Route path="/book/add" component={BookAddPage}/>
      <Route path="/book/list" component={BookListPage}/>
      <Route path="/book/edit/:id" component={BookEditPage}/>
      <Route path="/feedback/list" component={FeedbackListPage}/>
      <Route path="/feedback/add" component={FeedbackAddPage}/>
    </Route>
    <Route path="/login" component={LoginPage}/>
  </Router>
), document.getElementById('app'));
