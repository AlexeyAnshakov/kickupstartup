import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Message, { MessageType } from './Message';

Meteor.methods({
  'message.idea.invitation.send':
  function(ideaId, recipientId, replyToMessageId, senderId, message) {
    check(ideaId, String);
    check(recipientId, String);
    check(senderId, String);
    check(replyToMessageId, Match.Maybe(String));
    check(message, String);

    let record = new Message({
      type: MessageType.INVITATION,
      recipientId,
      senderId,
      replyToMessageId,
      message
    });
    record.save();
    return record;
  },
  'message.idea.invitation.reply':
  function(ideaId, recipientId, replyToMessageId, senderId, message) {
    check(ideaId, String);
    check(recipientId, String);
    check(senderId, String);
    check(replyToMessageId, Match.Maybe(String));
    check(message, String);

    let record = new Message({
      type: MessageType.RESPONSE,
      recipientId,
      senderId,
      replyToMessageId,
      message
    });
    record.save();
    return record;
  },
  'message.idea.feedback.ask': function(ideaId) {

  },
  'message.idea.feedback.provide': function(ideaId, feedback) {

  },
  'message.idea.notification.new': function(templateId, ideaId, authorId) {
    // this is a system event
    // recipient should be subscribed to new ideas
    // idea author should know how much users were notified
  },
  'message.idea.notification.commented': function(templateId, ideaId, authorId) {

  },
  'message.idea.notification.mentioned': function(templateId, ideaId, authorId) {

  }
});
