import _ from 'underscore';

const PostReactionsEnum = {
    LIKE: 'like',
    LOVE: 'love',
    HAPPY: 'happy',
    WOW: 'wow',
    SAD: 'sad',
    ANGRY: 'angry'
}

export const reactions = _.values(PostReactionsEnum);