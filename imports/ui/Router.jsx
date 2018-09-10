import React from 'react';
import {Route} from 'react-router';

import App from './App';
import Home from './pages/Home';
import PostCreate from './pages/Posts/PostCreate';
import PostEdit from './pages/Posts/PostEdit';
import PostList from './pages/Posts/PostList';
import PostListReactive from './pages/Posts/PostListReactive';
import PostView from './pages/Posts/PostView';
import Register from './pages/Users/Register';
import Login from './pages/Users/Login';
import RoutesEnum from './routes';

const Router = () =>
    <App>
        <Route exact path={RoutesEnum.HOME} component={Home}/>
        <Route exact path={RoutesEnum.POSTS} component={PostList} />
        <Route exact path={RoutesEnum.POSTS_REACTIVE} component={PostListReactive} />
        <Route exact path={RoutesEnum.POSTS_CREATE} component={PostCreate} />
        <Route exact path={RoutesEnum.POSTS_EDIT} component={PostEdit} />
        <Route exact path={RoutesEnum.POSTS_VIEW} component={PostView} />
        <Route exact path={RoutesEnum.REGISTER} component={Register} />
        <Route exact path={RoutesEnum.LOGIN} component={Login} />
    </App>

export default Router;