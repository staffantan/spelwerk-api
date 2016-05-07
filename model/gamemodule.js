var mysql = require('mysql');

function GameModule(router, connection) {
    var self = this;
    self.routes(router, connection);
}

GameModule.prototype.routes = function(router, connection) {
    router.get('/module', function(request, response) {
        var query = 'SELECT * FROM ??';
        var table = ['module'];
        query = mysql.format(query, table);

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

        var query = 'SELECT * FROM ?? WHERE ?? = ?';
        var table = ['module','id',uid];
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

        var query = 'INSERT INTO ??(??,??) VALUES (?,?)';
        var table = ['module','name','description',nme,dsc];
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

        var query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
        var table = ['module','name',nme,'id',uid];
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

        var query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
        var table = ['module','description',dsc,'id',uid];
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

        var query = 'DELETE from ?? WHERE ?? = ?';
        var table = ['module','id',uid];
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