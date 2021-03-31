const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'momo',
    password: '123',
    database: 'wedonate'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

const getDonation = (callback) => {
    connection.query('SELECT * FROM wedonate', function (error, results) {
        // If some error occurs, we throw an error.
        if (error) {
            callback(err, null)
        } else {
            callback(null, results)
        }
        // Getting the 'response' from the database and sending it to our route. This is were the data is.

    });
}

module.exports = getDonation