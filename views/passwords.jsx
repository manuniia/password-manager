const React = require("react");
const Layout = require("./components/Layout");

function Passwords({ user, rows = [], hideAddButton = false }) {
  return (
    <Layout user={user}>
      <table>
        <thead>
          <tr>
            <th scope="col">Login URL</th>
            <th scope="col">Login</th>
            <th scope="col" style={{ width: "13rem" }}>
              Password
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || index}>
              <td>
                <a href={row.loginUrl} target="_blank">
                  {row.loginUrl}
                </a>
              </td>
              <td>{row.login}</td>
              <td>
                {row.password || (
                  <div className="grid">
                    <a href={`/passwords/${row.id}`} role="button">
                      Show
                    </a>
                    <a
                      href={`/passwords/${row.id}/delete`}
                      role="button"
                      className="secondary"
                    >
                      Delete
                    </a>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              {hideAddButton ? null : (
                <a
                  href="/passwords/new"
                  role="button"
                  style={{ width: "100%" }}
                >
                  Add
                </a>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </Layout>
  );
}

module.exports = Passwords;
