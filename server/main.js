import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users'; // executes the file
import { Links } from '../imports/api/links'; // setup links db collection 
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
    WebApp.connectHandlers.use((req,res,next) => {
        const _id = req.url.slice(1); // remove first character
        const link = Links.findOne({_id});
        if(link){
            res.statusCode = 302;
            res.setHeader('Location', link.url);
            res.end();
            Meteor.call('links.trackVisit', _id);
        } else {
            next();
        }
    });
});