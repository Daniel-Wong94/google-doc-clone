from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import random


color_choices = ['#9c27b0', '#673ab7', '#3f51b5', '#2196f3',
            '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39',
            '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548']
class User(db.Model, UserMixin):
    '''
    Relationships:
        Users have many documents, comments, messages
    '''
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String(7), default=random.choice(color_choices))

    owned_documents = db.relationship("Document", back_populates="owner", cascade="all, delete-orphan")
    documents = db.relationship("User_Document", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    messages = db.relationship("Message", back_populates="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'color': self.color
        }
