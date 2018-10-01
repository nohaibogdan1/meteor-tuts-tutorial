import  SimpleSchema  from 'simpl-schema';

export default new SimpleSchema({
    text: {
        type: String
    },
    otherUserId: {
        type: String
    },
    userId: {
        type: String
    }
}); 