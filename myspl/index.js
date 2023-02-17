//加载mysql模块
var mysql = require('mysql2');
//创建连接
var connection = mysql.createConnection({
    host: 'xc27.top',
    user: 'root',
    password: '1710885741PCL..',
    database: 'lao_li'
});
//执行创建连接 
connection.connect();

module.exports = connection;