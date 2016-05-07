var mysql = require('mysql');

function Attribute(router, connection) {
    var self = this;
    self.routes(router, connection);
}

Attribute.prototype.routes = function(router, connection) {
    router.get('/attribute', function(request, response) {
        var query = 'SELECT attribute.*, attribute_type.name AS type, attribute_type.maximum FROM attribute ' +
            'LEFT JOIN attribute_type ON attribute.is_attribute_type=attribute_type.id';

        connection.query(query, function(error, rows) {
            if(error) {
                console.log(error);
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.get('/attribute/:id', function(request, response) {
        var query = 'SELECT attribute.*, attribute_type.name AS type, attribute_type.maximum FROM attribute ' +
            'LEFT JOIN attribute_type ON attribute.is_attribute_type=attribute_type.id ' +
            'WHERE attribute.id = ?';

        var table = [request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            }
            if(rows[0] != null) {
                response.status(200).send({error: false, message: 'success.', result: rows})
            } else {
                response.status(404).send({error: true, message: 'no attribute found.', details: error});
            }
        });
    });

    router.post('/attribute', function(request, response) {
        var query = 'INSERT INTO attribute(name,description,is_attribute_type,is_manifeattributeion) VALUES (?,?,?,?)';
        var table = [request.body.name,request.body.description,request.body.attributetype,request.body.manifeattributeion];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
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

    router.get('/attributetype', function(request, response) {
        var query = 'SELECT * FROM attribute_type';
        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.get('/attributetype/:id', function(request, response) {
        var query = 'SELECT * FROM attribute_type WHERE id = ?';
        var table = [request.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }//TODO: add if(rows[0] != null
        });
    });

    router.post('/attributetype', function(request, response) {
        var query = 'INSERT INTO attribute_type(name,maximum) VALUES (?,?)';
        var table = [request.body.name,request.body.maximum];
        query = mysql.format(query, table);
        connection.query(query, function(error) {
            if (error) {
                console.log(error)
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.'});
            }
        });
    });

    router.put('/attributetype/:id/name', function(request, response) {
        var query = 'UPDATE attribute_type SET name = ? WHERE id = ?';
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

    router.put('/attributetype/:id/maximum', function(request, response) {
        var query = 'UPDATE attribute_type SET maximum = ? WHERE id = ?';
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

    router.delete('/attributetype/:id', function(request, response) {
        var query = 'DELETE from attribute_type WHERE id = ?';
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