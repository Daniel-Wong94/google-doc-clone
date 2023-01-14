from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, TextAreaField
from wtforms.validators import Length
from datetime import datetime


class DocumentForm(FlaskForm):
  name = StringField('Document Name', validators=[Length(max=255, message="Max length is 255")])
  text = StringField('Document Content')
  thumbnail = StringField('Document Preview Image', default="")
  last_edited = DateTimeField('Last Edited', default=datetime.now)
