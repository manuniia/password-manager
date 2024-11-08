var React = require("react");
var Layout = require("./components/Layout");

function Home({ user }) {
  return (
    <Layout user={user}>
      {
        <body>
          <nav>
          <ul>
            <li><strong>Password manager</strong></li>
          </ul>
          <ul>
            <li><a href="/dashboard" class="secondary">Dashboard</a></li>
            <li>
              <details class="dropdown">
              {isLoggedIn ? <summary>
                  Account
                </summary> : <a href="/login">Login</a>}

                {isLoggedIn ? 
                  <ul dir="rtl">
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Logout</a></li>
                  </ul> :  <a href="/login">Login</a>}
              </details>
            </li>
          </ul>
          </nav>
          <hgroup>
              <h2>Password Manager</h2>
              <p>A Secure Password Manager is an essential tool for protecting your digital identity, ensuring that all your sensitive login credentials are encrypted and safely stored. Our password manager is built with security at its core, using bcrypt, a trusted and robust hashing algorithm designed to protect passwords from unauthorized access.</p>
              <hr />
              <p>With bcrypt, every password you store is hashed using a unique salt, making it extremely difficult for attackers to reverse-engineer the original password even if they gain access to the database. Bcrypt also automatically adapts over time, allowing for stronger security as hardware processing power increases, without needing major updates to the system.</p>
              <hr />
              <p>Our password manager ensures that your data remains safe with industry-standard encryption, giving you peace of mind whether you’re managing personal accounts, business logins, or financial credentials.</p>
          </hgroup>
        </body>
        
      }
    </Layout>
  );
}

module.exports = Home;
