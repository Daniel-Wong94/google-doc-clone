from app.models import db, User_Document, environment, SCHEMA, User

user_documents = [
    {
        "user_id": 4,
        "document_id": 1,
        "role": "Editor"
    },
    {
        "user_id": 4,
        "document_id": 2,
        "role": "Viewer"
    },
    {
        "user_id": 1,
        "document_id": 3,
        "role": "Editor"
    },
    {
        "user_id": 2,
        "document_id": 4,
        "role": "Viewer"
    },
    {
        "user_id": 3,
        "document_id": 1,
        "role": "Editor"
    },
]

def seed_user_documents():
    db.session.add_all([User_Document(**user_document) for user_document in user_documents])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_documents():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_documents RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM user_documents")

    db.session.commit()
