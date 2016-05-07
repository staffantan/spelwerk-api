var mysql = require('mysql');

function Attribute(router, connection) {
    var self = this;
    self.routes(router, connection);
}

Attribute.prototype.routes = function(router, connection) {
    router.get('/attribute', function(request, response) {
        var query = 'SELECT * FROM attribute';
        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.get('/attribute/:id', function(request, response) {
        var query = 'SELECT * FROM attribute WHERE id = ?';
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

    router.post('/attribute', function(request, response) {
        var query = 'INSERT INTO attribute(name,description,attributetype) VALUES (?,?,?)';
        var table = [request.body.name,request.body.description,request.body.type];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {

            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/attribute/:id/name', function(request, response) {
        var query = 'UPDATE attribute SET name = ? WHERE id = ?';
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

    router.put('/attribute/:id/description', function(request, response) {
        var query = 'UPDATE attribute SET description = ? WHERE id = ?';
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

    router.delete('/attribute/:id', function(request, response) {
        var query = 'DELETE from attribute WHERE id = ?';
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

    /** ************** **/
    /** ATTRIBUTE TYPE **/
    /** ************** **/

    router.get('/attribute/type', function(request, response) {
        var query = 'SELECT * FROM attribute_type';
        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.get('/attribute/type/:id', function(request, response) {
        var query = 'SELECT * FROM attribute_type WHERE id = ?';
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

    router.post('/attribute/type', function(request, response) {
        var query = 'INSERT INTO attribute(name,maximum,is_manifestation) VALUES (?,?,?)';
        var table = [request.body.name,request.body.maximum,request.body.manifestation];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {

            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/attribute/type/:id/name', function(request, response) {
        var query = 'UPDATE attribute SET name = ? WHERE id = ?';
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

    router.put('/attribute/type/:id/maximum', function(request, response) {
        var query = 'UPDATE attribute SET maximum = ? WHERE id = ?';
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

    router.delete('/attribute/type/:id', function(request, response) {
        var query = 'DELETE from attribute WHERE id = ?';
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

module.exports = Attribute;