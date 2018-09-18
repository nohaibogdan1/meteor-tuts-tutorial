import _ from 'underscore';

const PostReactionsEnum = {
    LIKE: 'like',
    LOVE: 'love',
    HAPPY: 'happy',
    WOW: 'wow',
    SAD: 'sad',
    ANGRY: 'angry'
}
const reactions = _.values(PostReactionsEnum);

export {reactions};