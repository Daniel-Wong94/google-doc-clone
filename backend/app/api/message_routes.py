from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Message, db
from app.forms import MessageForm

message_routes = Blueprint('messages', __name__)

@message_routes.route('/')
@login_required
def messages(document_id):
  messages = Message.query.filter_by(document_id=document_id).all()

  return {"Messages" : [message.to_dict() for message in messages]}


@message_routes.route('/', methods=["POST"])
@login_required
def create_message(document_id):
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    message = form.data['message']

    new_message = Message(user_id=current_user.id, document_id=document_id, message=message)
    db.session.add(new_message)
    db.session.commit()

    return {"Message": new_message.to_dict()}
