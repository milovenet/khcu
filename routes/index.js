var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'userid',
    database: 'dbname',
    password: 'dbpassword'
});


/* GET home page. */
router.get('/', function (req, res, next) {

    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query('SELECT * FROM board', function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));

            res.render('index', {title: 'Khcu HTML5&CSS3 기말과제', rows: rows});
            connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
    });
});



module.exports = router;
