var React = require("react");

const DEFAULT_TITLE = "Password Manager";

function Layout({
  title = DEFAULT_TITLE,
  children,
  user = { isLoggedIn: false, login: "" },
}) {
  // TODO add logic displaying appropriate buttons and login/username depending if the user is logged in ornot
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
                <strong>Password Manager</strong>
              </li>
            </ul>
            <ul>
              <li>
                {isLoggedIn ? (
                  <a href="/logout">Log Out</a>
                ) : (
                  <a href="/logout">Log Out</a>
                )}
              </li>
            </ul>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}

module.exports = Layout;
