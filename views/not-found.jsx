var React = require("react");
var Layout = require("./components/Layout");

function NotFound({ user }) {
  return (
    <Layout user={user}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/" className="button">
        Go Back Home
      </a>
    </Layout>
  );
}

module.exports = NotFound;
