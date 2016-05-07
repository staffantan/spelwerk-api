var mysql = require('mysql');
var credential = require('credential');

function User(router, connection) {
    var self = this;
    self.routes(router, connection);
}

User.prototype.routes = function(router, connection) {
    router.get('/user', function (request, response) {
        var query = 'SELECT id, email, firstname, lastname FROM user';

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

        var query = 'SELECT email, firstname, lastname FROM user WHERE id = ?';
        var table = [uid];
        query = mysql.format(query, table);

        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: {email: rows[0].email, firstname: rows[0].firstname, lastname: rows[0].lastname}})
            }
        });
    });

    router.post('/user', function(request, response) {
        var usr = request.body.email;
        var psw = request.body.password;
        var fnm = request.body.firstname;
        var lnm = request.body.lastname;

        var query = 'INSERT INTO user(email,password,firstname,lastname) VALUES (?,?,?,?)';
        var table = [usr,psw,fnm,lnm];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {username: usr, firstname: fnm, lastname: lnm}});
            }
        });
    });

    router.put('/user/:id/names', function(request, response) {
        var uid = request.params.id;
        var fnm = request.body.firstname;
        var lnm = request.body.lastname;

        var query = 'UPDATE user SET firstname = ?, lastname = ? WHERE id = ?';
        var table = [fnm,lnm,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {firstname: fnm, lastname: lnm}});
            }
        });
    });

    router.put('/user/:id/email', function(request, response) {
        var uid = request.params.id;
        var usr = request.body.email;

        var query = 'UPDATE user SET email = ? WHERE id = ?';
        var table = [usr,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {email: usr}});
            }
        });
    });

    router.put('/user/:id/password', function(request, response) {
        var uid = request.params.id;
        var psw = request.body.password;

        var query = 'UPDATE user SET password = ? WHERE id = ?';
        var table = [psw,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.delete('/user/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'DELETE from user WHERE id = ?';
        var table = [uid];
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