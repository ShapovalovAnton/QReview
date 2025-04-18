var connection = require('../config/config.bd.js');

var client = function (client){
    this.IdClient=client.IdClient;
    this.NameClient=client.NameClient;
    this.EmailClient=client.EmailClient;
    this.PhoneClient=client.PhoneClient;
}

client.create = function (newClient, result) {
    connection.query("Insert into client set?", newClient, function(err,res){
        if(err){
            console.log("error", err);
            result(null, err);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    })
}

client.findById = function (id, result) {
    connection.query('Select * from client where IdClient = ?', id,
        function(err,res){
            if(err){
                console.log("error", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        }
    )
}

client.findAll = function (result) {
    connection.query('Select * from client',
        function(err,res){
            if(err){
                console.log("error", err);
                result(null, err);
            }
            else {
                console.log('Client : ', res )
                result(null, res);
            }
        }
    )
}

client.update = function (id, client, result) {
    connection.query('UPDATE client SET NameClient=?, EmailClient=?, PhoneClient=? WHERE IdClient=?',
        [client.NameClient, client.EmailClient, client.PhoneClient, id],
        function(err,res){
            if(err){
                console.log("error", err);
                result(null, err);
            }
            else {
                console.log('Client : ', res )
                result(null, res);
            }
        }
    )
}


client.delete = function (id,result) {
    connection.query('DELETE FROM client WHERE IdClient=?', [id],
        function(err,err){
            if(err){
                console.log("error", err);
                result(null, err);
            }
            else {
                console.log('Client : ', res )
                result(null, res);
            }
        }
    )
};

module.exports=client;