var mysql = require('mysql');

function Doctrine(router, connection) {
    var self = this;
    self.routes(router, connection);
}

Doctrine.prototype.routes = function(router, connection) {
    router.get('/doctrine', function(request, response) {
        var query = 'SELECT ?? AS ??, ?? AS ??, ?? AS ??, ?? AS ?? FROM ?? LEFT JOIN ?? ON ??=??';
        var table = ['doctrine.id','id','doctrine.name','name','doctrine.description','description','manifestation.name','manifestation','doctrine','manifestation','doctrine.is_manifestation','manifestation.id'];
        query = mysql.format(query, table);

        console.log(query);

        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.get('/doctrine/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'SELECT ?? AS ??, ?? AS ??, ?? AS ??, ?? AS ?? FROM ?? LEFT JOIN ?? ON ??=?? WHERE ??=?';
        var table = ['doctrine.id','id','doctrine.name','name','doctrine.description','description','manifestation.name','manifestation','doctrine','manifestation','doctrine.is_manifestation','manifestation.id','doctrine.id',uid];
        query = mysql.format(query, table);

        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.post('/doctrine', function(request, response) {
        var nme = request.body.name;
        var dsc = request.body.description;
        var mid = request.body.is_manifestation;

        var query = 'INSERT INTO ??(??,??,??) VALUES (?,?,?)';
        var table = ['doctrine','name','description','is_manifestation',nme,dsc,mid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {name: nme, description: dsc}});
            }
        });
    });

    router.put('/doctrine/:id/name', function(request, response) {
        var uid = request.params.id;
        var nme = request.body.name;

        var query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
        var table = ['doctrine','name',nme,'id',uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {name: nme}});
            }
        });
    });

    router.put('/doctrine/:id/description', function(request, response) {
        var uid = request.params.id;
        var dsc = request.body.description;

        var query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
        var table = ['doctrine','description',dsc,'id',uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {description: dsc}});
            }
        });
    });

    router.delete('/doctrine/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'DELETE from ?? WHERE ?? = ?';
        var table = ['doctrine','id',uid];
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

module.exports = Doctrine;