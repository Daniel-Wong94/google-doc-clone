from flask import Blueprint, request, redirect, url_for, jsonify
from flask_login import login_required, current_user
from app.models import Document, User_Document, User, db, Comment
from app.forms import CommentForm
from sqlalchemy import or_
from app.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
@login_required
def comments(document_id):
  comments = Comment.query.filter_by(document_id=document_id).all();

  return {"Comments": [comment.to_dict() for comment in comments]}


@comment_routes.route('/', methods=["POST"])
@login_required
def add_comment(document_id):
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    comment = form.data['comment']
    text = form.data['text']
    row_number = form.data['row_number']
    line_number = form.data['line_number']

    new_comment = Comment(comment=comment, text=text, row_number=row_number, line_number=line_number, user_id=current_user.id, document_id=document_id)
    db.session.add(new_comment)
    db.session.commit()

    return {"Comment": new_comment.to_dict()}
  return {"errors": validation_errors_to_error_messages(form.errors)}, 401
