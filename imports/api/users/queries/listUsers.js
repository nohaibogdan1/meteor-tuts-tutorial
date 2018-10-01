import {Users} from '/imports/db';

export default Users.createQuery('listUsers', {
    $filter({filters, params}) {
        if (params.emailAddress) {
            filters.emailAddress = params.emailAddress; 
        }
        if (params._id) {
            filters._id = params._id;
        }
    },

    _id: 1,
    emailAddress: 1 
});