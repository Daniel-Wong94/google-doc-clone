from app.models import db, Document, environment, SCHEMA

documents = [
    {
        "name": "Document 1",
        "text": "Testing text of document 1",
        "owner_id": 1
    },
    {
        "name": "Document 2",
        "text": "Testing text of document 2",
        "owner_id": 2
    },
    {
        "name": "Document 3",
        "text": "Testing text of document 2",
        "owner_id": 3
    },
    {
        "name": "Document 4",
        "text": "Testing text of document 4",
        "owner_id": 1
    },
    {
        "name": "Document 5",
        "text": "Testing text of document 5",
        "owner_id": 5
    },
    {
        "name": "Document 6",
        "text": "Testing text of document 6",
        "owner_id": 6
    },
]

def seed_documents():
    db.session.add_all([Document(**document) for document in documents])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_documents():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM documents")

    db.session.commit()
