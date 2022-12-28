from flask import Blueprint, request, redirect, url_for, jsonify
from flask_login import login_required, current_user
from app.models import Document, User_Document, User, db
from app.forms import DocumentForm, UserDocumentForm, UpdateUserDocumentForm
from sqlalchemy import or_
from app.api.auth_routes import validation_errors_to_error_messages

document_routes = Blueprint('documents', __name__)

def authorized_user(cb):
  '''
    Check if current user either:
      - Owner of document
      - Part of document's users
  '''
  def wrapper(*args, **kwargs):
    document_id = kwargs.get("document_id")
    document = Document.query.get_or_404(document_id)
    users = list(map(lambda x: x.user_id, document.users))

    if document.owner_id == current_user.id or current_user.id in users:
      return cb(document)
    else:
      return redirect(url_for("auth.unauthorized"))
  wrapper.__name__ = cb.__name__
  return wrapper


def authorized_editor(cb):
  '''
    Check if current user either:
      - Owner of document
      - User's role is 'Editor'
  '''
  def wrapper(*args, **kwargs):
    document_id = kwargs.get("document_id")
    document = Document.query.get_or_404(document_id)
    role = User_Document.query.filter_by(user_id=current_user.id, document_id=document_id, role="Editor").first()

    if document.owner_id == current_user.id or role is not None:
      return cb(document)
    else:
      return redirect(url_for("auth.unauthorized"))
  wrapper.__name__ = cb.__name__
  return wrapper


@document_routes.route('/')
@login_required
def documents():
  '''
    Query for documents based on search params and
    returns a list of document dictionaries
  '''
  # documents = Document.query\
  #             .join(User_Document, Document.id == User_Document.document_id)\
  #             .filter(or_(User_Document.user_id == current_user.id,
  #                     Document.owner_id == current_user.id))\
  #             .all()

  owned_by = request.args.get('owned_by')
  query = Document.query.outerjoin(User_Document, Document.id == User_Document.document_id)

  if owned_by == "me":
    query = query.filter(Document.owner_id == current_user.id)
  elif owned_by == "not_me":
    query = query.filter(User_Document.user_id == current_user.id)
  else:
    query = query.filter(or_(User_Document.user_id == current_user.id,
                      Document.owner_id == current_user.id))

  documents = query.all()

  return {"Documents": [document.to_dict() for document in documents]}


@document_routes.route('/<int:document_id>')
@login_required
@authorized_user
def document_detail(document):
  '''
    Query for a document and return it as a dictionary

    Current user must be either an owner or part of the document's users
  '''

  return {"Document" : document.to_dict_detail()}


@document_routes.route('/', methods=["POST"])
@login_required
def create_document():
  '''
    Creates a document

    User does not have to send a form
  '''

  document = Document(owner_id = current_user.id)
  db.session.add(document)
  db.session.commit()
  return{"Document": document.to_dict()}


@document_routes.route('/<int:document_id>', methods=["PUT"])
@login_required
@authorized_editor
def edit_document(document):
  form = DocumentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    for key, val in form.data.items():
      if val is not None or False:
        setattr(document, key, val)
    db.session.commit()
    return document.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@document_routes.route('/<int:document_id>', methods=["DELETE"])
@login_required
def delete_document(document_id):
  document = Document.query.get_or_404(document_id)

  if document.owner_id == current_user.id:
    db.session.delete(document)
    db.session.commit()
    return jsonify({"message": "Succesfully deleted document"})
  return redirect("../auth/unauthorized")


@document_routes.route('/<int:document_id>/users')
@login_required
def user_documents(document_id):
  document = Document.query.get_or_404(document_id)
  user_document = User_Document.query.filter_by(document_id=document.id).all()

  return {"Users": [user.to_dict() for user in user_document]}


@document_routes.route('/<int:document_id>/users', methods=["POST"])
@login_required
def add_user(document_id):
  document = Document.query.get_or_404(document_id);

  if document.owner_id == current_user.id:
    form = UserDocumentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
      user = User.query.filter_by(email=form.data['email']).first()
      user_document = User_Document(document_id=document.id, user_id=user.id, role=form.data['role'])
      db.session.add(user_document)
      db.session.commit()
      return user_document.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

  return {'errors': "Only the owner can add users to document"}, 403


@document_routes.route('/<int:document_id>/users/<int:user_id>', methods=["PUT"])
@login_required
def update_user(document_id, user_id):
  document = Document.query.get_or_404(document_id);

  form = UpdateUserDocumentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    if document.owner_id == current_user.id:
      user_documents = User_Document.query.filter_by(document_id=document_id, user_id=user_id).first()
      user_documents.role = form.data['role'];
      db.session.commit();
      return user_documents.to_dict();

    return {'errors': "Only the owner can add users to document"}, 403
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@document_routes.route('/<int:document_id>/users/<int:user_id>', methods=["DELETE"])
@login_required
def remove_user(document_id, user_id):
  document = Document.query.get_or_404(document_id)

  if document.owner_id == current_user.id or current_user.id == user_id:
    user_document = User_Document.query.filter_by(document_id=document_id, user_id=user_id).first_or_404()
    db.session.delete(user_document)
    db.session.commit()
    return {"message": "Succesfully removed user from document"}
  return {"errors": "Only the owner can remove users from a document"}, 403
