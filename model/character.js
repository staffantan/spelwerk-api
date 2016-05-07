var mysql = require('mysql');

function Character(router, connection) {
    var self = this;
    self.routes(router, connection);
}

Character.prototype.routes = function(router, connection) {
    router.get('/character', function(request, response) {
        response.status(501).send({error: false, message: 'not implemented yet'});
    });

    router.get('/character/:id', function(request, response) {
        response.status(501).send({error: false, message: 'not implemented yet'});
    });

    router.post('/character/', function(request, response) {
        response.status(501).send({error: false, message: 'not implemented yet'});
    });

    router.put('/character/:id', function(request, response) {
        response.status(501).send({error: false, message: 'not implemented yet'});
    });

    router.delete('/character/:id', function(request, response) {
        response.status(501).send({error: false, message: 'not implemented yet'});
    });
};

module.exports = Character;