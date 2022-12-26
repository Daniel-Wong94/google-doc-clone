from flask_wtf import FlaskForm
from flask import request
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, User_Document


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')

# def new_user(form, field):
#  HOW DO YOU ACCESS THE SINGLE RESOURCE ID FROM HERE
#     # Check if user is already part of the document
#     email = field.data
#     document_id = request.args
#     user = User.query.filter(User.email == email).first()
#     user_document = User_Document.query.filter_by(document_id=document_id, user_id=user.id).first()
#     if user_document is not None:
#         raise ValidationError('User already exists in the document')

class UserDocumentForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists])
    role = SelectField('role', choices=["Editor", "Viewer"])
