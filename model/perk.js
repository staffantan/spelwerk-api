var mysql = require('mysql');

function Perk(router, connection) {
    var self = this;
    self.routes(router, connection);
}

Perk.prototype.routes = function(router, connection) {
    router.get('/perk', function(request, response) {
        var query = 'SELECT perk.*, perk_type.name AS typename FROM perk ' +
            'LEFT JOIN perk_type ON perk.typeid=perk_type.id';

        connection.query(query, function(error, rows) {
            if(error) {
                console.log(error);
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.get('/perk/:id', function(request, response) {
        var query = 'SELECT perk.*, perk_type.name AS typename FROM perk ' +
            'LEFT JOIN perk_type ON perk.typeid=perk_type.id ' +
            'WHERE perk.id = ?';

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

    router.post('/perk', function(request, response) {
        var query = 'INSERT INTO perk(typeid,name,description,maximum,special,skill,synergy,give_attribute,req_perk,req_species) VALUES (?,?,?,?,?,?,?,?,?,?)';
        var table = [
            request.body.perktype,
            request.body.name,
            request.body.description,
            request.body.maximum,
            request.body.special,
            request.body.skill,
            request.body.synergy,
            request.body.give_attribute,
            request.body.req_perk,
            request.body.req_species
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

    router.put('/perk/:id/name', function(request, response) {
        var query = 'UPDATE perk SET name = ? WHERE id = ?';
        var table = [request.body.name,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/perk/:id/description', function(request, response) {
        var query = 'UPDATE perk SET description = ? WHERE id = ?';
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

    router.put('/perk/:id/maximum', function(request, response) {
        var query = 'UPDATE perk SET maximum = ? WHERE id = ?';
        var table = [request.body.maximum,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/perk/:id/special', function(request, response) {
        var query = 'UPDATE perk SET special = ? WHERE id = ?';
        var table = [request.body.special,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/perk/:id/skill', function(request, response) {
        var query = 'UPDATE perk SET skill = ? WHERE id = ?';
        var table = [request.body.skill,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/perk/:id/synergy', function(request, response) {
        var query = 'UPDATE perk SET synergy = ? WHERE id = ?';
        var table = [request.body.synergy,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/perk/:id/giveattribute', function(request, response) {
        var query = 'UPDATE perk SET give_attribute = ? WHERE id = ?';
        var table = [request.body.givesattribute,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/perk/:id/reqperk', function(request, response) {
        var query = 'UPDATE perk SET req_perk = ? WHERE id = ?';
        var table = [request.body.requiresperk,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/perk/:id/reqspecies', function(request, response) {
        var query = 'UPDATE perk SET req_species = ? WHERE id = ?';
        var table = [request.body.requiresspecies,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.delete('/perk/:id', function(request, response) {
        var query = 'DELETE from perk WHERE id = ?';
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

      /** ********* **/
     /** PERK TYPE **/
    /** ********* **/

    router.get('/perktype', function(request, response) {
        var query = 'SELECT * FROM perk_type';
        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.get('/perktype/:id', function(request, response) {
        var query = 'SELECT * FROM perk_type WHERE id = ?';
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

    router.post('/perktype', function(request, response) {
        var query = 'INSERT INTO perk_type(name) VALUES (?)';
        var table = [request.body.name];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/perktype/:id/name', function(request, response) {
        var query = 'UPDATE perk_type SET name = ? WHERE id = ?';
        var table = [request.body.name,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.delete('/perktype/:id', function(request, response) {
        var query = 'DELETE from perk_type WHERE id = ?';
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

module.exports = Perk;