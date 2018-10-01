import React from 'react';
import {Route} from 'react-router';

import App from './App';
import Home from './pages/Home';
import PostCreate from './pages/Posts/PostCreate';
import PostEdit from './pages/Posts/PostEdit';
import PostView from './pages/Posts/PostView';
import Register from './pages/Users/Register';
import Login from './pages/Users/Login';
import RoutesEnum from './routes/enums/routes';
import PostList from './pages/Posts/PostList';
import ChatLayout from './pages/chat/ChatLayout';

const Router = () =>
    <App>
        <Route exact path={RoutesEnum.HOME} component={Home}/>
        <Route exact path={RoutesEnum.POSTS_REACTIVE} component={PostList} />
        <Route exact path={RoutesEnum.POSTS_CREATE} component={PostCreate} />
        <Route exact path={RoutesEnum.POSTS_EDIT} component={PostEdit} />
        <Route exact path={RoutesEnum.POSTS_VIEW} component={PostView} />
        <Route exact path={RoutesEnum.REGISTER} component={Register} />
        <Route exact path={RoutesEnum.LOGIN} component={Login} />
        <Route exact path={RoutesEnum.CHAT} component={ChatLayout} />
    </App>

export default Router;