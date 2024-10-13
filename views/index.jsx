var React = require("react");
var Layout = require("./components/Layout");

function HelloMessage({ name, users }) {
  return (
    <Layout>
      <ul>
        {users.map((user) => (
          <li key={user.login}>
            login:{user.login} hash:{user.hash}
          </li>
        ))}
      </ul>
    </Layout>
  );
}

module.exports = HelloMessage;
