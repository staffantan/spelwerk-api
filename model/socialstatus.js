var mysql = require('mysql');

function SocialStatus(router, connection) {
    var self = this;
    self.routes(router, connection);
}

SocialStatus.prototype.routes = function(router, connection) {
    router.get('/socialstatus', function(request, response) {
        var query = 'SELECT * FROM ??';
        var table = ['socialstatus'];
        query = mysql.format(query, table);

        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.get('/socialstatus/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'SELECT * FROM ?? WHERE ?? = ?';
        var table = ['socialstatus','id',uid];
        query = mysql.format(query, table);

        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
            }
        });
    });

    router.post('/socialstatus', function(request, response) {
        var nme = request.body.name;
        var dsc = request.body.description;
        var fin = request.body.finance;

        var query = 'INSERT INTO ??(??,??,??) VALUES (?,?,?)';
        var table = ['socialstatus','name','description','finance',nme,dsc,fin];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {name: nme, description: dsc, finance: fin}});
            }
        });
    });

    router.put('/socialstatus/:id/name', function(request, response) {
        var uid = request.params.id;
        var nme = request.body.name;

        var query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
        var table = ['socialstatus','name',nme,'id',uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {name: nme}});
            }
        });
    });

    router.put('/socialstatus/:id/description', function(request, response) {
        var uid = request.params.id;
        var dsc = request.body.description;

        var query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
        var table = ['socialstatus','description',dsc,'id',uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {description: dsc}});
            }
        });
    });

    router.put('/socialstatus/:id/finance', function(request, response) {
        var uid = request.params.id;
        var fin = request.body.finance;

        var query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
        var table = ['socialstatus','finance',fin,'id',uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {finance: fin}});
            }
        });
    });

    router.delete('/socialstatus/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'DELETE from ?? WHERE ?? = ?';
        var table = ['socialstatus','id',uid];
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