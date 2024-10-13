class UserModel {
  constructor(db) {
    this.db = db;
  }

  findAll = async () => {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT rowid AS id, login, password FROM users",
        [],
        (err, rows) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(rows);
        }
      );
    });
  };
}

exports = { UserModel };
