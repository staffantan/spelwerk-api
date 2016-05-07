var mysql = require('mysql');

function Species(router, connection) {
    var self = this;
    self.routes(router, connection);
}

Species.prototype.routes = function(router, connection) {
    router.get('/species', function(request, response) {
        var query = 'SELECT * FROM species';
        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.get('/species/:id', function(request, response) {
        var query = 'SELECT * FROM species WHERE id = ?';
        var table = [request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.post('/species', function(request, response) {
        var query = 'INSERT INTO species(name,description,speed,damage,initiative,tolerance,resilience,stamina,potential) VALUES (?,?,?,?,?,?,?,?,?)';
        var table = [request.body.name,request.body.description];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {name: nme, description: dsc, speed: spd, damage: dmg, initiative: ini, tolerance: tol, resilience: res, stamina: sta, potential: pot}});
            }
        });
    });

    router.put('/species/:id/name', function(request, response) {
        var query = 'UPDATE species SET name = ? WHERE id = ?';
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

    router.put('/species/:id/description', function(request, response) {
        var query = 'UPDATE species SET description = ? WHERE id = ?';
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

    router.delete('/species/:id', function(request, response) {
        var query = 'DELETE from species WHERE id = ?';
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

module.exports = Species;