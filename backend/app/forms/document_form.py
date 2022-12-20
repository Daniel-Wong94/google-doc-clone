from flask_wtf import FlaskForm
from wtforms import StringField, FieldList, BooleanField, Form, FormField, TextField, DateTimeField
from wtforms.validators import DataRequired, Length, ValidationError
from datetime import datetime


class DocumentForm(FlaskForm):
  name = StringField('Document Name', validators=[Length(max=255, message="Max length is 255")])
  text = TextField('Document Content')
  thumbnail = StringField('Document Preview Image', default="")
  last_edited = DateTimeField('Last Edited', default=datetime.now)
