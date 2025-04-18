const client=require('../model/client.model');

exports.findAll = function(req, res){
    client.findAll(function(err,data){
        if(err) res.send(err);
        
        res.send(data);
    })
}

exports.create = function(req, res){
    const new_client = new client(req.body);

    if(req.body.constructor === Object && Object.keys(req.body).length===0){
        res.status(400).send({error:true, message:'Please provide all required field'})
    } else {
        client.create(new_client, function(err,client){
            if(err) res.send(err);
            res.json({error:false, message:"Client created", data: client});
        })
    }
}

exports.findById = function(req, res){
    client.findById(req.params.id, function(err,client){
        if(err) res.send(err);
        res.json(client);
    })
}

exports.update = function(req, res){
    if(req.body.constructor === Object && Object.keys(req.body).length===0){
        res.status(400).send({error:true, message:'Please provide all required field'})
    } else {
        client.update(req.params.id,new client(req.body), function(err,client){
            if(err) res.send(err);
            res.json({error:false, message:"Client successfully updated"});
        })
    }
}

exports.delete = function(req, res){
    client.delete(req.params.id, function(err,result){
        if(err) res.send(err);
        res.json({error:false, message:"Client successfully deleted", data: result});
    })
}