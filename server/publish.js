//Meteor.startup(function () {
//    // code to run on server at startup
//});
/**
 * Created by shaief on 11/19/14.
 */
Meteor.publish('users', function() {
    return Meteor.users.find();
});
