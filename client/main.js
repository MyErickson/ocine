import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

//router
import { BrowserRouter, Route , Switch } from 'react-router-dom';
 
import App from '../imports/ui/App.js';
import Accueil from '../imports/ui/Accueil/Accueil.js';


 const Root = () => (
   <BrowserRouter>
      <App/>
   </BrowserRouter>
 )
Meteor.startup(() => {
  render(<Root />, document.getElementById('app'));
});
