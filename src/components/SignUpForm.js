import React from 'react'
import { connect } from 'react-redux'
import { signUp } from '../actions/userActions'
import { withRouter } from 'react-router-dom'

class SignUpForm extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    city: '',
    state: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    showError: false,
    error: '',
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.password === this.state.passwordConfirmation) {
      this.props.signUp(this.state, this.props.history)
    } else {
      this.setState({ showError: true, error: '*passwords do not match*' })
    }
  }

  render() {
    return (
      <div id="signup-form">
        <form onSubmit={this.handleSubmit}>
          <input  name='first_name'
                  type="text"
                  className="login-input"
                  autoComplete='given-name'
                  onChange={this.handleOnChange}
                  placeholder="enter first name" />
                <input  name='last_name'
                  type="text"
                  className="login-input"
                  autoComplete='family-name'
                  onChange={this.handleOnChange}
                  placeholder="enter last name" />
          <input  name='city'
                  type="text"
                  className="login-input"
                  autoComplete='address-level2'
                  onChange={this.handleOnChange}
                  placeholder="enter city" />
          <input  name='state'
                  type="text"
                  className="login-input"
                  autoComplete='address-level1'
                  onChange={this.handleOnChange}
                  placeholder="enter state" />
          <input  name='email'
                  type="email"
                  className="login-input"
                  autoComplete='email'
                  onChange={this.handleOnChange}
                  placeholder="enter email address" />
          <input  name='password'
                  type="password"
                  className="login-input"
                  autoComplete='off'
                  onChange={this.handleOnChange}
                  placeholder="enter password" />
          <input  name='passwordConfirmation'
                  type="password"
                  className="login-input"
                  autoComplete='off'
                  onChange={this.handleOnChange}
                  placeholder="confirm password" />
                <p style={{color: 'red', margin: 0}}>{(this.state.showError) ? this.state.error : null}</p>
          <input  className="form-submit" type="submit" value="sign up" />
        </form>
      </div>
    )
  }
}

export default connect(null, { signUp })(withRouter(SignUpForm))
