import { Meteor } from 'meteor/meteor';
import {assert} from 'chai';

import Posts from './../../../../db/posts/collection';

describe('posts', function () {
    const postOne = {
        title: 'Title one',
        description: 'Description post one'
    }


    it('should insert new post', function() {
        const userId = 'userid1';
        const _id = Meteor.server.method_handlers['post.create'].apply({ userId }, [postOne]);
        assert.isTrue(Posts.find({_id}), 'post is inserted');
    });
});