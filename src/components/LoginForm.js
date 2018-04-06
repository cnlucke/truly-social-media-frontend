import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/userActions'

const LoginForm = (props) => {
  return (
    <div id="login-form">
      <form onSubmit={props.loginUser} >
        <input type="email" className="login-input" placeholder="enter email address" autoComplete='email'/>
        <input type="password" className="login-input" placeholder="enter password" autoComplete='new-password'/>
        <input type="password" className="login-input" placeholder="confirm password" autoComplete='new-password'/>
          <input className="form-submit" type="submit" value="log in" />
      </form>
    </div>
  )
}

export default connect(null, { loginUser })(LoginForm)
