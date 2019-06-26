import { Mongo } from 'meteor/mongo';
 
export const Movie = new Mongo.Collection('movies');

 
// Meteor.methods({
//     'movies.insert'(title,video,jour,heure) {
//       check(title, String);
//       check(video, String);
//       check(jour, String);
//       check(heure, String);
   
//        // Assurez-vous que l'utilisateur est connecté avant d'insérer une tâche
//       if (!this.userId) {
//         throw new Meteor.Error('not-authorized');
//       }
   
//       Movie.insert({
//         title,
//         video,
//         jour,
//         heure,
//         createdAt: new Date(),
//         owner: this.userId,
//         username: Meteor.users.findOne(this.userId).username,
//       });
//     },
// }