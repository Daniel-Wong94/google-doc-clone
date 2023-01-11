from app.models import db, User, environment, SCHEMA

users = [
    {
        # id: 1
        "full_name": "Demo User",
        "email": "demo_user@email.com",
        "password": "demouserpw",
        "color": "#D35400"
    },
    {
        # id: 2
        "full_name": "Daniel Wong",
        "email": "daniel_wong@email.com",
        "password": "danielwongpw",
        "color": "#4caf50"
    },
    {
        # id: 3
        "full_name": "Stanley Ou",
        "email": "stanley_ou@email.com",
        "password": "stanleyoupw",
        "color": "#03a9f4"
    },
    {
        # id: 4
        "full_name": "Larry Liao",
        "email": "larry_liao@email.com",
        "password": "larryliaopw",
        "color": "#795548"
    },
    {
        # id: 5
        "full_name": "Jeremiah Lu",
        "email": "jeremiah_lu@email.com",
        "password": "jeremiahlupw",
        "color": "#673ab7"
    },
    {
        # id: 6
        "full_name": "Reyhaneh Abdollahi",
        "email": "reyhaneh_abdollahi@email.com",
        "password": "reyhanehabdollahipw",
        "color": "#03a9f4"
    },
    {
        # id: 7
        "full_name": "Michael Reyes",
        "email": "michael_reyes@email.com",
        "password": "michaelreyespw",
        "color":"#009688"
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
