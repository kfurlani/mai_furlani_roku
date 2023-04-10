const creds = {
    // create a bunch (pool) of potential connections for multiple users
connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'root', //root for man, blank for windows
  database        : 'users',
  port            : 3306 //8889 for older macs
}

module.exports = creds;