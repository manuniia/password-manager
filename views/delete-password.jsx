const React = require("react");
const Layout = require("./components/Layout");
const InputField = require("./components/InputField");
const CsrfTokenField = require("./components/CsrfTokenField");

function DeletePassword({
  user,
  id,
  csrfToken,
  masterPassword,
  validationErrors = {},
}) {
  return (
    <Layout user={user}>
      <h3>Delete password</h3>
      <p>
        You are going to delete selected password. Please enter the master
        password if you want to proceed.
      </p>

      <form action={`/passwords/${id}/delete`} method="post">
        <CsrfTokenField csrfToken={csrfToken} />

        <InputField
          name="masterPassword"
          label="Master password"
          error={validationErrors.masterPassword}
          defaultValue={masterPassword}
          type="password"
        />

        <input type="hidden" name="id" value={id} />

        <button type="submit">Confirm</button>
      </form>
    </Layout>
  );
}

module.exports = DeletePassword;
