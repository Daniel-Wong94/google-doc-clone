from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Comment(db.Model):
    '''
    Relationships:
      Comment belongs to owner
      Comment belongs to document
    '''

    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text(), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    document_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("documents.id")), nullable=False)

    user = db.relationship("User", back_populates="comments")
    document = db.relationship("Document", back_populates="comments")

    def to_dict(self):
      return {
        'id': self.id,
        'comment': self.comment,
        'user_id': self.user_id,
        'document_id': self.document_id,
        'created_at': self.created_at
      }
