const mysql = require("mysql")

//Je n'utilise pas .env car projet openclassrooms mais .env existe également
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'groupomania'
});

db.connect()
module.exports = db