var mysql = require('mysql');

function Character(router, connection) {
    var self = this;
    self.routes(router, connection);
}

Character.prototype.routes = function(router, connection) {
    router.get('/character', function(request, response) {
        var query = 'SELECT avatar.*, ' +
            'person.firstname, person.lastname, person.nickname, person.gender, person.occupation, person.description, person.finance, ' +
            'manifestation.name AS manifestation, socialstatus.name AS socialstatus, module.name AS module, species.name AS species ' +
            'FROM avatar ' +
            'LEFT JOIN person ON avatar.id=person.id ' +
            'LEFT JOIN manifestation ON has_manifestation=manifestation.id ' +
            'LEFT JOIN socialstatus ON is_socialstatus=socialstatus.id ' +
            'LEFT JOIN module ON person.in_module=module.id ' +
            'LEFT JOIN species ON person.is_species=species.id';

        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows});
                //TODO: We should sort the response better in result.
            }
        });
    });

    router.get('/character/:id', function(request, response) {
        var query = 'SELECT avatar.*, ' +
            'person.firstname, person.lastname, person.nickname, person.gender, person.occupation, person.description, person.finance, ' +
            'manifestation.name AS manifestation, socialstatus.name AS socialstatus, module.name AS module, species.name AS species ' +
            'FROM avatar ' +
            'LEFT JOIN person ON avatar.id=person.id ' +
            'LEFT JOIN manifestation ON has_manifestation=manifestation.id ' +
            'LEFT JOIN socialstatus ON is_socialstatus=socialstatus.id ' +
            'LEFT JOIN module ON person.in_module=module.id ' +
            'LEFT JOIN species ON person.is_species=species.id ' +
            'WHERE avatar.id=?';

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

    router.post('/character', function(request, response) {
        var query = 'INSERT INTO avatar(id,age,nature,identity,has_manifestation,is_socialstatus) VALUES (?,?,?,?,?,?)';
        var table = [
            request.body.personid,
            request.body.age,
            request.body.nature,
            request.body.identity,
            request.body.manifestation,
            request.body.socialstatus
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

    router.put('/character/:id/age', function(request, response) {
        var query = 'UPDATE tbl_character SET age = ? WHERE id = ?';
        var table = [request.body.age,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/character/:id/nature', function(request, response) {
        var query = 'UPDATE avatar SET nature = ? WHERE id = ?';
        var table = [request.body.nature,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/character/:id/identity', function(request, response) {
        var query = 'UPDATE avatar SET identity = ? WHERE id = ?';
        var table = [request.body.identity,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/character/:id/manifestation', function(request, response) {
        var query = 'UPDATE avatar SET has_manifestation = ? WHERE id = ?';
        var table = [request.body.manifestation,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });



    router.put('/character/:id/socialstatus', function(request, response) {
        var query = 'UPDATE tbl_character SET is_socialstatus = ? WHERE id = ?';
        var table = [request.body.socialstatus,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.delete('/character/:id', function(request, response) {
        var query = 'DELETE from avatar WHERE id = ?';
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

    /** ****************** **/
    /** PERSON INHERITANCE **/
    /** ****************** **/

    router.put('/character/:id/firstname', function(request, response) {
        var query = 'UPDATE person SET firstname = ? WHERE id = ?';
        var table = [request.body.firstname,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {firstname: value}});
            }
        });
    });

    router.put('/character/:id/lastname', function(request, response) {
        var query = 'UPDATE person SET lastname = ? WHERE id = ?';
        var table = [request.body.lastname,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {lastname: value}});
            }
        });
    });

    router.put('/character/:id/nickname', function(request, response) {
        var query = 'UPDATE person SET nickname = ? WHERE id = ?';
        var table = [request.body.nickname,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {nickname: value}});
            }
        });
    });

    router.put('/character/:id/gender', function(request, response) {
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

    router.put('/character/:id/occupation', function(request, response) {
        var query = 'UPDATE person SET occupation = ? WHERE id = ?';
        var table = [request.body.occupation,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {occupation: ocu}});
            }
        });
    });

    router.put('/character/:id/description', function(request, response) {
        var query = 'UPDATE person SET description = ? WHERE id = ?';
        var table = [request.body.description,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {description: dsc}});
            }
        });
    });
};

module.exports = Character;