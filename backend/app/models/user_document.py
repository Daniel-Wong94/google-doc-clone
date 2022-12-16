from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class User_Document(db.Model):
    __tablename__ = 'user_documents'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    document_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('documents.id')), primary_key=True)
    role = db.Column(db.Enum("Editor", "Viewer"), nullable=False, server_default="Viewer")

    user = db.relationship("User", back_populates="documents")
    document = db.relationship("Document", back_populates="users")
