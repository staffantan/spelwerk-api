var mysql = require('mysql');

function SocialStatus(router, connection) {
    var self = this;
    self.routes(router, connection);
}

SocialStatus.prototype.routes = function(router, connection) {
    router.get('/socialstatus', function(request, response) {
        var query = 'SELECT * FROM socialstatus';
        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.get('/socialstatus/:id', function(request, response) {
        var query = 'SELECT * FROM socialstatus WHERE id = ?';
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

    //TODO: SOCIALSTATUS NEEDS ANOTHER REFERENCE TO THE CORRECT ATTRIBUTE
    router.post('/socialstatus', function(request, response) {
        var query = 'INSERT INTO socialstatus(name,description,finance) VALUES (?,?,?)';
        var table = [
            request.body.name,
            request.body.description,
            request.body.finance
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

    router.put('/socialstatus/:id/name', function(request, response) {
        var query = 'UPDATE socialstatus SET name = ? WHERE id = ?';
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

    router.put('/socialstatus/:id/description', function(request, response) {
        var query = 'UPDATE socialstatus SET description = ? WHERE id = ?';
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

    router.put('/socialstatus/:id/finance', function(request, response) {
        var query = 'UPDATE socialstatus SET finance = ? WHERE id = ?';
        var table = [request.body.finance,request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.delete('/socialstatus/:id', function(request, response) {
        var query = 'DELETE from socialstatus WHERE id = ?';
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

module.exports = SocialStatus;