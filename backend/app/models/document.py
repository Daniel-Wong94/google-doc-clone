from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Document(db.Model):
    '''
    Relationships:
      Document belongs to owner
      Document many to many user
    '''

    __tablename__ = 'documents'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), default="Untitled document")
    text = db.Column(db.Text())
    thumbnail = db.Column(db.String)
    last_edited = db.Column(db.DateTime(timezone=True), server_default=func.now())
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    owner = db.relationship("User", back_populates="owned_documents")
    users = db.relationship("User_Document", back_populates="document", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="document", cascade="all, delete-orphan")
    messages = db.relationship("Message", back_populates="document", cascade="all, delete-orphan")

    def to_dict(self):
      return {
        "id": self.id,
        "name": self.id,
        "text": self.text,
        "thumbnail": self.thumbnail,
        "last_edited": self.last_edited,
        "created_at": self.created_at,
        "owner_id": self.owner_id,
        # "users": [user.to_dict() for user in self.users]
      }

    def to_dict_detail(self):
      return {
        "id": self.id,
        "name": self.id,
        "text": self.text,
        "thumbnail": self.thumbnail,
        "last_edited": self.last_edited,
        "created_at": self.created_at,
        "owner_id": self.owner_id,
        "users": [user.to_dict() for user in self.users],
        "comments": [comment.to_dict() for comment in self.comments],
        "messages": [message.to_dict() for message in self.messages]
      }
