from app.models import db, User, environment, SCHEMA

users = [
    {
        "full_name": "Demo User",
        "email": "demo_user@email.com",
        "password": "demouserpw"
    },
    {
        "full_name": "Daniel Wong",
        "email": "daniel_wong@email.com",
        "password": "danielwongpw"
    },
    {
        "full_name": "Stanley Ou",
        "email": "stanley_ou@email.com",
        "password": "stanleyoupw"
    },
    {
        "full_name": "Larry Liao",
        "email": "larry_liao@email.com",
        "password": "larryliaopw"
    },
]


# Adds a demo user, you can add other users here if you want
def seed_users():
    db.session.add_all([User(**user) for user in users])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
