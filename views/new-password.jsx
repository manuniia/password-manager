const React = require("react");
const Layout = require("./components/Layout");
const InputField = require("./components/InputField");
const CsrfTokenField = require("./components/CsrfTokenField");

function NewPassword({
  user,
  csrfToken,
  loginUrl,
  login,
  password,
  masterPassword,
  validationErrors = {},
}) {
  return (
    <Layout user={user}>
      <h3>Add password</h3>

      <form action="/passwords" method="post">
        <CsrfTokenField csrfToken={csrfToken} />

        <InputField
          name="loginUrl"
          label="Login URL"
          error={validationErrors.loginUrl}
          defaultValue={loginUrl}
        />

        <InputField
          name="login"
          label="Login"
          error={validationErrors.login}
          defaultValue={login}
        />

        <InputField
          name="password"
          label="Password"
          error={validationErrors.password}
          defaultValue={password}
          type="password"
        />

        <InputField
          name="masterPassword"
          label="Master password"
          error={validationErrors.masterPassword}
          defaultValue={masterPassword}
          type="masterPassword"
        />

        <button type="submit">Save</button>
      </form>
    </Layout>
  );
}

module.exports = NewPassword;
