const { Router } = require('express');
const router = Router();
const { v4: uuidV4 } = require('uuid');
//importar express validator
const { body } = require('express-validator');
const videoController = require('../controllers/videollamada_c');

module.exports = function(){
    
    /*router.get('/host_new/', (req, res)=> {
        res.redirect(`/host/${uuidV4()}`)
    });*/

    router.get('/', (req, res)=> {
        req.session.api_key = 0;
        req.session.id_user = 0;
        //res.render('new-room');
        res.render('inhabilitada');
    });

    //router.post('/', videoController.validaApi);

    router.post('/new-room',
        body('api_key').not().isEmpty().trim().escape(),
        body('id_user').not().isEmpty().trim().escape(),
        videoController.crearSala
    );

    router.get('/new-room', (req, res)=>{
        req.session.api_key = 0;
        req.session.id_user = 0;
        //res.render('new-room');
        res.render('inhabilitada');
    });

    router.get('/host', (req, res)=>{
        req.session.api_key = 0;
        req.session.id_user = 0;
        //res.render('new-room');
        res.render('inhabilitada');
    });

    router.post('/host',videoController.loadRoom);

    /*router.get('/host/:user_name', (req, res)=> {
        res.redirect(`/host/${uuidV4()}&${req.params.user_name}`);
    });

    router.get('/host/:room&:user_name', (req, res)=>{
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        res.render('room', { roomId:req.params.room,userName:req.params.user_name,ip:ip });
    });*/


    router.get('/user/:room&:user_name', (req, res)=>{
        if(req.params.room != "" && req.params.user_name !=""){
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            res.render('usersRoom', { roomId:req.params.room,userName:req.params.user_name});
        }else{
            res.render('join-user',{ disponible:'0'});
        }
        
    });
    
    router.get('/user', (req, res)=>{
        res.render('join-user',{ disponible:'1'});
    });

    router.get('/no-disponible', (req, res)=>{
        res.render('join-user',{ disponible:'0'});
    });

    

    return router;
}