import React from 'react'
import { connect } from 'react-redux'
import { signUp, updateProfile } from '../actions/userActions'
import { withRouter, Link } from 'react-router-dom'

class ProfileForm extends React.Component {
  constructor (props) {
    super();
    this.state = {
      first_name: (props.isLoggedIn) ? props.currentUser.first_name : '',
      last_name: (props.isLoggedIn) ? props.currentUser.last_name : '',
      city: (props.isLoggedIn) ? props.currentUser.city : '',
      state: (props.isLoggedIn) ? props.currentUser.state : '',
      email: (props.isLoggedIn) ? props.currentUser.email : '',
      password: '',
      passwordConfirmation: '',
      showError: false,
      error: [],
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
    console.log("profile form state:", this.state)
    console.log("profile form props:", this.props)
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
                  placeholder="enter first name" required='true' autoFocus/>
                <input  name='last_name'
                  type="text"
                  className="login-input"
                  autoComplete='family-name'
                  value={this.state.last_name}
                  onChange={this.handleOnChange}
                  placeholder="enter last name" required/>
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
                  placeholder="enter email address" required/>
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    isLoggedIn: state.users.isLoggedIn,
  }
}
export default connect(mapStateToProps, { signUp, updateProfile })(withRouter(ProfileForm))
