import React from 'react'
import { connect } from 'react-redux'
import { signUp, updateProfile } from '../actions/userActions'
import { withRouter, Link } from 'react-router-dom'

class ProfileForm extends React.Component {
  constructor (props) {
    super();
    this.state = {
      first_name: (props.currentUser) ? props.currentUser.first_name : '',
      last_name: (props.currentUser) ? props.currentUser.last_name : '',
      city: (props.currentUser) ? props.currentUser.city : '',
      state: (props.currentUser) ? props.currentUser.state : '',
      email: (props.currentUser) ? props.currentUser.email : '',
      password: '',
      passwordConfirmation: '',
      showError: false,
      error: '',
    }
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const path = this.props.location.pathname.slice(1)
    if (this.state.password === this.state.passwordConfirmation) {
      if (path === 'signup') {
        this.props.signUp(this.state, this.props.history)
      } else {
        this.props.updateProfile(this.state, this.props.history)
      }
    } else {
      this.setState({ showError: true, error: '*passwords do not match*' })
    }
  }

  render() {
    const path = this.props.location.pathname.slice(1)
    return (
      <div id="signup-form">
        <form onSubmit={this.handleSubmit}>
          <Link to='/login' id='switch-link'>already have an account?</Link>
          <input  name='first_name'
                  type="text"
                  className="login-input"
                  autoComplete='given-name'
                  value={this.state.first_name}
                  onChange={this.handleOnChange}
                  placeholder="enter first name" autoFocus/>
                <input  name='last_name'
                  type="text"
                  className="login-input"
                  autoComplete='family-name'
                  value={this.state.last_name}
                  onChange={this.handleOnChange}
                  placeholder="enter last name" />
          <input  name='city'
                  type="text"
                  className="login-input"
                  autoComplete='address-level2'
                  value={this.state.city}
                  onChange={this.handleOnChange}
                  placeholder="enter city" />
          <input  name='state'
                  type="text"
                  className="login-input"
                  autoComplete='address-level1'
                  value={this.state.state}
                  onChange={this.handleOnChange}
                  placeholder="enter state" />
          <input  name='email'
                  type="email"
                  className="login-input"
                  autoComplete='email'
                  value={this.state.email}
                  onChange={this.handleOnChange}
                  placeholder="enter email address" />
                {(path === 'profile') ? <p id='change-password'>change password</p> : null}
          <input  name='password'
                  type="password"
                  className="login-input"
                  autoComplete='off'
                  onChange={this.handleOnChange}
                  value={this.state.password}
                  placeholder="enter password" />
          <input  name='passwordConfirmation'
                  type="password"
                  className="login-input"
                  autoComplete='off'
                  value={this.state.passwordConfirmation}
                  onChange={this.handleOnChange}
                  placeholder="confirm password" />
                <p style={{color: 'red', margin: 0}}>{(this.state.showError) ? this.state.error : null}</p>
          <input  className="form-submit" type="submit" value={(path === 'profile') ? 'update' : "sign up"} />
        </form>
      </div>
    )
  }
}

export default connect((state) => ({currentUser: state.users.currentUser}), { signUp, updateProfile })(withRouter(ProfileForm))
