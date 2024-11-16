var React = require("react");

const DEFAULT_TITLE = "Password Manager";

function Layout({
  title = DEFAULT_TITLE,
  children,
  user = { isLoggedIn: false, login: "" },
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        ></link>
        <title>{title}</title>
      </head>
      <body className="container">
        <header>
          <nav>
            <ul>
              <li>
                <a className="secondary" href="/">
                  <strong>Password Manager</strong>
                </a>
              </li>
            </ul>
            {user.isLoggedIn ? (
              <ul>
                <li>
                  <a href="/dashboard">Dashboard</a>
                </li>

                <li>
                  <details className="dropdown">
                    <summary>{user.login}</summary>
                    <ul dir="rtl">
                      <li>
                        <a href="/logout">Log out</a>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <a href="/login">Log in</a>
                </li>
              </ul>
            )}
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}

module.exports = Layout;
