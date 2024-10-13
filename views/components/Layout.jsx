var React = require("react");

const DEFAULT_TITLE = "Password Manager";

function Layout({ title = DEFAULT_TITLE, children }) {
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
      <body>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}

module.exports = Layout;
