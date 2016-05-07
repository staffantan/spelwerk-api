var mysql = require('mysql');
var credential = require('credential');

function User(router, connection) {
    var self = this;
    self.routes(router, connection);
}

User.prototype.routes = function(router, connection) {
    router.get('/user', function (request, response) {
        var query = 'SELECT ??,??,??,?? FROM ??';
        var table = ['id','email','firstname','lastname','user'];
        query = mysql.format(query, table);

        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.get('/user/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'SELECT ??,??,?? FROM ?? WHERE ?? = ?';
        var table = ['email','firstname','lastname','user','id',uid];
        query = mysql.format(query, table);

        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: {email: rows[0].email, firstname: rows[0].firstname, lastname: rows[0].lastname}})
            }
        });
    });

    router.post('/user', function (request, response) {
        var usr = request.body.email;
        var psw = request.body.password;
        var fnm = request.body.firstname;
        var lnm = request.body.lastname;

        var query = 'INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)';
        var table = ['user','email','password','firstname','lastname',usr,psw,fnm,lnm];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {username: usr, firstname: fnm, lastname: lnm}});
            }
        });
    });

    router.put('/user/:id/names', function (request, response) {
        var uid = request.params.id;
        var fnm = request.body.firstname;
        var lnm = request.body.lastname;

        var query = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?';
        var table = ['user','firstname',fnm,'lastname',lnm,'id',uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {firstname: fnm, lastname: lnm}});
            }
        });
    });

    router.put('/user/:id/email', function (request, response) {
        var uid = request.params.id;
        var usr = request.body.email;

        if (!usr) {
            response.status(403).send({error: true, message: 'not allowed to set email as null.'});
        }

        var query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
        var table = ['user','email',usr,'id',uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {email: usr}});
            }
        });
    });

    router.put('/user/:id/password', function (request, response) {
        var uid = request.params.id;
        var psw = request.body.password;

        if (!psw) {
            response.status(403).send({error: true, message: 'not allowed to set password as null.'});
        }

        var query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
        var table = ['user','password',psw,'id',uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.delete('/user/:id', function (request, response) {
        var uid = request.params.id;

        var query = 'DELETE from ?? WHERE ?? = ?';
        var table = ['user','id',uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });
};

module.exports = User;