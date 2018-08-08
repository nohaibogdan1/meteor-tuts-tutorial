import {Users} from '/imports/db';

export default Users.createQuery('listUsers', {
    $filter({filters, params}) {
        if (params.emailAddress) {
            filters.emailAddress = params.emailAddress; 
        }
    }
});