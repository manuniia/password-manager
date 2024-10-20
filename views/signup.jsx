const React = require("react");
const Layout = require("./components/Layout");
const InputField = require("./components/InputField");

function SignUp({
  validationErrors = {},
  login = "",
  password = "",
  confirm_password = "",
}) {
  return (
    <Layout>
      <h1>Password Manger</h1>
      <h3>Sign Up</h3>

      <form action="/signup" method="post">
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
          name="confirm_password"
          label="Confirm password"
          error={validationErrors.confirm_password}
          defaultValue={confirm_password}
          type="password"
        />

        <button type="submit">Sign Up</button>
      </form>
    </Layout>
  );
}

module.exports = SignUp;
