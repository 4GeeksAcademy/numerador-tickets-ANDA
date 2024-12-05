"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

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
                <h1>¡Hola! 🐬🌈</h1>
                <p>Este es un correo de prueba enviado desde el API de Ticket Anda.</p>
                <p>¡Saludos!</p>
            </body>
        </html>
    """

    text_content = "¡Hola!\n🐬🌈 Este es un correo de prueba enviado desde el API de Ticket Anda.\n¡Saludos!"

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

    existing_user_by_doc = User.query.filter_by(doc_id=doc_id).first()
    if existing_user_by_doc:
        return jsonify({"msg": "Error: El documento de identidad ya está registrado. Por favor, usa otro documento o inicia sesión."}), 401
    
    existing_user_by_email = User.query.filter_by(email=email).first()
    if existing_user_by_email:
        return jsonify({"msg": "Error: El correo ya está registrado. Por favor, usa otro correo o inicia sesión."}), 400
    
    if name == None:
        name = "Unknown"

    new_user = User(doc_id=doc_id, name=name, email=email, password=password)
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

    if user.password != password:
        return jsonify({"msg": "Bad document ID or password"}), 401

    access_token = create_access_token(identity=doc_id)
    return jsonify(access_token=access_token), 201

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
            "doc_id": user.doc_id,
            "name": user.name
        }), 200
    print("User not found in the database.")
    return jsonify({"msg": "User not found"}), 404