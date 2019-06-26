import { Meteor } from 'meteor/meteor';
import '../imports/api/Movie';
import '../imports/api/Reservation';
import '../imports/api/Profil';
import '../imports/api/Commentaires';

Meteor.startup(() => {
  // code to run on server at startup
});
// Meteor.users.deny({
//   update() {return false}
// })