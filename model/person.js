var mysql = require('mysql');

function Person(router, connection) {
    var self = this;
    self.routes(router, connection);
}

Person.prototype.routes = function(router, connection) {
    router.get('/person', function(request, response) {
        var query = 'SELECT person.id AS id, person.firstname, person.lastname, person.nickname, person.gender, person.occupation, person.description AS description, person.finance, module.name AS module, species.name AS species FROM person LEFT JOIN module ON person.in_module=module.id LEFT JOIN species ON person.is_species=species.id';

        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.get('/person/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'SELECT person.id AS id, person.firstname, person.lastname, person.nickname, person.gender, person.occupation, person.description AS description, person.finance, module.name AS module, species.name AS species FROM person LEFT JOIN module ON person.in_module=module.id LEFT JOIN species ON person.is_species=species.id WHERE person.id=?';
        var table = [uid];
        query = mysql.format(query, table);

        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.post('/person', function(request, response) {
        var fnm = request.body.firstname;
        var lnm = request.body.lastname;
        var nnm = request.body.nickname;
        var gnd = request.body.gender;
        var ocu = request.body.occupation;
        var dsc = request.body.description;
        var fin = request.body.finance;
        var mdl = request.body.module;
        var spc = request.body.species;

        var query = 'INSERT INTO person(firstname,lastname,nickname,gender,occupation,description,finance,in_module,is_species) VALUES (?,?,?,?,?,?,?,?,?)';
        var table = [fnm,lnm,nnm,gnd,ocu,dsc,fin,mdl,spc];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {firstname: fnm, lastname: lnm, nickname: nnm, gender: gnd, occupation: ocu, description: dsc, finance: fin, module: mdl, species: spc}});
            }
        });
    });

    router.put('/person/:id/names', function(request, response) {
        var uid = request.params.id;
        var fnm = request.body.firstname;
        var lnm = request.body.lastname;
        var nnm = request.body.nickname;

        var query = 'UPDATE person SET firstname = ?, lastname = ?, nickname = ? WHERE id = ?';
        var table = [fnm,lnm,nnm,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {firstname: fnm, lastname: lnm, nickname: nnm}});
            }
        });
    });

    router.put('/person/:id/description', function(request, response) {
        var uid = request.params.id;
        var dsc = request.body.description;

        var query = 'UPDATE person SET description = ? WHERE id = ?';
        var table = [dsc,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {description: dsc}});
            }
        });
    });

    router.put('/person/:id/occupation', function(request, response) {
        var uid = request.params.id;
        var ocu = request.body.occupation;

        var query = 'UPDATE person SET occupation = ? WHERE id = ?';
        var table = [ocu,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {occupation: ocu}});
            }
        });
    });

    router.put('/person/:id/finance', function(request, response) {
        var uid = request.params.id;
        var fin = request.body.finance;

        var query = 'UPDATE person SET finance = ? WHERE id = ?';
        var table = [fin,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {finance: fin}});
            }
        });
    });

    router.delete('/person/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'DELETE from person WHERE id = ?';
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

module.exports = Person;