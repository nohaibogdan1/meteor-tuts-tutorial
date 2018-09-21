import '/imports/db';
import '/imports/db/links';
import '/imports/api/server';

import {ServiceConfiguration} from 'meteor/service-configuration';
import Users from '../../db/users/collection';

ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
        $set: {
            appId: Meteor.settings.facebook.appId,
            secret: Meteor.settings.facebook.secret
        }
    }
);

Accounts.onCreateUser((options, user) => {
    if (!user.services.facebook) {
        return user;
    }
    const existingUser = Accounts.findUserByEmail(user.services.facebook.email);
    if (existingUser) {
        services = {...existingUser.services, facebook:user.services.facebook};
        Users.update({_id: existingUser._id},{"$set":{services}});
        return;
    }   
    user.username = user.services.facebook.name;
    user.emails = [{address: user.services.facebook.email}];
    user.emails[0].verified = false;
    return user;
});