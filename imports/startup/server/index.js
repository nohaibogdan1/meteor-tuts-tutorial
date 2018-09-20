import '/imports/db';
import '/imports/db/links';
import '/imports/api/server';

import {ServiceConfiguration} from 'meteor/service-configuration';


ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
        $set: {
            appId: Meteor.settings.facebook.appId,
            secret: Meteor.settings.facebook.secret
        }
    }
);


Accounts.onCreateUser((user) => {
    if (!user.services.facebook) {
        return user;
    }
    user.username = user.services.facebook.name;
    user.emails = [{address: user.services.facebook.email}];
    user.emails[0].verified = true;
    return user;
});