from app.models import db, Document, User, Message, environment, SCHEMA

messages = [
    {
        # id: 1
        "user_id": 2,
        "document_id": 1,
        "message": "This is a live chat box!"
    },
    {
        # id: 2
        "user_id": 2,
        "document_id": 3,
        "message": "Click the share button on top to add users to this document."
    },
    {
        # id: 3
        "user_id": 3,
        "document_id": 3,
        "message": "All users that enter this document will be up to date with the currently unsaved changes."
    },
    {
        # id: 4
        "user_id": 3,
        "document_id": 3,
        "message": "You can check if you're allowed to edit by clicking the Share button."
    },
    {
        # id: 5
        "user_id": 2,
        "document_id": 2,
        "message": "I figured I would just sneak my resume into here :)"
    },
    {
        # id: 6
        "user_id": 4,
        "document_id": 3,
        "message": "Try pasting an image into the document!"
    },
]

def seed_messages():
    db.session.add_all([Message(**message) for message in messages])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM messages")

    db.session.commit()
