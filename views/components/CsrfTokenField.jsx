var React = require("react");

function CsrfTokenField({ csrfToken }) {
  return <input name="_csrf" value={csrfToken} type="hidden" />;
}

module.exports = CsrfTokenField;
