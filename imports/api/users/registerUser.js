import {Meteor} from 'meteor/meteor';
import listUsersQuery from '/imports/api/users/queries/listUsers';

export default function registerUser(data) {
    const user = listUsersQuery.clone({emailAddress:data.email}).fetchOne();
    if (user) {
        throw new Meteor.Error(500, 'email_already_taken',
            'Email already taken');
    }

    Accounts.createUser({
        email: data.email,
        password: data.password
    });
}