import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/userActions'

const SignUpForm = (props) => {
  return (
    <div id="signup-form">
      <form onSubmit={props.loginUser}>
        <input type="text" className="login-input" placeholder="enter first name" />
        <input type="text" className="login-input" placeholder="enter last name" />
        <input type="text" className="login-input" placeholder="enter city" />
        <input type="text" className="login-input" placeholder="enter state" />
        <input type="email" className="login-input" placeholder="enter email address" />
        <input type="password" className="login-input" placeholder="enter password" />
        <input type="password" className="login-input" placeholder="confirm password" />
        <input className="form-submit" type="submit" value="sign up" />
      </form>
    </div>
  )
}

export default connect(null, { loginUser })(SignUpForm)
