from app.models import db, Document, environment, SCHEMA

documents = [
    {
        "name": "Science Essay",
        "text": '<p><strong style="background-color: transparent; color: rgb(0, 0, 0);">BIOLOGY</strong><span style="background-color: transparent; color: rgb(0, 0, 0);"> PERIOD 1&nbsp;</span></p><p><span style="background-color: transparent; color: rgb(0, 0, 0);">MS. WENDY WRITER</span></p><p><br></p><p><strong style="background-color: transparent; color: rgb(0, 167, 151);">CELLS</strong></p><p><strong style="background-color: transparent; color: rgb(0, 0, 0);">BASIC UNITS OF LIFE</strong></p><p><strong style="background-color: transparent; color: rgb(0, 0, 0);">___</strong></p><p><br></p><p><strong style="background-color: transparent; color: rgb(0, 0, 0);">By Your Name</strong></p><p class="ql-align-center"><img src="https://www.starhealth.in/blog/wp-content/uploads/2022/02/WHITE-BLOOD-CELLS.jpg" alt="A normal WBC (White Blood Cell) count - Star Health"></p><h1><strong style="background-color: transparent; color: rgb(0, 0, 0);">INTRODUCTION</strong></h1><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</span></p><p><br></p><h2><strong style="background-color: transparent; color: rgb(0, 0, 0);">Cell Structure</strong></h2><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.</span></p><p><br></p><h2><strong style="background-color: transparent; color: rgb(0, 0, 0);">Cell Anatomy</strong></h2><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.</span></p><h3><strong style="background-color: transparent; color: rgb(1, 133, 123);">Lorem ipsum</strong></h3><p><br></p><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</span></p><h3><strong style="background-color: transparent; color: rgb(1, 133, 123);">Dolor sit amet</strong></h3><p><br></p><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</span></p><h2><strong style="background-color: transparent; color: rgb(0, 0, 0);">Cell Structure</strong></h2><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.</span></p><h3><strong style="background-color: transparent; color: rgb(1, 133, 123);">Lorem ipsum&nbsp;</strong></h3><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.&nbsp;</span></p>',
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
