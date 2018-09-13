import {Meteor} from 'meteor/meteor';
import {Posts} from '/imports/db';
import Security from '/imports/api/security';
import listPostsQuery from '/imports/api/posts/queries/listPosts';

export default class PostService {
    static createPost(post) {
        Security.checkLoggedIn(post.userId);
        return Posts.insert(post);
    };

    static listPostsForRegisteredUsers() {
        return listPostsQuery.clone({}).fetch();
    };

    static listPostsForUnregisteredUsers() {
        return listPostsQuery.clone({isVisibleForEveryone: true}).fetch();
    };

    static listPosts(userId) {
        let posts = [];
        try{
            Security.checkLoggedIn(userId);
            posts = this.listPostsForRegisteredUsers();
        } catch(error) {
            posts = this.listPostsForUnregisteredUsers();
        }
        return posts;
    };

    static editPost({_id, userId, post}) {
        Posts.update({_id, userId }, {
            $set: {...post}
        });
    };

    static removePost({_id, userId}) {
        Posts.remove({_id, userId});  
    };

    static getPost(_id) {
        return listPostsQuery.clone({_id}).fetchOne();
    };

    static incrementViews(_id) {
        Posts.update(_id, {
            $inc: {
                views: 1
            }
        });
    };
} 