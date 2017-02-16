import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
const T = i18n.createComponent();

import Banner from '../../../components/common/Banner';
import ListDivider from '../../../components/list/ListDivider';
import LiveEditor from '../../common/LiveEditor';
import IdeaInviteCollaborator from '../../../components/ideas/IdeaInviteCollaborator';

export default class IdeaAuthorButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.changeView = this.changeView.bind(this);
    this.handleIdeaRemoveClick = this.handleIdeaRemoveClick.bind(this);
    this.publishIdea = this.publishIdea.bind(this);
    this.unpublishIdea = this.unpublishIdea.bind(this);
  }
  clickDropdown(event){
    event.preventDefault();
    $('.dropdown-button').dropdown({
      alignment: 'right'
    }); /* initialize */
    $('.dropdown-button').dropdown('open');
  }
  publishIdea() {
    Meteor.call("idea.publish", this.props.idea._id, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){}
    });
  }
  unpublishIdea() {
    Meteor.call("idea.unpublish", this.props.idea._id, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){}
    });
  }
  handleIdeaRemoveClick(event) {
    event.preventDefault();
    Meteor.call("idea.remove", this.props.idea._id, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){}
    });
    this.context.router.push('/ideas/yours');
  }
  // bubbling up event
  changeView(event) {
    event.preventDefault();
    this.props.onViewChanged(event);
  }
  render () {
    return (
      <div className="right">
        {(this.props.edit && Meteor.userId()) ?
        <div className="btn-group">
          <button className="dropdown-button waves-effect waves-light green part-left btn" onClick={this.changeView}><T>ideas.edit.preview</T></button>
          <button className="dropdown-button waves-effect waves-light green part-right btn" data-activates="dropdown" onClick={this.clickDropdown}><i className="fa fa-caret-down"></i></button>
          <span className="caret"></span>
          <span className="sr-only">Toggle Dropdown</span>
          <ul id="dropdown" className="dropdown-content">
            <li><a href="#!">Add collaborators</a></li>
            <li className="divider"></li>
            <li><a href="#!" onClick={this.handleIdeaRemoveClick} title={i18n.__('ideas.edit.delete')}><T>ideas.edit.delete</T></a></li>
          </ul>
        </div> :
        <div className="btn-group">
          {!this.props.idea.isPublic() ?
            <button className="dropdown-button waves-effect waves-light green part-left btn" onClick={this.publishIdea}><T>ideas.publish.header.publish</T></button>
            :
            <button className="dropdown-button waves-effect waves-light green part-left btn" onClick={this.unpublishIdea}><T>ideas.publish.header.unpublish</T></button>
          }
          <button className="dropdown-button waves-effect waves-light green part-right btn" data-activates="dropdown" onClick={this.clickDropdown}><i className="fa fa-caret-down"></i></button>
          <span className="caret"></span>
          <span className="sr-only">Toggle Dropdown</span>
          <ul id="dropdown" className="dropdown-content">
            <li><a href="#!" onClick={this.changeView} className="edit" title={i18n.__('ideas.edit.edit')}><T>ideas.edit.edit</T></a></li>
            <li><a href="#!">Add collaborators</a></li>
            <li className="divider"></li>
            <li><a href="#!" onClick={this.handleIdeaRemoveClick} title={i18n.__('ideas.edit.delete')}><T>ideas.edit.delete</T></a></li>
          </ul>
        </div>
      }
      </div>
    )
  }
}

IdeaAuthorButtonGroup.contextTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}
