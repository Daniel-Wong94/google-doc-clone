from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import Length, DataRequired
from datetime import datetime


class MessageForm(FlaskForm):
  message = StringField('Message', validators=[DataRequired(), Length(max=255, message = "Max length is 255")])
