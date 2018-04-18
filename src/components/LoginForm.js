import React from 'react'
import { connect } from 'react-redux'
import { logIn } from '../actions/userActions'
import { withRouter, Link } from 'react-router-dom'

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    showError: false,
    error: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.logIn(this.state.email, this.state.password, this.props.history)
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div id="login-form-container">
        <form id="login-form" onSubmit={this.handleSubmit} >
          <Link to='/signup' id='switch-link'>don't have an account?</Link>
          <input  type="email"
                  name='email'
                  className="login-input"
                  placeholder="enter email address"
                  autoComplete='email'
                  onChange={this.handleOnChange} required='true' autoFocus/>
                {(this.state.showError) ? this.state.error : null}
          <input  type="password"
                  name='password'
                  className="login-input"
                  placeholder="enter password"
                  autoComplete='new-password'
                  onChange={this.handleOnChange}/>
                <input className="form-submit" type="submit" value="log in" required/>
        </form>
      </div>
    )
  }
}

export default connect(null, { logIn })(withRouter(LoginForm))
