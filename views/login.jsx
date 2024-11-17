const React = require("react");
const Layout = require("./components/Layout");
const InputField = require("./components/InputField");
const CsrfTokenField = require("./components/CsrfTokenField");

function Login({ login, password, validationErrors = {}, csrfToken }) {
  return (
    <Layout>
      <h3>Log In</h3>

      <form action="/login" method="post">
        <CsrfTokenField csrfToken={csrfToken} />

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

        <button type="submit">Log In</button>
      </form>
    </Layout>
  );
}

module.exports = Login;
