import  SimpleSchema  from 'simpl-schema';

export default new SimpleSchema({
    postId: {
        type: String
    },
    text: {
        type: String
    },
    userId: {
        type: String
    }
}); 
