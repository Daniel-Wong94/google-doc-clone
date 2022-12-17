from app.models import db, Document, User, Comment, environment, SCHEMA

comments = [
    {
        # id: 1
        "user_id": 1,
        "document_id": 1,
        "comment": "Demo user comments on document 1"
    },
    {
        # id: 2
        "user_id": 2,
        "document_id": 1,
        "comment": "Daniel Wong comments on document 1"
    },
    {
        # id: 3
        "user_id": 3,
        "document_id": 1,
        "comment": "Stanley Ou comments on document 1"
    },
    {
        # id: 4
        "user_id": 3,
        "document_id": 3,
        "comment": "Stanley Ou comments on document 3"
    },
    {
        # id: 5
        "user_id": 2,
        "document_id": 2,
        "comment": "Daniel Wong comments on document 2"
    },
    {
        # id: 6
        "user_id": 4,
        "document_id": 1,
        "comment": "Jeremiah Lu comments on document 1"
    },
]

def seed_comments():
    db.session.add_all([Comment(**comment) for comment in comments])
    # user = User.query.get(1)
    # db.session.delete(user)
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
