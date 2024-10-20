const React = require("react");
const Layout = require("./components/Layout");

function DashBoard({ user }) {
  return (
    <Layout user={user}>
      <h1>Password Manger</h1>
      <h3>Dashboard</h3>
    </Layout>
  );
}

module.exports = DashBoard;
