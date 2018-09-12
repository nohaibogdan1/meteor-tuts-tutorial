import {Meteor} from 'meteor/meteor';
import {Posts} from '/imports/db';
import Security from '/imports/api/security';
import listPostsQuery from '/imports/api/posts/queries/listPosts';

export default class PostService {
    static createPost(post) {
        Security.checkLoggedIn(Meteor.userId());
        post.userId = Meteor.userId();
        return Posts.insert(post);
    };

    static listPosts() {
        const posts = listPostsQuery.clone({}).fetch();
        return posts;
    };

    static editPost(_id, postData) {
        Posts.update({_id, userId: Meteor.userId()}, {
            $set: {...postData}
        });
    };

    static removePost(_id) {
        Posts.remove({_id, userId: Meteor.userId()});
        
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
    }


 
} 