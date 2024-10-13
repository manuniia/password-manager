var React = require("react");

function HelloMessage(props) {
  return (
    <div>
      <div>Hello {props.name}</div>;
    </div>
  );
}

module.exports = HelloMessage;
