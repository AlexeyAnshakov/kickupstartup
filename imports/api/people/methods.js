import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Person from './Person';
import People from './people';

Meteor.methods({
  'profile.update':function(firstName, lastName, city, country, headline, aboutMe) {
    check(firstName, String);
    check(lastName, String);
    check(city, String);
    check(country, String);
    check(headline, String);
    check(aboutMe, String);

    if (!this.userId) {
      throw new Meteor.Error('profile.update.unauthorized',
        'Cannot update profile if unauthorized.');
    }
    const profile = Person.findOne({userId: this.userId});

    profile.set({
      firstName,
      lastName,
      headline,
      aboutMe
    });

    profile.location = {
      city,
      country
    }
    profile.save();
  },
  'person.idea.bookmark.add':function(ideaId) {
    check(ideaId, String);

    if (!this.userId) {
      throw new Meteor.Error('person.bookmark.idea.unauthorized',
        'Cannot bookmark an idea if unauthorized.');
    }
    // check if there is an idea in the database with ideaId specified
    const idea = Idea.findOne({_id: ideaId});
    if (!idea) {
      throw new Meteor.Error('person.bookmark.idea.notfound',
        'Cannot find an idea by specified id.');
    }
    //People.update({_id: this.userId }, { $addToSet: { bookmarkIdeas: ideaId }});
    const person = Person.findOne({userId: this.userId});
    if (person.bookmarkIdeas) {
      if (person.bookmarkIdeas.indexOf(ideaId) == -1) {
        person.bookmarkIdeas.push(ideaId);
      }
    } else {
      person.bookmarkIdeas = [ideaId];
    }
    person.save();
  },
  'person.idea.bookmark.remove':function(ideaId) {
    check(ideaId, String);

    if (!this.userId) {
      throw new Meteor.Error('person.bookmark.idea.unauthorized',
        'Cannot bookmark an idea if unauthorized.');
    }
    // check if there is an idea in the database with ideaId specified
    const idea = Idea.findOne({_id: ideaId});
    if (!idea) {
      throw new Meteor.Error('person.bookmark.idea.notfound',
        'Cannot find an idea by specified id.');
    }
    //People.update({_id: this.userId }, { $addToSet: { bookmarkIdeas: ideaId }});
    const person = Person.findOne({userId: this.userId});
    if (person.bookmarkIdeas) {
      let index = person.bookmarkIdeas.indexOf(ideaId);
      if (index != -1) {
        person.bookmarkIdeas.splice(index, 1);
        person.save();
      }
    }
  }
});
