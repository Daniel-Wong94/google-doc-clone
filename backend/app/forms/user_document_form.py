from flask_wtf import FlaskForm
from flask import request
from wtforms import StringField, SelectField, BooleanField
from wtforms.validators import DataRequired, ValidationError, InputRequired
from app.models import User, User_Document


def valid_user(form, field):
    # Check if user is already part of the document and if user exists
    email = field.data
    document_id = request.view_args['document_id']
    user = User.query.filter(User.email.ilike(email)).first()

    if user is None:
        raise ValidationError('Email provided not found')

    user_document = User_Document.query.filter_by(document_id=document_id, user_id=user.id).first()
    if user_document is not None:
        raise ValidationError('User already exists in the document')

class UserDocumentForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), valid_user])
    role = SelectField('role', choices=[("Editor", "Editor"), ("Viewer", "Viewer")])

class UpdateUserDocumentForm(FlaskForm):
    role = SelectField('role', choices=[("Editor", "Editor"), ("Viewer", "Viewer")])
    is_online = BooleanField('is_online', default=False)
