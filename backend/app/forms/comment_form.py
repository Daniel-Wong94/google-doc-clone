from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import Length, DataRequired, NumberRange
from datetime import datetime


class CommentForm(FlaskForm):
  comment = StringField('Comment', validators=[DataRequired(), Length(max=255, message = "Max length is 255")])
  text = StringField('Text', validators=[DataRequired()])
  row_number = IntegerField('Row Number', validators=[NumberRange(min=-1)])
  line_number = IntegerField('Line Number', validators=[ NumberRange(min=-1)])
