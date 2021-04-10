import React, { Component } from 'react';

class User extends Component {
  render() {
    return (
      <div>
        <h1> This Is Gonna Be A User Profile!</h1>
        <p>Gonna have user picture</p>
        <p> Gonna have users actual name</p>
        <p>
          {' '}
          You're are gonna be able to look at articles and comments by a certain
          user
        </p>
      </div>
    );
  }
}

export default User;
