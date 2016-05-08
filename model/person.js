var mysql = require('mysql');

function Person(router, connection) {
    var self = this;
    self.routes(router, connection);
}

Person.prototype.routes = function(router, connection) {
    router.get('/person', function(request, response) {
        var query = 'SELECT person.*, module.name AS module, species.name AS species FROM person ' +
            'LEFT JOIN module ON person.in_module=module.id ' +
            'LEFT JOIN species ON person.is_species=species.id';

        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.get('/person/:id', function(request, response) {
        var query = 'SELECT person.*, module.name AS module, species.name AS species FROM person ' +
            'LEFT JOIN module ON person.in_module=module.id ' +
            'LEFT JOIN species ON person.is_species=species.id ' +
            'WHERE person.id=?';

        var table = [request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            }
            if(rows[0] == null) {
                response.status(404).send({error: true, message: 'id not found.'});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.post('/person', function(request, response) {
        var query = 'INSERT INTO person(firstname,lastname,nickname,gender,occupation,description,in_module,is_species) VALUES (?,?,?,?,?,?,?,?)';
        var table = [
            request.body.firstname,
            request.body.lastname,
            request.body.nickname,
            request.body.gender,
            request.body.occupation,
            request.body.description,
            request.body.module,
            request.body.species
        ];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/person/:id/firstname', function(request, response) {
        var query = 'UPDATE person SET firstname = ? WHERE id = ?';
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

    router.put('/person/:id/lastname', function(request, response) {
        var query = 'UPDATE person SET lastname = ? WHERE id = ?';
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

    router.put('/person/:id/nickname', function(request, response) {
        var query = 'UPDATE person SET nickname = ? WHERE id = ?';
        var table = [request.body.nickname,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/person/:id/gender', function(request, response) {
        var query = 'UPDATE person SET gender = ? WHERE id = ?';
        var table = [request.body.gender,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/person/:id/occupation', function(request, response) {
        var query = 'UPDATE person SET occupation = ? WHERE id = ?';
        var table = [request.body.occupation,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/person/:id/description', function(request, response) {
        var query = 'UPDATE person SET description = ? WHERE id = ?';
        var table = [request.body.description,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.delete('/person/:id', function(request, response) {
        var query = 'DELETE from person WHERE id = ?';
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

module.exports = Person;