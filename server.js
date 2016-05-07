var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var model = require("./model/index");
var config = require("./config");

var app = express();

function apiserver() {
    var self = this;
    self.connect();
}

apiserver.prototype.connect = function() {
    var self = this;
    var pool = mysql.createPool({
        connectionLimit : 100,
        host : config.db_host,
        user : config.db_user,
        password : config.db_password,
        database : config.db_database,
        debug : false
    });

    pool.getConnection(function(error, connection) {
        if(error) {
            self.stop(error);
        } else {
            self.configure(connection);
        }
    });
}

apiserver.prototype.configure = function(connection) {
    var self = this;
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var router = express.Router();

    app.use('/', router);
    var user = new model.user(router, connection);
    var character = new model.character(router, connection);
    var socialstatus = new model.socialstatus(router, connection);

    self.setup();
}

apiserver.prototype.setup = function() {
    app.listen(3000, function() {
        console.log('server alive at port 3000.');
    });
}

apiserver.prototype.stop = function(error) {
    console.log('error found:' + error);
    process.exit(1);
}

new apiserver();