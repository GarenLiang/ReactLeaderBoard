'use strict';

$(document).ready(function () {
  var urlRecent = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
  var urlAllTime = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';

  var App = React.createClass({
    displayName: 'App',
    getInitialState: function getInitialState() {
      return {
        users: [],
        active: 'recent'
      };
    },

    getAndUpdateUsers: function getAndUpdateUsers(url, active) {
      $.getJSON(url, function (data) {
        this.setState({
          users: data,
          active: '' + active
        });
      }.bind(this));
    },
    recentClick: function recentClick(e) {
      this.getAndUpdateUsers(urlRecent, 'recent');
    },
    alltimeClick: function alltimeClick(e) {
      this.getAndUpdateUsers(urlAllTime, 'allTime');
    },
    componentDidMount: function componentDidMount() {
      this.getAndUpdateUsers(urlRecent, 'recent');
    },
    render: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Camper Leaderboard'
        ),
        React.createElement(
          'table',
          { className: 'table' },
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              null,
              '#'
            ),
            React.createElement(
              'th',
              null,
              'Camper Name'
            ),
            React.createElement(
              'th',
              { onClick: this.recentClick },
              'Points in past 30 days ',
              React.createElement(
                'span',
                { className: this.state.active == 'recent' ? '' : 'none' },
                '▼'
              )
            ),
            React.createElement(
              'th',
              { onClick: this.alltimeClick },
              'All time points  ',
              React.createElement(
                'span',
                { className: this.state.active == 'recent' ? 'none' : '' },
                '▼'
              )
            )
          ),
          this.state.users.map(function (item, index) {
            return React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                null,
                index + 1
              ),
              React.createElement(
                'td',
                null,
                React.createElement(
                  'a',
                  { href: 'https://www.freecodecamp.com/' + item.username, target: '_blank' },
                  ' ',
                  React.createElement('img', { className: 'user-img', src: item.img }),
                  item.username
                )
              ),
              React.createElement(
                'td',
                null,
                item.recent
              ),
              React.createElement(
                'td',
                null,
                item.alltime,
                ' '
              )
            );
          })
        )
      );
    }
  });

  ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
});
