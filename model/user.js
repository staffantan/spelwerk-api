var mysql = require('mysql');
var credential = require('credential');
var pw = credential();

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
        var query = 'SELECT email, firstname, lastname FROM user WHERE id = ?';
        var table = [request.params.id];
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
        pw.hash(request.body.password, function(error, hash) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing password hash.', details: error});
            } else {
                var query = 'INSERT INTO user(email,password,firstname,lastname) VALUES (?,?,?,?)';
                var table = [
                    request.body.email,
                    hash,
                    request.body.firstname,
                    request.body.lastname
                ];
                query = mysql.format(query, table);
                connection.query(query, function(error) {
                    if (error) {
                        response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
                    } else {
                        response.status(201).send({error: false, message: 'success.'});
                    }
                });
            }
        });
    });

    router.put('/user/:id/firstname', function(request, response) {
        var query = 'UPDATE user SET firstname = ? WHERE id = ?';
        var table = [request.body.firstname,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/user/:id/lastname', function(request, response) {
        var query = 'UPDATE user SET lastname = ? WHERE id = ?';
        var table = [request.body.lastname,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/user/:id/email', function(request, response) {
        var query = 'UPDATE user SET email = ? WHERE id = ?';
        var table = [request.body.email,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/user/:id/password', function(request, response) {
        pw.hash(request.body.password, function(error, hash) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing password hash.', details: error});
            } else {
                var query = 'UPDATE user SET password = ? WHERE id = ?';
                var table = [hash,request.params.id];
                query = mysql.format(query, table);
                connection.query(query, function(error) {
                    if (error) {
                        response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
                    } else {
                        response.status(201).send({error: false, message: 'success.'});
                    }
                });
            }
        });
    });

    router.delete('/user/:id', function(request, response) {
        var query = 'DELETE from user WHERE id = ?';
        var table = [request.params.id];
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