var React = require("react");
var Layout = require("./components/Layout");

function Home({ user }) {
  return (
    <Layout user={user}>
      {/* TODO add some home page content telling about the app */}
    </Layout>
  );
}

module.exports = Home;
