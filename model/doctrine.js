var mysql = require('mysql');

function Doctrine(router, connection) {
    var self = this;
    self.routes(router, connection);
}

Doctrine.prototype.routes = function(router, connection) {
    router.get('/doctrine', function(request, response) {
        var query = 'SELECT doctrine.id AS id, doctrine.name AS name, doctrine.description AS description, manifestation.name AS manifestation FROM doctrine LEFT JOIN manifestation ON doctrine.is_manifestation=manifestation.id';

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

        var query = 'SELECT doctrine.id AS id, doctrine.name AS name, doctrine.description AS description, manifestation.name AS manifestation FROM doctrine LEFT JOIN manifestation ON doctrine.is_manifestation=manifestation.id WHERE doctrine.id=?';
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

    router.post('/doctrine', function(request, response) {
        var nme = request.body.name;
        var dsc = request.body.description;
        var mid = request.body.manifestationid;

        var query = 'INSERT INTO doctrine(name,description,is_manifestation) VALUES (?,?,?)';
        var table = [nme,dsc,mid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {name: nme, description: dsc, manifestation: mid}});
            }
        });
    });

    router.put('/doctrine/:id/name', function(request, response) {
        var uid = request.params.id;
        var nme = request.body.name;

        var query = 'UPDATE doctrine SET name = ? WHERE id = ?';
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

    router.put('/doctrine/:id/description', function(request, response) {
        var uid = request.params.id;
        var dsc = request.body.description;

        var query = 'UPDATE doctrine SET description = ? WHERE id = ?';
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

    router.delete('/doctrine/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'DELETE from doctrine WHERE id = ?';
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

module.exports = Doctrine;