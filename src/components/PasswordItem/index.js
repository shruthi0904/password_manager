import './index.css'

const PasswordItem = props => {
  const {credentialDetails, deleteItem, showPassword} = props
  const {id, website, username, password} = credentialDetails

  const onClickDelete = () => {
    deleteItem(id)
  }

  // const newPassword = showPassword ? '*'.repeat(password.length) : password

  return (
    <li className="credentials-item-container">
      <div className="initial-container">
        {website.slice(0, 1).toUpperCase()}
      </div>
      <div>
        <p className="data">{website}</p>
        <p className="data">{username}</p>
        {showPassword ? (
          <p className="data">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="icon1"
          />
        )}
      </div>
      <button type="button" className="delete-btn" onClick={onClickDelete}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="icon"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
