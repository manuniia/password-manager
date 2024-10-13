var React = require("react");

function HelloMessage({ name, users }) {
  return (
    <div>
      <div>Hello {name}</div>
      <ul>
        {users.map((user) => (
          <li key={user.login}>{user.login}</li>
        ))}
      </ul>
    </div>
  );
}

module.exports = HelloMessage;
