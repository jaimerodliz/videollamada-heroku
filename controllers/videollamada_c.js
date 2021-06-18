const Videollamada = require('../models/videollamada_m');
const { v4: uuidV4 } = require('uuid');

exports.crearSala = async(req, res) =>{
    //definir variables de sesion
    req.session.api_key = 0;
    req.session.id_user = 0;

    //obtener datos del post
    const { api_key,id_user } = req.body;
    if(api_key != "" && id_user != ""){
        //obtener un registro de la BD
        const obj = await Videollamada.findOne({
            where:{
                api_key: api_key,
                id_usuario: id_user,
                status: 1
            }
        });
        //console.log(obj);

        if(!obj){//verificar que sean encontrados los datos
            res.render('inhabilitada');
        }else{
            req.session.api_key = api_key;
            req.session.id_user = id_user;
            res.render('new-room',{
                errores: ''
            });
        }
    }else{
        res.render('inhabilitada');
    }
}

exports.loadRoom = async(req, res) =>{
    if(req.session.api_key !=0 && req.session.id_user !=0){
        const { inp_user_name }=req.body;

        const obj = await Videollamada.findOne({
            where:{
                api_key: req.session.api_key,
                id_usuario: req.session.id_user,
                status: 1
            }
        });

        if(!obj){//verificar que sean encontrados los datos
            res.render('inhabilitada');
        }else{
            if(inp_user_name.trim() !=''){
                res.render('room', { 
                    roomId:uuidV4(),
                    userName:inp_user_name.trim()
                });
            }else{
                res.render('new-room', { 
                    errores: 'Complete el formulario'
                });
            }
        }
    }else{
        res.render('inhabilitada');
    }
}