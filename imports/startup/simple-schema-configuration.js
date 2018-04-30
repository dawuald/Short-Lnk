import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

// Throw custom error from simpl-schema
SimpleSchema.defineValidationErrorTransform(error => {
    return new Meteor.Error(400, error.message);
});