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
  render: function () {
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

  render: function () {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" id="name" ref="name" placeholder="Nome" />
        <button><span>Create Blog</span></button>
      </form>
      <a href="/">Home</a>
    );
  }
});