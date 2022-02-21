import React from 'react';


export default class Login extends React.Component {
  
  render() {
    const {onClick} = this.props;
    return (
      <form>
        <h1>Login lol jks does not work</h1>
        <div>
        <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div>
        <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <input type="submit" value="Hide" onClick={onClick}/>
      </form>
      
    );
  }
}