/**
 * @jsx React.DOM
 */

// Token to send when submit form
var token = $('meta[name="csrf-token"]').attr('content');

$.ajaxSetup({
  beforeSend: function (xhr) {
    xhr.setRequestHeader('X-CSRF-Token', value);
  }
});

// Flash message
var HomeView = React.createClass({
  render : function () {
    return (
      <div>
      <p>{this.props.message}</p>
      <a href="#/blogs/new">New Blog</a>
      </div>
    );
  }
});

// Form
var NewBlogView = React.createClass({
  handleSubmit: function () {
    var name = this.refs.name.getDOMNode().value.trim();
    $.ajax({
      url: '/blogs',
      dataType: 'json',
      type: 'POST',
      data: {
        'blog': {
          'name': name
        }
      },
      success: function (data) {
        r.message = data.message;
        r.navigate('/', {trigger: true});
      }.bind(this)
    });
    return false;
  },

  render : function () {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" id="name" ref="name" placeholder="Nome" />
        <button type="submit"><span>Create Blog</span></button>
      </form>
      <a href="/">Home</a>
      </div>
    );
  }
});

var Router = Backbone.Router.extend({
  message: '',
  routes: {
    "": "index",
    "blogs/new": "new_blog"
  },
  index: function () {
    var self = this;
    React.renderComponent(
      <HomeView message={self.message}/>,
      document.getElementById('new-blog')
    );
  },
  new_blog: function () {
    React.renderComponent(
      <NewBlogView message={self.message}/>,
      document.getElementById('new-blog')
    );
  }
});

var r = new Router();

if (!Backbone.History.started) {
  Backbone.history.start();
};