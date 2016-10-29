import React from 'react'

class Signup extends React.Component {
  render() {
    return (
      <div className="bloc login-form">
        <form>
          <table>
            <tr>
              <td><label for="email">E-mail</label></td>
              <td><input type="email" id="email" /></td>
            </tr>

            <tr>
              <td><label for="last_name">Last name</label></td>
              <td><input type="test" id="last_name" /></td>
            </tr>

            <tr>
              <td><label for="first_name">First name</label></td>
              <td><input type="text" id="first_name" /></td>
            </tr>

            <tr>
              <td><label for="password">Password:</label></td>
              <td><input type="password" id="password" /></td>
            </tr>

            <tr>
              <td></td>
              <td><button>Sign-up</button></td>
            </tr>
          </table>
        </form>
      </div>
    )
  }
}

export default Signup
