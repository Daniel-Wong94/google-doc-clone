from .db import db, environment, SCHEMA, add_prefix_for_prod
from . import User
from sqlalchemy import func

class User_Document(db.Model):
    __tablename__ = 'user_documents'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    document_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('documents.id')), primary_key=True)
    role = db.Column(db.Enum("Editor", "Viewer", name="role"), nullable=False, server_default="Viewer")

    user = db.relationship("User", back_populates="documents")
    document = db.relationship("Document", back_populates="users")

    def to_dict(self):
      return {
        'user_id': self.user_id,
        'document_id': self.document_id,
        'role': self.role,
        # 'user': self.user.to_dict(),
        'user': User.query.get(self.user_id).to_dict()
      }
