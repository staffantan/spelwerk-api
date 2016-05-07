var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var model = require("./model/index");
var config = require("./config");

var app = express();

function APIServer() {
    var self = this;
    self.connect();
}

APIServer.prototype.connect = function() {
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
};

APIServer.prototype.configure = function(connection) {
    var self = this;
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var router = express.Router();

    app.use('/', router);
    var Character = new model.Character(router, connection);
    var Doctrine = new model.Doctrine(router, connection);
    var GameModule = new model.GameModule(router, connection);
    var Manifestation = new model.Manifestation(router, connection);
    var Skill = new model.Skill(router, connection);
    var SocialStatus = new model.SocialStatus(router, connection);
    var Species = new model.Species(router, connection);
    var User = new model.User(router, connection);

    self.setup();
};

APIServer.prototype.setup = function() {
    app.listen(3000, function() {
        console.log('server alive at port 3000.');
    });
};

APIServer.prototype.stop = function(error) {
    console.log('error found:' + error);
    process.exit(1);
};

new APIServer();