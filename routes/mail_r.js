const { Router } = require('express');
const router = Router();

const nodemailer = require("nodemailer");

router.post("/send-email",(req,res) =>{
    //console.log(req.body);
    const ruta=req.body.ruta;
    var url = req.get('Host');
    const correos=JSON.parse(req.body.correo);
    //console.log(correos);
    //console.log(ruta);

    var maillist = [];
    for(var x=0;x<correos.length;x++){
        maillist.push(correos[x]); 
    }

    contentHTML = `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"><html>
    <head><title>Very Helvetica</title><meta http-equiv="Content-Type" content="text/html" charset="">
    <style type="text/css">a:link{color:#61c7dd;}a:hover{color:#59b8cc;}</style></head><body bgcolor="#FFFFFF"
    leftmargin="0" topmargin="0" marginwidth="0" marginheight="0"><table width="100%" border="0" cellspacing="0"
    cellpadding="0"><tr><td valign="top" bgcolor="#FFFFFF"><table width="600" border="0" align="center" cellpadding="0"
    cellspacing="0" style="font: 14px Helvetica, Arial, sans-serif; color: #767572; line-height: 100%;">
    <tr><td valign="top"><table width="600" height="204" border="0" cellpadding="0" cellspacing="0"><tr>
    <td style="height: 63px;"><table width="100%" border="0" cellspacing="0" cellpadding="10"><tr><td style="font-family:
    Helvetica, Arial, sans-serif; font-size: 11px; color: #808080; padding-top: 15px;">Usted está recibiendo este correo
    debido a una invitacion a una <b>VIDEOLLAMADA</b> , en caso de haberla revisado,haga caso omiso de este mensaje.</td>
    </tr></table></td></tr><tr><td colspan="6" bgcolor="#1d7abc" height="3"></td></tr><tr><td valign="top" style="width: 504px;
    height: 125px;"><table width="100%" border="0" cellspacing="0" cellpadding="0" style="height: 125px;"><tr><td valign="top"
    bgcolor="#FFFFFF" style="height: 10px;">&nbsp;</td></tr>

    <tr><td valign="top" bgcolor="#FFFFFF" style="height: 50px;
    font-family: Helvetica, Arial, sans-serif; font-size: 40px; font-weight: bold; color: #000000; letter-spacing: -2px;
    line-height: 90%;">Invitacion para videollamada</td>
    </tr>

    <tr><td valign="top" bgcolor="#FFFFFF" style="height: 50px;
    font-family: Helvetica, Arial, sans-serif; font-size: 25px; font-weight: bold; color: #000000; letter-spacing: -2px;
    line-height: 90%;">Ruta:</td>
    </tr>
    <tr><td valign="top" bgcolor="#FFFFFF" style="height: 50px;
    font-family: Helvetica, Arial, sans-serif; font-size: 25px; font-weight: bold; color: #000000; letter-spacing: -2px;
    line-height: 90%;">${url}/user</td>
    </tr>

    <tr><td valign="top" bgcolor="#FFFFFF" style="height: 50px;
    font-family: Helvetica, Arial, sans-serif; font-size: 25px; font-weight: bold; color: #000000; letter-spacing: -2px;
    line-height: 90%;">Codigo para entrar a videollamada:</td>
    </tr>
    <tr><td valign="top" bgcolor="#FFFFFF" style="height: 50px;
    font-family: Helvetica, Arial, sans-serif; font-size: 25px; font-weight: bold; color: #000000; letter-spacing: -2px;
    line-height: 90%;">${ruta}</td>
    </tr>
    <tr>
    <td style="border-collapse:collapse">
    <p style="color:#65646a;font-family:HelveticaNeue,helvetica,arial,sans-serif;font-size:14px;font-weight:800;line-height:24px;margin:0 0 24px 0">
    <br>Atentamente<br>Equipo SIE7E</p></td></tr>
    <tr><td style="border-collapse:collapse;padding-bottom:8px;padding-top:24px">
    <div><a style="background-color:#1d7abc;border:0px solid #73ae51;border-radius:2px;color:#fff;display:inline-block;font-family:sans-serif;font-size:15px;font-weight:bold;line-height:32px;padding:0 30px 0 30px;text-align:center;text-decoration:none"><span style="color:#fff">Gracias!</span></a>
    </div></td></tr></tbody></table></td></tr></tbody></table>
    <table cellpadding="32" width="100%" cellspacing="0" style="border-collapse:collapse;max-width:100%;width:100%"></table></td></tr></tbody>
    </table></td></tr><tr><td style="height:40px"> </td></tr>
            <tr><td valign="top" bgcolor="#FFFFFF" style="height:50px;font-family:Helvetica,Arial,sans-serif;font-size:25px;font-weight:bold;color:#bfbeb9;letter-spacing:-2px;line-height:90%">
            <span style="font-family:Helvetica,Arial,sans-serif;font-size:25px;font-weight:bold;color:#4880a8">S</span>istema <span style="font-family:Helvetica,Arial,sans-serif;font-size:25px;font-weight:bold;color:#4880a8">I</span>ntegral <span style="font-family:Helvetica,Arial,sans-serif;font-size:25px;font-weight:bold;color:#4880a8"> E</span>lectrónico de <span style="font-family:Helvetica,Arial,sans-serif;font-size:25px;font-weight:bold;color:#4880a8">T</span>ecnologías <span style="font-family:Helvetica,Arial,sans-serif;font-size:25px;font-weight:bold;color:#4880a8">E</span>mpresariales

            </td>

            </tr>
    <tr><td colspan="6" bgcolor="#1d7abc" height="3"></td></tr>
    <tr><td style="height: 20px;">&nbsp;</td></tr><tr>
    <td style="height: 30px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr><td width="30%" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr><td style="font-family: Helvetica, Arial, sans-serif; font-size: 25px; font-weight: bold; color: #767572; letter-spacing: -2px; padding-bottom: 10px;">Simple</td></tr><tr><td valign="top" style="font-family: Helvetica, Arial, sans-serif; color: #767572; line-height: 130%;">en cada transacción y proceso que maneja</td></tr></table></td><td width="5%" valign="top">&nbsp;</td><td width="30%" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td style="font-family: Helvetica, Arial, sans-serif; font-size: 25px; font-weight: bold; color: #767572; letter-spacing: -2px; padding-bottom: 10px;">Integral</td></tr><tr><td valign="top" style="font-family: Helvetica, Arial, sans-serif; color: #767572; line-height: 130%;">al poder controlar múltiples rubros de su negocio</a></td></tr></table></td><td width="5%" valign="top">&nbsp;</td><td width="30%" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td style="font-family: Helvetica, Arial, sans-serif; font-size: 25px; font-weight: bold; color: #767572; letter-spacing: -2px; padding-bottom: 10px;">Profesional</td></tr><tr><td valign="top" style="font-family: Helvetica, Arial, sans-serif; color: #767572; line-height: 130%;">con nuestro servicio y con el cliente.</a></td></tr></table></td></tr></table></td></tr><tr><td style="height: 30px;">&nbsp;</td></tr></table></td></tr></table></td></tr><tr><td><table width="600" border="0" cellpadding="0" cellspacing="0" style="padding-top: 10px;"><tr><td width="30" valign="top">&nbsp;</td><td width="16" rowspan="2" valign="top">&nbsp;</td>
    <td width="334" rowspan="2" valign="top">
    <p style="font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: bold; color: #767572; margin: 0; padding: 0 0 6px 0;">
    Contacto:</p>
    <p style="font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#767572;margin:0;padding:0;letter-spacing:-0.3px">
    INTEC F7 S DE RL DE CV -
    Río Usumacinta 836 Int. A,
    Col. Industrial Bravo,
    C.P. 80120, Culiacán Rosales, Sin.
    </p>
    <br>
    <p style="font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#767572;margin:0;padding:0;letter-spacing:-0.3px">
    Tel. (667) 257-68-63
    </p>
    <br>
    <p style="font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#767572;margin:0;padding:0;letter-spacing:-0.3px">
        <p style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#767572;margin:0;padding:0;letter-spacing:-0.3px"><b> Aviso de confidencialidad para correo electrónico</b></p>
        <br>
    <p style="text-align:justify;text-justify:inter-word;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#767572;margin:0;padding:0;letter-spacing:-0.3px">

    El contenido de este correo electrónico y sus archivos adjuntos son estrictamente confidenciales, están
    legalmente protegidos por la Ley Federal de Protección de Datos Particulares en Posesión de los Particulares
    y sólo deben ser accesibles a las personas a las que se les dirige. Por favor tenga el debido cuidado para que
    no se efectúen copias, imitaciones o distribuciones de este e-mail, y que sólo el destinatario indicado haga uso
    de él. Si usted ha recibido este correo por error, favor de informarlo al remitente de inmediato por esta misma
    vía y borre su contenido incluyendo los archivos adjuntos. Gracias por su colaboración.
    <br>
    Consulte nuestro
    <a href="https://7contabilidad.com/" target="_blank">Aviso de privacidad</a>

    </p>
    </p>

    </td></table></td></tr></table></td></tr></table></body></html>
    `;
    //qzhodftuhtzhwite contraseña gmail aplicacion
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'seprom19@gmail.com',
            pass: 'qzhodftuhtzhwite'
        }
    });

    const mailOPtions = {
        from: '"7Contabilidad" <seprom19@gmail.com>', // sender address,
        to: maillist,
        subject: 'Invitacion a videollamada ahora- 7CONTABILIDAD',
        html: contentHTML
    }

    transporter.sendMail(mailOPtions, (error,info)=>{
        if(error){
            res.status(500).send(error.message);
        }else{
            //console.log("Email enviado");
            res.status(200).send({ message : 'Enviado correctamente' });
        }
    })
});

module.exports = router;