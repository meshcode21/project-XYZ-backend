import db from "../config/db.js";

export const getUserByEmail = (email)=>{
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?',[email], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}
