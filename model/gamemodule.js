var mysql = require('mysql');

function GameModule(router, connection) {
    var self = this;
    self.routes(router, connection);
}

GameModule.prototype.routes = function(router, connection) {
    router.get('/module', function(request, response) {
        var query = 'SELECT * FROM module';

        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.get('/module/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'SELECT * FROM module WHERE id = ?';
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

    router.post('/module', function(request, response) {
        var nme = request.body.name;
        var dsc = request.body.description;

        var query = 'INSERT INTO module(name,description) VALUES (?,?)';
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

    router.put('/module/:id/name', function(request, response) {
        var uid = request.params.id;
        var nme = request.body.name;

        var query = 'UPDATE module SET name = ? WHERE id = ?';
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

    router.put('/module/:id/description', function(request, response) {
        var uid = request.params.id;
        var dsc = request.body.description;

        var query = 'UPDATE module SET description = ? WHERE id = ?';
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

    router.delete('/module/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'DELETE from module WHERE id = ?';
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

module.exports = GameModule;