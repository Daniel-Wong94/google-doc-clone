from flask import Blueprint
from flask_login import login_required
from app.models import Message

message_routes = Blueprint('messages', __name__)

@message_routes.route('/')
def messages(document_id):
  messages = Message.query.filter_by(document_id=document_id).all()

  return {"Messages" : [message.to_dict() for message in messages]}
