"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Appointment
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

import smtplib

import os

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

sender_email = os.getenv("SMTP_USERNAME")
sender_password = os.getenv("SMTP_APP_PASSWORD")
smtp_host = os.getenv("SMTP_HOST")
smtp_port = os.getenv("SMTP_PORT")

receivers_emails = os.getenv("RECIEVERS_EMAIL").split(",")

def send_singup_email(receivers_emails):
    message  = MIMEMultipart("alternative")

    message["Subject"] = "Bienvenido a Tickets Anda 🐬🌈"
    message["From"] = "budaenpantuflas@gmail.com"
    message["Reply-To"] = "budaenpantuflas@gmail.com"
  
    message["To"] = ", ".join(receivers_emails)

    html_content = """
        <html>
            <body>
                <table cellspacing="0" cellpadding="0" border="0" role="presentation" class="m_2015214686259182189nl2go-body-table" width="100%" style="background-color:#ffffff;width:100%"><tbody><tr><td> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="600" align="center" class="m_2015214686259182189r0-o" style="table-layout:fixed;width:600px"><tbody><tr><td valign="top" class="m_2015214686259182189r1-i" style="background-color:#ffffff"><span class="im"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="m_2015214686259182189r3-o" style="table-layout:fixed;width:100%"><tbody><tr><td class="m_2015214686259182189r4-i" style="padding-bottom:20px;padding-top:20px"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tbody><tr><th width="100%" valign="top" class="m_2015214686259182189r5-c" style="font-weight:normal"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="m_2015214686259182189r6-o" style="table-layout:fixed;width:100%"><tbody><tr><td valign="top" class="m_2015214686259182189r7-i" style="padding-left:15px;padding-right:15px"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tbody><tr><td class="m_2015214686259182189r8-c" align="center" style="font-size:0px;line-height:0px;padding-bottom:15px;padding-top:15px"> <img src="https://ci3.googleusercontent.com/meips/ADKq_NZw0UF10EYLOiNe2NDIQv34N6Jw_mbT5QbrM9qFw3O6soGGYUSISDdrcRjvKSvFOw0TeXgaQyZvW593PTdLFTwF_W_uqfDvgN2_8IuI3a5O68Nun77D7XvfL5NF6jfxo_EjROKokSOSRuFnJHoS_s0Mf4BMaRkLKOw2FnSGF3oCok9jud_Nq-5MPHNPFDZjPMa6wW8ajQdCrrREpfOmHVAW8EP38BltxaCVQLuGA96v_zHtcXRCRBreSy7kiB9QaL66lz5u4Vy_wJ6QjskhOfqmAkliLOlk6a9-JCQFK2FzYQVNn-3vUoYzKGuivi6oIgP_74oFRi_s85gWdi89mSqIlh59kG0_aZ3yuBPKHhfgn_bpz1yquJg3VuPlAa0WMw4QTg1oJoFasgC8wxwPt_0ybL_0xnurp1A3zntZKcyyPCzh-aniBEswZ38hQT27wOu4aDSsO0YI6MuhT7QRdRrL_vad2g6tLLps-d_6txp2vyYX_PSA27HN0pcYXTRoADMxC1O1Z3Yz_02uk3J7CW76ayKeI44YovBDT7Rs-qoTQbQ6oExvnI-R9L1V0LiCedhZZvMUTtzXjJwhEtKM59Uoca7LlmSOWGQ5f2g=s0-d-e1-ft#https://iehhbhg.r.bh.d.sendibt3.com/im/8477176/f29bbb28bd8324d65f7cc6a11d9b05d5477182e24db5d183b79f84245d98bc3b.png?e=7LwGFPtr5bOtMHnkhS51nc-atvmgiwBxGzlcFBrHojHL_1BcOQ5kA0FU33NMe5prPgxyCRwzpD1YVXFNcHWe6laNEjKoOc_nzBJD20z_WE-j8UhlJXqmVlrbJrPI3pNAsqGGbmHsH1dYYBBHCFMOFOXSUGRmb4anjRpkq83H6ZjH83ydPU-225jDcOX-6uPM9s3j-90dq4e5Cv271ckxuM-OZ6JR97BvEjer3G-7tthdOOicm475yPa-fvOYAC220FKxwuEfWBBNLfrHfWr6WjP8iRN0W5M6g9qVqwz_ho8l1qaFvKPWNGPFdpLXGL8" width="570" border="0" style="display:block;width:100%" class="CToWUd a6T" data-bit="iit" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 545px; top: 383px;"><span data-is-tooltip-wrapper="true" class="a5q" jsaction="JIbuQc:.CLIENT"><button class="VYBDae-JX-I VYBDae-JX-I-ql-ay5-ays CgzRE" jscontroller="PIVayb" jsaction="click:h5M12e; clickmod:h5M12e;pointerdown:FEiYhc;pointerup:mF5Elf;pointerenter:EX0mI;pointerleave:vpvbp;pointercancel:xyn4sd;contextmenu:xexox;focus:h06R8; blur:zjh6rb;mlnRJb:fLiPzd;" data-idom-class="CgzRE" data-use-native-focus-logic="true" jsname="hRZeKc" aria-label="Descargar el archivo adjunto " data-tooltip-enabled="true" data-tooltip-id="tt-c61" data-tooltip-classes="AZPksf" id="" jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB; 4:WyIjbXNnLWY6MTgxNzg3NTM5MzM5OTU0NDQxOCJd; 43:WyJpbWFnZS9qcGVnIl0."><span class="OiePBf-zPjgPe VYBDae-JX-UHGRz"></span><span class="bHC-Q" jscontroller="LBaJxb" jsname="m9ZlFb" soy-skip="" ssk="6:RWVI5c"></span><span class="VYBDae-JX-ank-Rtc0Jf" jsname="S5tZuc" aria-hidden="true"><span class="notranslate bzc-ank" aria-hidden="true"><svg viewBox="0 -960 960 960" height="20" width="20" focusable="false" class=" aoH"><path d="M480-336L288-528l51-51L444-474V-816h72v342L621-579l51,51L480-336ZM263.72-192Q234-192 213-213.15T192-264v-72h72v72H696v-72h72v72q0,29.7-21.16,50.85T695.96-192H263.72Z"></path></svg></span></span><div class="VYBDae-JX-ano"></div></button><div class="ne2Ple-oshW8e-J9" id="tt-c61" role="tooltip" aria-hidden="true">Descargar</div></span></div></td> </tr></tbody></table></td> </tr></tbody></table></th> </tr></tbody></table></td> </tr></tbody></table><table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="m_2015214686259182189r3-o" style="table-layout:fixed;width:100%"><tbody><tr><td class="m_2015214686259182189r9-i" style="padding-bottom:20px;padding-top:20px"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tbody><tr><th width="100%" valign="top" class="m_2015214686259182189r5-c" style="font-weight:normal"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="m_2015214686259182189r6-o" style="table-layout:fixed;width:100%"><tbody><tr><td valign="top" class="m_2015214686259182189r7-i" style="padding-left:10px;padding-right:10px"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tbody><tr><td class="m_2015214686259182189r10-c m_2015214686259182189nl2go-default-textstyle" align="left" style="color:#3b3f44;font-family:arial,helvetica,sans-serif;font-size:16px;line-height:1.5;word-break:break-word;padding-top:15px;text-align:left"> <div><h2 class="m_2015214686259182189default-heading2" style="margin:0;color:#1f2d3d;font-family:arial,helvetica,sans-serif;font-size:32px;word-break:break-word">Bienvenido a ReserVAnda</h2></div> </td> </tr><tr><td class="m_2015214686259182189r11-c m_2015214686259182189nl2go-default-textstyle" align="left" style="color:#3b3f44;font-family:arial,helvetica,sans-serif;font-size:16px;line-height:1.5;word-break:break-word;padding-bottom:15px;padding-top:15px;text-align:left"> <div><p style="margin:0">Puedes comenzar a utilizar nuestro servicio de reserva online</p><p style="margin:0">&nbsp;</p><p style="margin:0">Recuerda que para loguearte debes usar tu número de cédula de identidad sin puntos ni guiones y con el dígito verificador incluido.</p></div> </td> </tr></tbody></table></td> </tr></tbody></table></th> </tr></tbody></table></td> </tr></tbody></table></span><table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="m_2015214686259182189r3-o" style="table-layout:fixed;width:100%"><tbody><tr><td class="m_2015214686259182189r12-i" style="background-color:#eff2f7;padding-bottom:20px;padding-top:20px"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tbody><tr><th width="100%" valign="top" class="m_2015214686259182189r5-c" style="font-weight:normal"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="m_2015214686259182189r6-o" style="table-layout:fixed;width:100%"><tbody><tr><td valign="top" class="m_2015214686259182189r7-i" style="padding-left:15px;padding-right:15px"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tbody><tr><td class="m_2015214686259182189r13-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="m_2015214686259182189r14-o" style="table-layout:fixed;width:100%"><tbody><tr><td align="center" valign="top" class="m_2015214686259182189r15-i m_2015214686259182189nl2go-default-textstyle" style="color:#3b3f44;font-family:arial,helvetica,sans-serif;word-break:break-word;font-size:18px;line-height:1.5;text-align:center"> <div><p style="margin:0;font-size:14px">siempre viva 1234, 11800, MONTEVIDEO</p></div> </td> </tr></tbody></table></td> </tr><tr><td class="m_2015214686259182189r13-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="m_2015214686259182189r14-o" style="table-layout:fixed;width:100%"><tbody><tr><td align="center" valign="top" class="m_2015214686259182189r16-i m_2015214686259182189nl2go-default-textstyle" style="color:#3b3f44;font-family:arial,helvetica,sans-serif;word-break:break-word;font-size:18px;line-height:1.5;padding-top:15px;text-align:center"> <div><p style="margin:0;font-size:14px">Este correo fue enviado a&nbsp;<a href="mailto:agustindemontel@gmail.com" target="_blank">agustindemontel@gmail.com</a></p></div> </td> </tr></tbody></table></td> </tr><tr><td class="m_2015214686259182189r13-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="m_2015214686259182189r14-o" style="table-layout:fixed;width:100%"><tbody><tr><td align="center" valign="top" class="m_2015214686259182189r15-i m_2015214686259182189nl2go-default-textstyle" style="color:#3b3f44;font-family:arial,helvetica,sans-serif;word-break:break-word;font-size:18px;line-height:1.5;text-align:center"> <div><p style="margin:0;font-size:14px">Has recibido este correo al registrarte a nuestro servicio de reserva online</p></div> </td> </tr></tbody></table></td> </tr><tr><td class="m_2015214686259182189r13-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="m_2015214686259182189r14-o" style="table-layout:fixed;width:100%"><tbody><tr><td align="center" valign="top" class="m_2015214686259182189r17-i m_2015214686259182189nl2go-default-textstyle" style="color:#3b3f44;font-family:arial,helvetica,sans-serif;word-break:break-word;font-size:18px;line-height:1.5;padding-bottom:15px;padding-top:15px;text-align:center"> <div><p style="margin:0;font-size:14px"><a href="https://iehhbhg.r.bh.d.sendibt3.com/tr/un/Wjize0onwfxuT7_rjP4p22aNXtdOk1LGqlVl23x_15MeOEXBVBbyqa842p1gDafquOFEXJ3JxtYIk3Q2EWRTzl75VtUG6ORc4PiNHlGrvwIYJD4Svd16vxzsl_1wTVS5O7bpUF1bZm8ZBRlcPr9eZ1X6Qn4FTiYeysLynTVwj2lh1beoWTBaTmK299-K36kllP_AlVvDtn69mUiZGiC4G2ARPbcepGqqexkjsESL0K90NWBp0Jev5e9nHFFOO_Xqfp7saFgQpnWdo19jbdMCXcHuLale7AqbBMKFz4ZoJA" style="color:#696969;text-decoration:underline" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://iehhbhg.r.bh.d.sendibt3.com/tr/un/Wjize0onwfxuT7_rjP4p22aNXtdOk1LGqlVl23x_15MeOEXBVBbyqa842p1gDafquOFEXJ3JxtYIk3Q2EWRTzl75VtUG6ORc4PiNHlGrvwIYJD4Svd16vxzsl_1wTVS5O7bpUF1bZm8ZBRlcPr9eZ1X6Qn4FTiYeysLynTVwj2lh1beoWTBaTmK299-K36kllP_AlVvDtn69mUiZGiC4G2ARPbcepGqqexkjsESL0K90NWBp0Jev5e9nHFFOO_Xqfp7saFgQpnWdo19jbdMCXcHuLale7AqbBMKFz4ZoJA&amp;source=gmail&amp;ust=1733747476358000&amp;usg=AOvVaw3KBsQgcHwnskMkxElOQZW_">Darse de baja</a></p></div> </td> </tr></tbody></table></td> </tr><tr><td class="m_2015214686259182189r18-c" align="center"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="m_2015214686259182189r3-o" style="table-layout:fixed;width:100%"><tbody><tr><td valign="top" class="m_2015214686259182189r19-i" style="padding-bottom:15px"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tbody><tr><td class="m_2015214686259182189r20-c" align="center"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="129" class="m_2015214686259182189r21-o" style="table-layout:fixed"><tbody><tr><td height="48" style="font-size:0px;line-height:0px"> <a href="https://iehhbhg.r.bh.d.sendibt3.com/tr/cl/p4Ef3EjhhgXPCIH8R1pZ2gmrQjQke9TbwFyInmAzYSguD8HSykncmGKhIoV-PJBCjHsZIsYSbT5V1iuJx-W1868Ph2ajyYIY9KZVkOf0g1J-iUbRkyVeGLvL1jKdj1IRkfRgTfl_TKSwNQ-C89cEXg0v7HKfc1_UojzHFMRusJ2PlJzgeQIiLGahUrC9MnPGQWVCWQiV63AZbqsYBkL4kNxDdCFEi9JYdiIU5M4LKvAkbzGd1gxX7WIsKEiUiCnoN95baoa3-xJiDJEescADmBkenZxdIDLhoFvNWmFsNyZHsRGLeVcuJsmBYI4IRkZBrFTxbUMzajcoM7nR" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://iehhbhg.r.bh.d.sendibt3.com/tr/cl/p4Ef3EjhhgXPCIH8R1pZ2gmrQjQke9TbwFyInmAzYSguD8HSykncmGKhIoV-PJBCjHsZIsYSbT5V1iuJx-W1868Ph2ajyYIY9KZVkOf0g1J-iUbRkyVeGLvL1jKdj1IRkfRgTfl_TKSwNQ-C89cEXg0v7HKfc1_UojzHFMRusJ2PlJzgeQIiLGahUrC9MnPGQWVCWQiV63AZbqsYBkL4kNxDdCFEi9JYdiIU5M4LKvAkbzGd1gxX7WIsKEiUiCnoN95baoa3-xJiDJEescADmBkenZxdIDLhoFvNWmFsNyZHsRGLeVcuJsmBYI4IRkZBrFTxbUMzajcoM7nR&amp;source=gmail&amp;ust=1733747476358000&amp;usg=AOvVaw387VrBHXWfMPiXbw_2PvTD"><img src="https://ci3.googleusercontent.com/meips/ADKq_NbIlBe4s9aZuYr3__6U3nGQ7yiaYwPunIo4LFXrqZESVYqrZymuOEZgGCjpuAylrRh-LBlloUwqqw4fKbzHwEYoLPHPvhn98Eg7jFGyBDsaHhtRClYM_FgMI0-5W728Z8VZ63p5J2BUU8AqPRx1iijTZQhPcpDhQnSkNcSwlL5vVNxrxsgeOYkp17VSCoqZbq9aDUO7z41Io6CUjUFr04gmRIvc6DAHBxN_mE89p86yo2tkOXCBJQ412hT0tNzGrnU2XOFUn7Bt5jHHeo3RebwEIbF4j6oU2xaLS0Ai4ylekFEnGRR5_VNrG_ZSiiMKz-hH7da6zuOQtCKgyLdZ6KOTgg-zDprcO8bKnOq9FAnuJCq4zrFvAetRVkwHFtw2sfexfKgiTvfWt0JMb0ABIs4_uWIjXRl8H1rqdJ1v8kQwpQZiJbclWupCJzvZY907d2r3BRyMSoNNnATqbHsrDJSv5-XQLzfaYt1anKQMU5x2wZHgdPabqWqWB0VMtWiA31LDOv4UocxZJZRALz-ajxs=s0-d-e1-ft#https://iehhbhg.r.bh.d.sendibt3.com/im/8477176/ec9bdbff369bfa6eded87bb22dd8c4f320454721e5daf3e5b5ee5091a2ffc8f1.png?e=QGR4S5b5B0MCJVWb0WT5iFTqgoX-dYMgJPcoMzHmlQt69TOy8v5VWALvMQk15CrlpdHv9Talv-eYnKkvl0Wkz0t2vWuDGgxQFt5wrsFis60tx7q_2KvjUHK5azpXAvLe7cYp524V8JvFXfbPW1khQaC3MOkX5i9kabA6_6T6Ob8bge7CXHTA21Pz2WmR5XIpK8KuwV81kuP7-JpL8zU-Vj2T-4j650TgTIjSbbKgHxhPduNkoArGzG_7gIU_DuMx1Us" width="129" height="48" border="0" style="display:block;width:100%" class="CToWUd" data-bit="iit"></a></td> </tr></tbody></table></td> </tr></tbody></table></td> </tr></tbody></table></td> </tr></tbody></table></td> </tr></tbody></table></th> </tr></tbody></table></td> </tr></tbody></table></td> </tr></tbody></table></td> </tr></tbody></table>
            </body>
        </html>
    """

    text_content = "Bienvenido a ReserVAnda. Puedes comenzar a utilizar nuestro servicio de reserva online."

    message.attach(MIMEText(text_content, "plain"))
    message.attach(MIMEText(html_content, "html"))

    server = smtplib.SMTP(smtp_host, smtp_port)
    server.starttls()
    server.login(sender_email, sender_password)
    server.sendmail(sender_email, receivers_emails, message.as_string())
    print(f"Correo enviado a: {receivers_emails}")
    server.quit()
    
                

@api.route('/send-email', methods=['POST'])
def send_email():
    message  = MIMEMultipart("alternative")
    message["Subject"] = "Prueba de envío de correo - Ticket Anda 🐬🌈"
    message["From"] = "budaenpantuflas@gmail.com"
    message["To"] = ", ".join(receivers_emails)
    
    html_content = """
        <html>
            <body>
                <h1>¡Hola! 🐬🌈</h1>
                <p>Este es un correo de prueba enviado desde el API de Ticket Anda.</p>
                <p>¡Saludos!</p>
            </body>
        </html>
    """

    text = "¡Hola! 🐬🌈 Este es un correo de prueba enviado desde el API de Ticket Anda.¡Saludos!"

    message.attach(MIMEText(text, "plain"))
    message.attach(MIMEText(html_content, "html"))
    
    server = smtplib.SMTP(smtp_host, smtp_port)
    server.starttls()
    server.login(sender_email, sender_password)
    server.sendmail(sender_email, receivers_emails, message.as_string())
    server.quit()
    return jsonify({"msg": "Correo enviado exitosamente"}), 200

@api.route("/upload", methods=["POST"])
def upload_image():
    if "file" not in request.files:
        return jsonify({"msg": "No file provided"}), 400

    file = request.files["file"]
    try:
        # Subida a Cloudinary
        upload_result = cloudinary.uploader.upload(file)
        return jsonify({
            "url": upload_result["secure_url"],
            "public_id": upload_result["public_id"]
        }), 200
    except Exception as event:
        return jsonify({"msg": str(event)}), 500

#Signup endpoint
@api.route('/signup', methods=['POST'])
def signup():
    data = request.json
    doc_id = data.get('doc_id')
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    hashed_password = generate_password_hash(password)

    existing_user_by_doc = User.query.filter_by(doc_id=doc_id).first()
    if existing_user_by_doc:
        return jsonify({"msg": "Error: El documento de identidad ya está registrado. Por favor, usa otro documento o inicia sesión."}), 401
    
    existing_user_by_email = User.query.filter_by(email=email).first()
    if existing_user_by_email:
        return jsonify({"msg": "Error: El correo ya está registrado. Por favor, usa otro correo o inicia sesión."}), 400
    
    if name == None:
        name = "Unknown"

    new_user = User(doc_id=doc_id, name=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    send_singup_email([email])

    return jsonify({"message": "Usuario creado exitosamente!"}), 201

@api.route("/login", methods=["POST"])
def login():
    body = request.json
    doc_id = body.get("doc_id", None)
    password = body.get("password", None)

    user = User.query.filter_by(doc_id=doc_id).first()
    if user == None:
        return jsonify({"msg": "Bad document ID or password"}), 401

    is_valid = check_password_hash(user.password, password)

    if is_valid:
        access_token = create_access_token(identity=doc_id)
        return jsonify({"msg": "Login exitoso", "access_token": access_token}), 200
    else:
        return jsonify({"msg": "Bad document ID or password"}), 401


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@api.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user = get_jwt_identity()
    print(f"Current user from token: {current_user}")  
    user = User.query.filter_by(doc_id=current_user).first()
    if user:
        return jsonify({
            "id": user.id,
            "doc_id": user.doc_id,
            "name": user.name
        }), 200
    print("User not found in the database.")
    return jsonify({"msg": "User not found"}), 404

    #Agregar clase POST, DELETE y GET para reservas. Post en vista crear reserva, 
    # delete en el onclick del botón en "mis reservas" y Get en la vista de "mis reservas"
@api.route('/appointments', methods=['POST'])
def create_appointment():

    data = request.json
    user_id = data.get('user_id')
    datetime = data.get('datetime')
    branch = data.get('branch')
    speciality = data.get('speciality')

    if not all([user_id, datetime, branch, speciality]):
        return jsonify({"msg": "Todos los campos son requeridos"}), 400

    try:
         # Ya existe?
        existing_appointment = Appointment.query.filter_by(datetime=datetime, branch=branch).first()
        if existing_appointment:
            return jsonify({"msg": "La fecha y hora seleccionada ya están ocupadas"}), 400

        new_appointment = Appointment(user_id=user_id, datetime=datetime, branch=branch, speciality=speciality)
        db.session.add(new_appointment)
        db.session.commit()

        return jsonify(new_appointment.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500

@api.route('/appointments', methods=['GET'])
@jwt_required()
def get_appointments():
    
    current_user = get_jwt_identity()
    user = User.query.filter_by(doc_id=current_user).first()

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    appointments = Appointment.query.filter_by(user_id=user.id).all()
    return jsonify([appointment.serialize() for appointment in appointments]), 200

@api.route('/appointments/<int:appointment_id>', methods=['DELETE'])
@jwt_required()
def delete_appointment(appointment_id):
 
    try:
        appointment = Appointment.query.get(appointment_id)
        if not appointment:
            return jsonify({"msg": "Reserva no encontrada"}), 404

        db.session.delete(appointment)
        db.session.commit()
        return jsonify({"msg": "Reserva eliminada exitosamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": str(e)}), 500
