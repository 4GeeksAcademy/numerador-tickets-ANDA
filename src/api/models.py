from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    doc_id = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    # is_admin = db.Column(db.Boolean(), unique=False, nullable=False) 
        # Agregar más campos si quisiéramos hacer roles de usuarios y crear 
            # vistas de admin que modifique sucursales y eso.

    def __init__(self, doc_id, name, email, password):
        self.doc_id = doc_id
        self.name = name
        self.email = email
        self.password = password
        self.is_active = True

    def __repr__(self):
        return f'<User {self.doc_id}>'
    

    def serialize(self):
        return {
            "id": self.id,
            "doc_id": self.doc_id,
            "name" : self.name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)
    branch = db.Column(db.String(120), nullable=False)
    speciality = db.Column(db.String(80), nullable=False)

    user = db.relationship('User', backref=db.backref('appointment', lazy=True))
   
    def __init__(self, user_id, datetime, branch, speciality):
        self.user_id = user_id
        self.datetime = datetime
        self.branch = branch
        self.speciality = speciality

    def __repr__(self):
        return f'<Appointment {self.id}>'
    

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "datetime" : self.datetime.isoformat(),
            "branch": self.branch,
            "speciality": self.speciality,
          
        }

