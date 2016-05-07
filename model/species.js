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
        var uid = request.params.id;

        var query = 'SELECT * FROM species WHERE id = ?';
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

    router.post('/species', function(request, response) {
        var nme = request.body.name;
        var dsc = request.body.description;
        var spd = request.body.speed;
        var dmg = request.body.damage;
        var ini = request.body.initiative;
        var tol = request.body.tolerance;
        var res = request.body.resilience;
        var sta = request.body.stamina;
        var pot = request.body.potential;

        var query = 'INSERT INTO species(name,description,speed,damage,initiative,tolerance,resilience,stamina,potential) VALUES (?,?,?,?,?,?,?,?,?)';
        var table = [nme,dsc,spd,dmg,ini,tol,res,sta,pot];
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
        var uid = request.params.id;
        var nme = request.body.name;

        var query = 'UPDATE species SET name = ? WHERE id = ?';
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

    router.put('/species/:id/description', function(request, response) {
        var uid = request.params.id;
        var dsc = request.body.description;

        var query = 'UPDATE species SET description = ? WHERE id = ?';
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

    router.put('/species/:id/attributes', function(request, response) {
        var uid = request.params.id;
        var spd = request.body.speed;
        var dmg = request.body.damage;
        var ini = request.body.initiative;
        var tol = request.body.tolerance;
        var res = request.body.resilience;
        var sta = request.body.stamina;
        var pot = request.body.potential;

        var query = 'UPDATE species SET speed = ?, damage = ?, initiative = ?, tolerance = ?, resilience = ?, stamina = ?, potential = ? WHERE id = ?';
        var table = [spd,dmg,ini,tol,res,sta,pot,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {speed: spd, damage: dmg, initiative: ini, tolerance: tol, resilience: res, stamina: sta, potential: pot}});
            }
        });
    });

    router.delete('/species/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'DELETE from species WHERE id = ?';
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

module.exports = Species;