import {Component} from 'react'
import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    credentialsList: [],
    website: '',
    username: '',
    password: '',
    showPassword: false,
  }

  deleteCredentialItem = id => {
    const {credentialsList} = this.state

    const filteredCredentialsList = credentialsList.filter(
      item => item.id !== id,
    )

    this.setState({
      credentialsList: filteredCredentialsList,
    })
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newCredential = {
      id: v4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      credentialsList: [...prevState.credentialsList, newCredential],
      website: '',
      username: '',
      password: '',
      search: '',
    }))
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  getFilteredCategoriesList = () => {
    const {credentialsList, search} = this.state
    return credentialsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(search.toLowerCase()),
    )
  }

  getPasswordContainer = filteredCategoriesList => {
    const {showPassword} = this.state
    if (filteredCategoriesList.length !== 0) {
      return (
        <ul className="credentials-container">
          {filteredCategoriesList.map(eachCredential => (
            <PasswordItem
              key={eachCredential.id}
              credentialDetails={eachCredential}
              deleteItem={this.deleteCredentialItem}
              showPassword={showPassword}
            />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-password-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          className="no-password-img"
          alt="no passwords"
        />
        <p className="no-password-heading"> No Passwords</p>
      </div>
    )
  }

  render() {
    const {website, username, password, search, showPassword} = this.state
    const filteredCategoriesList = this.getFilteredCategoriesList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
          <div className="form-image-container">
            <form className="form" onSubmit={this.onAddPassword}>
              <h1 className="add-password-heading">Add New Password</h1>
              <div className="input-label-container">
                <label htmlFor="website" className="label">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="img"
                  />
                </label>

                <input
                  type="text"
                  className="input"
                  id="website"
                  value={website}
                  onChange={this.onChangeWebsite}
                  placeholder="Enter Website"
                />
              </div>
              <div className="input-label-container">
                <label htmlFor="username" className="label">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="img"
                  />
                </label>

                <input
                  type="text"
                  className="input"
                  id="username"
                  value={username}
                  onChange={this.onChangeUsername}
                  placeholder="Enter Username"
                />
              </div>
              <div className="input-label-container">
                <label htmlFor="password" className="label">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="img"
                  />
                </label>

                <input
                  type="password"
                  className="input"
                  id="password"
                  value={password}
                  onChange={this.onChangePassword}
                  placeholder="Enter Password"
                />
              </div>
              <button type="submit" className="submit-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="form-img"
            />
          </div>
          <div className="your-passwords-container">
            <div className="heading-and-search-container">
              <div>
                <h1 className="add-password-heading">
                  Your Passwords
                  <span className="number-of-items">
                    {filteredCategoriesList.length}
                  </span>
                </h1>
              </div>
              <div className="input-label-container">
                <label htmlFor="search" className="label">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="img"
                  />
                </label>
                <input
                  type="search"
                  className="input"
                  id="search"
                  value={search}
                  onChange={this.onChangeSearch}
                  placeholder="Search"
                />
              </div>
            </div>
            <hr />
            <div className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                id="showPassword"
                onChange={this.onClickShowPassword}
                checked={showPassword}
              />
              <label htmlFor="showPassword" className="checkbox-label">
                Show Passwords
              </label>
            </div>
            {this.getPasswordContainer(filteredCategoriesList)}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
