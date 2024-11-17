const React = require("react");
const Layout = require("./components/Layout");

function DashBoard({ user, rows = [] }) {
  return (
    <Layout user={user}>
      <h3>Dashboard</h3>

      <table>
        <thead>
          <tr>
            <th scope="col">Login URL</th>
            <th scope="col">login</th>
            <th scope="col">Password</th>
            <th scope="col">
              <button>Add</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || index}>
              <td>{row.loginUrl}</td>
              <td>{row.login}</td>
              <td>{row.password || "*****************"}</td>
              <td>
                <button style={{ width: "100%" }}>Show</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </Layout>
  );
}

module.exports = DashBoard;
