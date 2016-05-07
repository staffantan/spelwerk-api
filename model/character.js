var mysql = require('mysql');

function Character(router, connection) {
    var self = this;
    self.routes(router, connection);
}

Character.prototype.routes = function(router, connection) {
    router.get('/character', function(request, response) {
        var query = 'SELECT avatar.*, ' +
            'person.firstname, person.lastname, person.nickname, person.gender, person.occupation, person.description, person.finance, ' +
            'manifestation.name AS manifestation, socialstatus.name AS socialstatus, module.name AS module, species.name AS species ' +
            'FROM avatar ' +
            'LEFT JOIN person ON avatar.id=person.id ' +
            'LEFT JOIN manifestation ON has_manifestation=manifestation.id ' +
            'LEFT JOIN socialstatus ON is_socialstatus=socialstatus.id ' +
            'LEFT JOIN module ON person.in_module=module.id ' +
            'LEFT JOIN species ON person.is_species=species.id';

        connection.query(query, function(error, rows) {
            if(error) {
                console.log(error)
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
                //TODO: We should sort the response better in result.
            }
        });
    });

    router.get('/character/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'SELECT avatar.*, ' +
            'person.firstname, person.lastname, person.nickname, person.gender, person.occupation, person.description, person.finance, ' +
            'manifestation.name AS manifestation, socialstatus.name AS socialstatus, module.name AS module, species.name AS species ' +
            'FROM avatar ' +
            'LEFT JOIN person ON avatar.id=person.id ' +
            'LEFT JOIN manifestation ON has_manifestation=manifestation.id ' +
            'LEFT JOIN socialstatus ON is_socialstatus=socialstatus.id ' +
            'LEFT JOIN module ON person.in_module=module.id ' +
            'LEFT JOIN species ON person.is_species=species.id ' +
            'WHERE avatar.id=?';

        var table = [uid];
        query = mysql.format(query, table);

        connection.query(query, function(error, rows) {
            if(error) {
                response.status(400).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(200).send({error: false, message: 'success.', result: rows})
                //TODO: We should sort the response better in result.
            }
        });
    });

    router.post('/character', function(request, response) {
        var pid = request.body.personid;
        var age = request.body.age;
        var ntr = request.body.nature;
        var idn = request.body.identity;
        var ptn = request.body.potential;
        var amm = request.body.ammunition;
        var rat = request.body.rations;
        var res = request.body.resilience;
        var sta = request.body.stamina;
        var tol = request.body.tolerance;
        var dmg = request.body.damage;
        var ini = request.body.initiative;
        var spe = request.body.speed;
        var hon = request.body.honor;
        var inf = request.body.infamy;
        var bal = request.body.ballistic;
        var bas = request.body.bashing;
        var pie = request.body.piercing;
        var sla = request.body.slashing;
        var mid = request.body.manifestation;
        var sid = request.body.socialstatus;
        
        var query = 'INSERT INTO avatar(id,age,nature,identity,potential,ammunition,rations,resilience,stamina,tolerance,damage,initiative,speed,honor,infamy,ballistic,bashing,piercing,slashing,has_manifestation,is_socialstatus) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        var table = [pid,age,ntr,idn,ptn,amm,rat,res,sta,tol,dmg,ini,spe,hon,inf,bal,bas,pie,sla,mid,sid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {
                    id: pid, age: age, nature: ntr, identity: idn, potential: ptn, ammunition: amm, rations: rat, resilience: res, stamina: sta,
                    tolerance: tol, damage: dmg, initiative: ini, speed: spe, honor: hon, infamy: inf, ballistic: bal, bashing: bas,
                    piercing: pie, slashing: sla, manifestation: mid, socialstatus: sid}});
            }
        });
    });

    /** NATURE & IDENTITY */

    router.put('/character/:id/nature', function(request, response) {
        var uid = request.params.id;
        var value = request.body.nature;

        var query = 'UPDATE avatar SET nature = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {nature: value}});
            }
        });
    });

    router.put('/character/:id/identity', function(request, response) {
        var uid = request.params.id;
        var value = request.body.identity;

        var query = 'UPDATE avatar SET identity = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {identity: value}});
            }
        });
    });

    /** MANIFESTATION */

    router.put('/character/:id/manifestation', function(request, response) {
        var uid = request.params.id;
        var value = request.body.manifestation;

        var query = 'UPDATE avatar SET has_manifestation = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {manifestation: value}});
            }
        });
    });

    router.put('/character/:id/potential', function(request, response) {
        var uid = request.params.id;
        var value = request.body.potential;

        var query = 'UPDATE avatar SET potential = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {potential: value}});
            }
        });
    });

    /** CONSUMABLES */

    router.put('/character/:id/ammunition', function(request, response) {
        var uid = request.params.id;
        var value = request.body.ammunition;

        var query = 'UPDATE avatar SET ammunition = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {ammunition: value}});
            }
        });
    });

    router.put('/character/:id/rations', function(request, response) {
        var uid = request.params.id;
        var value = request.body.rations;

        var query = 'UPDATE avatar SET rations = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {rations: value}});
            }
        });
    });

    /** BODY */

    router.put('/character/:id/resilience', function(request, response) {
        var uid = request.params.id;
        var value = request.body.resilience;

        var query = 'UPDATE avatar SET resilience = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {resilience: value}});
            }
        });
    });

    router.put('/character/:id/stamina', function(request, response) {
        var uid = request.params.id;
        var value = request.body.stamina;

        var query = 'UPDATE avatar SET stamina = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {stamina: value}});
            }
        });
    });

    router.put('/character/:id/tolerance', function(request, response) {
        var uid = request.params.id;
        var value = request.body.tolerance;

        var query = 'UPDATE avatar SET tolerance = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {tolerance: value}});
            }
        });
    });

    /** COMBAT */

    router.put('/character/:id/damage', function(request, response) {
        var uid = request.params.id;
        var value = request.body.damage;

        var query = 'UPDATE avatar SET damage = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {damage: value}});
            }
        });
    });

    router.put('/character/:id/initiative', function(request, response) {
        var uid = request.params.id;
        var value = request.body.initiative;

        var query = 'UPDATE avatar SET initiative = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {initiative: value}});
            }
        });
    });

    router.put('/character/:id/speed', function(request, response) {
        var uid = request.params.id;
        var value = request.body.speed;

        var query = 'UPDATE avatar SET speed = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {speed: value}});
            }
        });
    });

    /** OTHER */

    router.put('/character/:id/age', function(request, response) {
        var uid = request.params.id;
        var value = request.body.age;

        var query = 'UPDATE tbl_character SET age = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {age: value}});
            }
        });
    });

    router.put('/character/:id/socialstatus', function(request, response) {
        var uid = request.params.id;
        var value = request.body.socialstatus;

        var query = 'UPDATE tbl_character SET is_socialstatus = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {socialstatus: value}});
            }
        });
    });

    router.put('/character/:id/honor', function(request, response) {
        var uid = request.params.id;
        var value = request.body.honor;

        var query = 'UPDATE avatar SET honor = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {honor: value}});
            }
        });
    });

    router.put('/character/:id/infamy', function(request, response) {
        var uid = request.params.id;
        var value = request.body.infamy;

        var query = 'UPDATE avatar SET infamy = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {infamy: value}});
            }
        });
    });

    /** PROTECTION */

    router.put('/character/:id/ballistic', function(request, response) {
        var uid = request.params.id;
        var value = request.body.ballistic;

        var query = 'UPDATE avatar SET ballistic = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {ballistic: value}});
            }
        });
    });

    router.put('/character/:id/bashing', function(request, response) {
        var uid = request.params.id;
        var value = request.body.bashing;

        var query = 'UPDATE avatar SET bashing = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {bashing: value}});
            }
        });
    });

    router.put('/character/:id/piercing', function(request, response) {
        var uid = request.params.id;
        var value = request.body.piercing;

        var query = 'UPDATE avatar SET piercing = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {piercing: value}});
            }
        });
    });

    router.put('/character/:id/slashing', function(request, response) {
        var uid = request.params.id;
        var value = request.body.slashing;

        var query = 'UPDATE avatar SET slashing = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {slashing: value}});
            }
        });
    });

    /** PERSON INHERITANCE */

    router.put('/character/:id/firstname', function(request, response) {
        var uid = request.params.id;
        var value = request.body.firstname;

        var query = 'UPDATE person SET firstname = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {firstname: value}});
            }
        });
    });

    router.put('/character/:id/lastname', function(request, response) {
        var uid = request.params.id;
        var value = request.body.lastname;

        var query = 'UPDATE person SET lastname = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {lastname: value}});
            }
        });
    });

    router.put('/character/:id/nickname', function(request, response) {
        var uid = request.params.id;
        var value = request.body.nickname;

        var query = 'UPDATE person SET nickname = ? WHERE id = ?';
        var table = [value,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {nickname: value}});
            }
        });
    });

    router.put('/character/:id/description', function(request, response) {
        var uid = request.params.id;
        var dsc = request.body.description;

        var query = 'UPDATE person SET description = ? WHERE id = ?';
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

    router.put('/character/:id/occupation', function(request, response) {
        var uid = request.params.id;
        var ocu = request.body.occupation;

        var query = 'UPDATE person SET occupation = ? WHERE id = ?';
        var table = [ocu,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {occupation: ocu}});
            }
        });
    });

    router.put('/character/:id/finance', function(request, response) {
        var uid = request.params.id;
        var fin = request.body.finance;

        var query = 'UPDATE person SET finance = ? WHERE id = ?';
        var table = [fin,uid];
        query = mysql.format(query, table);

        connection.query(query, function(error) {
            if (error) {
                response.status(500).send({error: true, message: 'error executing mysql query.', details: error});
            } else {
                response.status(201).send({error: false, message: 'success.', result: {finance: fin}});
            }
        });
    });

    /** DELETION */

    router.delete('/character/:id', function(request, response) {
        var uid = request.params.id;

        var query = 'DELETE from avatar WHERE id = ?';
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

module.exports = Character;