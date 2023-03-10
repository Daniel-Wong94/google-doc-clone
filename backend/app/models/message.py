from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Message(db.Model):
    '''
    Relationships:
      Message belongs to owner
      Message belongs to document
    '''

    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text(), nullable=False)
    sent_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    document_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("documents.id")), nullable=False)

    user = db.relationship("User", back_populates="messages")
    document = db.relationship("Document", back_populates="messages")

    def to_dict(self):
      return {
        'id': self.id,
        'message': self.message,
        'user_id': self.user_id,
        'document_id': self.document_id,
        'sent_at': self.sent_at.strftime('%-d %b, %Y %-I:%M %p'),
        'user': self.user.to_dict()
      }
