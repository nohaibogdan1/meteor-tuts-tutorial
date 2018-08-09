import {Meteor} from 'meteor/meteor';
import {Posts} from '/imports/db';
import Security from '/imports/api/security';
import {listPostsQuery} from '/imports/db/queries';

// for testing change Meter.userId() to this.userId

export default class PostService {
    static createPost(post) {
        // Security.checkLoggedIn(Meteor.userId());
        // post.userId = Meteor.userId();

        Security.checkLoggedIn(this.userId);
        post.userId = this.userId;

        return Posts.insert(post);
    };

    static listPosts() {
        const posts = listPostsQuery.clone({}).fetch();
        return posts;
    };

    static editPost(_id, postData) {
        // Posts.update({_id, userId: Meteor.userId()}, {
        //     $set: {
        //         title: postData.title,
        //         description: postData.description
        //     }
        // });

        Posts.update({_id, userId: this.userId}, {
            $set: {
                title: postData.title,
                description: postData.description
            }
        });
    };

    static removePost(_id) {
        // Posts.remove({_id, userId: Meteor.userId()});
        Posts.remove({_id, userId: this.userId});
        
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