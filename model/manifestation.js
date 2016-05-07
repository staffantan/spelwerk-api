var mysql = require('mysql');

function Manifestation(router, connection) {
    var self = this;
    self.routes(router, connection);
}

Manifestation.prototype.routes = function(router, connection) {
    router.get('/manifestation', function(request, response) {
        var query = 'SELECT * FROM manifestation';

        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.get('/manifestation/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'SELECT * FROM manifestation WHERE id = ?';
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

    router.post('/manifestation', function(request, response) {
        var nme = request.body.name;
        var dsc = request.body.description;

        var query = 'INSERT INTO manifestation(name,description) VALUES (?,?)';
        var table = [nme,dsc];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {name: nme, description: dsc}});
            }
        });
    });

    router.put('/manifestation/:id/name', function(request, response) {
        var uid = request.params.id;
        var nme = request.body.name;

        var query = 'UPDATE manifestation SET name = ? WHERE id = ?';
        var table = [nme,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {name: nme}});
            }
        });
    });

    router.put('/manifestation/:id/description', function(request, response) {
        var uid = request.params.id;
        var dsc = request.body.description;

        var query = 'UPDATE manifestation SET description = ? WHERE id = ?';
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

    router.delete('/manifestation/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'DELETE from manifestation WHERE id = ?';
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

module.exports = Manifestation;