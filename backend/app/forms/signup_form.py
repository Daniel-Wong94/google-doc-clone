from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Length, Email, ValidationError, Regexp
from app.models import User
import random


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')



class SignUpForm(FlaskForm):
    color_choices = ['#ff4081', '#f44336', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3',
                        '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39',
                        '#ffeb3b', '#ffc107', '#ff9800', '#D35400', '#795548']
    full_name = StringField(
        'fullname', validators=[DataRequired(), Length(max=50, message ="Max length of 50"), Regexp(r'^[a-zA-Z\s\-\.]*$', message="Can only contain alphabets, hyphens, and periods.")])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists ])
    password = StringField('password', validators=[DataRequired(), Regexp(r'^(?=.*[a-zA-Z\d@$!#%*?&])(?=.{8,})', message="Password should be at least 8 characters long and contain at least one letter, one number or one special character.")])
    color = SelectField('Color', choices=color_choices, default=random.choice(color_choices))
