import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Accounts } from 'meteor/std:accounts-ui';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { mount } from 'react-mounter';

import { AppLayout } from '../../ui/layouts/AppLayout.jsx';
import ProfilePage from '../../ui/pages/ProfilePage.jsx';
import LoginPage from '../../ui/pages/LoginPage.jsx';

i18n.setLocale('ru');

// Accounts.ui.config({
//   requestPermissions: {
//     facebook: ['user_likes'],
//     github: ['user', 'repo']
//   },
//   requestOfflineToken: {
//     google: true
//   },
//   passwordSignupFields: 'EMAIL_ONLY',
// });

Accounts.ui.config({
  //passwordSignupFields: 'EMAIL_ONLY_NO_PASSWORD',
  loginPath: '/login',
  onSignedInHook: () => FlowRouter.go('/profile'),
  onSignedOutHook: () => FlowRouter.go('/')
});

FlowRouter.route('/', {
    // do some action for this route
    action: function(params, queryParams) {
        mount(AppLayout, {
          content: (<LoginPage />)
        });
    },
    name: "Landing.NoAuth" // optional
});

FlowRouter.route("/login", {
  name: "LoginForm", // optional
  action: function(params, queryParams) {
    mount(AppLayout, {
      content: (<LoginPage />)
    });
  }
});

FlowRouter.route('/profile', {
  name: 'Profile',
  action(params, queryParams) {
    mount(AppLayout, {
      content: (<ProfilePage />)
    });
  }
});
//
// FlowRouter.route('/companies', {
//   name: 'Companies',
//   action(params, queryParams) {
//     console.log("Looking at a profile?");
//   }
// });
//
// FlowRouter.route('/teams', {
//   name: 'Teams',
//   action(params, queryParams) {
//     console.log("Looking at a profile?");
//   }
// });
