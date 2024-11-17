const React = require("react");
const Layout = require("./components/Layout");
const InputField = require("./components/InputField");
const CsrfTokenField = require("./components/CsrfTokenField");

function ShowPassword({
  user,
  id,
  csrfToken,
  masterPassword,
  validationErrors = {},
}) {
  return (
    <Layout user={user}>
      <h3>Show password</h3>

      <form action={`/passwords/${id}`} method="post">
        <CsrfTokenField csrfToken={csrfToken} />

        <InputField
          name="masterPassword"
          label="Please enter the master password"
          error={validationErrors.masterPassword}
          defaultValue={masterPassword}
          type="password"
        />

        <input type="hidden" name="id" value={id} />

        <button type="submit">Show</button>
      </form>
    </Layout>
  );
}

module.exports = ShowPassword;
