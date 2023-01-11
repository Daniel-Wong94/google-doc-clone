from app.models import db, Document, User, Comment, environment, SCHEMA

comments = [
    {
        # id: 1
        "user_id": 1,
        "document_id": 1,
        "comment": "Highlight a sentence from the document, then click into the comment box, and submit your comment!",
        "text": "How do I use this comment section?"
    },
    {
        # id: 2
        "user_id": 2,
        "document_id": 1,
        "comment": "The preview of the text that you're commenting on, will display above the comment input field.",
        "text": "Tip 1"
    },
    {
        # id: 3
        "user_id": 3,
        "document_id": 1,
        "comment": "'Row' is where the text starts and 'Line' is the character position of the first character of the text.",
        "text": "Tip 2"
    },
    {
        # id: 4
        "user_id": 3,
        "document_id": 1,
        "comment": "And here is a dummy comment",
        "text": "Here is a dummy text"
    }
]

def seed_comments():
    db.session.add_all([Comment(**comment) for comment in comments])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
