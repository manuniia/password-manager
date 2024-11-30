var React = require("react");
var Layout = require("./components/Layout");

function NotFound({ user }) {
  return (
    <Layout user={user}>
      <h1>500</h1>
      <h2>
        Woops! <br />
        Something went wrong :(
      </h2>
      <p>Have you tried turning it off and on again?</p>
      <a href="/" className="button">
        Go Back Home
      </a>
    </Layout>
  );
}

module.exports = NotFound;
