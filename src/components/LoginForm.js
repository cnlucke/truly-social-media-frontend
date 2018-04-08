import React from 'react'
import { connect } from 'react-redux'
import { logIn } from '../actions/userActions'
import { withRouter } from 'react-router-dom'

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
      <div id="login-form">
        <form onSubmit={this.handleSubmit} >
          <input  type="email"
                  name='email'
                  className="login-input"
                  placeholder="enter email address"
                  autoComplete='email'
                  onChange={this.handleOnChange}/>
                {(this.state.showError) ? this.state.error : null}
          <input  type="password"
                  name='password'
                  className="login-input"
                  placeholder="enter password"
                  autoComplete='new-password'
                  onChange={this.handleOnChange}/>
          <input className="form-submit" type="submit" value="log in" />
        </form>
      </div>
    )
  }
}

export default connect(null, { logIn })(withRouter(LoginForm))