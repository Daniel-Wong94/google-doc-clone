from app.models import db, Document, environment, SCHEMA

documents = [
    {
        "name": "Google Doc Clone",
        "text": '<h1 class="ql-align-center"><span style="color: rgb(0, 71, 178);">G</span><span style="color: rgb(230, 0, 0);">o</span><span style="color: rgb(255, 255, 0);">o</span><span style="color: rgb(0, 102, 204);">g</span><span style="color: rgb(0, 138, 0);">l</span><span style="color: rgb(230, 0, 0);">e</span> Docs Clone</h1><p class="ql-align-center">by Daniel Wong</p><p class="ql-align-center"><br></p><p><br></p><h2>Goal: </h2><p class="ql-align-justify">    The goal of this Google Doc clone project is to explore the use of different libraries, frameworks and technologies with a specific focus on Material-UI (MUI) for the UI design, Socket.io for real-time communication, and React-Quill for the rich text editor functionality. The aim of the project is to gain experience and understanding on how to build a functional, feature-rich and visually pleasing web-based document editing platform. The project will involve the implementation of a collaborative text editor that allows multiple users to edit a document simultaneously. By using libraries such as Material-UI, Socket.io and React-Quill, the project will provide an opportunity to learn about best practices and advanced features that can be used to build a modern, responsive and collaborative web application. The final outcome should be a user-friendly platform that provides a seamless experience for real-time document collaboration.</p><p><br></p><h2>Technologies:</h2><ul><li>Frontend: NodeJS, React, Redux, Google MUI, React Quill, socket.io-client</li><li>Backend: Flask, flask-socket.io, flask-sqlalchemy</li></ul><p><br></p><h2>Features:</h2><ul><li>Users can create and share their document with other users. </li><li>Documents can be simultaneously edited or viewed by multiple users, with real-time updates.</li><li>Users in a document can send live messages for improved communication and collaboration.</li><li>Comments can be made by users for selected texts of the document.</li></ul><p><br></p><h2>Challenges:</h2><ul><li>Keeping the document in sync with all users in the room and users that enter the room.</li><li>Making the React Quill library look consistent with Google MUI.</li></ul><p><br></p><h2>Timeline (by weeks):</h2><ol><li>During the first week of the project, I spent a significant amount of time brainstorming ideas for the project. I knew that I wanted to do something different and not clone another social media site, e-commerce platform, or tracking app. Instead, I wanted to explore the use of various libraries and technologies, specifically focusing on the use of socket.io. I wanted to gain experience and understanding on how to build a real-time collaborative platform. This helped me in defining the scope of my project, and to come up with the idea of building a Google Doc clone.</li><li>During the second week of the project, I researched libraries and technologies to build a Google Doc clone, choosing Material-UI (MUI) for the UI design since it was owned by Google and React-Quill for the rich text editor. I established my MVP features, database schema, and backend API. I also extensively tested my implementation to ensure that the real-time collaboration feature and other functionality worked properly.</li><li>During the first half of week three, I finished the backend using Python Flask. The second half of the week, I created the Redux store and its thunks to manage the application\'s state and handle actions.</li><li>The last week was spent cloning google doc\'s UI and hosting on render.com. This took the most time due to the large documentation, but also saved me a lot of time styling all my components.</li></ol>',
        "owner_id": 2
    },
    {
        "name": "My Resume",
        "text": '<h1>Daniel Wong</h1><p><br></p><p class="ql-align-justify"><strong>Contact</strong>: </p><p class="ql-align-justify">- Location: Queens, NY 11103</p><p>- Phone number: (123)456-7890</p><p>- Email: daniel.kachun.wong@gmail.com</p><p>- LinkedIn: linkedin.com/in/daniel-kachun-wong</p><p><br></p><h3><strong>Summary</strong></h3><p>A highly experienced MRI specialist with 6+ years of experience in the medical field looking to transition into a software engineering role. Proven ability to learn quickly and adapt to new technologies. Strong problem-solving and analytical skills. Seeking an entry-level software engineering position to utilize my technical skills, attention to detail, and ability to work in a team environment. </p><p><br></p><p><strong>Education</strong></p><p>- Completion of a 1-Year Part-Time, Fullstack Software Engineering Bootcamp, App Academy (2022-2023)</p><p>- Radiologic Technologist Post Baccalaureate Program, Stony Brook University (2016-2017)</p><p>- Bachelor of Science degree in Health Science, Stony Brook University (2013-2016)</p><p><br></p><p><strong>Work Experience</strong></p><p><br></p><p>Senior MRI Specialist, NYU Langone School of Medicine (2017- Present)</p><p>- <span style="background-color: transparent;">Mentor trainees in MRI protocols and physics and determine technical competency</span></p><p>- <span style="background-color: transparent; color: rgb(0, 0, 0);">Coordinate with Radiologists to create educational newsletters and in-service presentations.</span></p><p><br></p><p><strong>Projects</strong></p><p>- Google Docs Clone (Feb. 2023): </p><p>- Instagram Clone (Dec. 2022):</p><p>- Meetup Clone (Oct. 2022):</p><p><br></p><p><strong>Skills</strong></p><p>- Specialized in languages Javascript and Python</p><p>- Experience with frameworks such as React, Flask, and Express</p><p>- Proficient in frontend technologies such as HTML, CSS, and JavaScript</p><p>- Experience with databases, including MySQL and Flask SQLAlchemy</p><p>- Strong understanding of software development best practices, including Agile and Scrum</p><p><br></p>',
        # "thumbnail": "/static/media/ResumeScreenshot.png",
        "owner_id": 2
    },
    {
        "name": "Science Essay",
        "text": '<p><strong style="background-color: transparent; color: rgb(0, 0, 0);">BIOLOGY</strong><span style="background-color: transparent; color: rgb(0, 0, 0);"> PERIOD 1&nbsp;</span></p><p><span style="background-color: transparent; color: rgb(0, 0, 0);">MS. WENDY WRITER</span></p><p><br></p><p><strong style="background-color: transparent; color: rgb(0, 167, 151);">CELLS</strong></p><p><strong style="background-color: transparent; color: rgb(0, 0, 0);">BASIC UNITS OF LIFE</strong></p><p><strong style="background-color: transparent; color: rgb(0, 0, 0);">___</strong></p><p><br></p><p><strong style="background-color: transparent; color: rgb(0, 0, 0);">By Your Name</strong></p><p class="ql-align-center"><img src="https://www.starhealth.in/blog/wp-content/uploads/2022/02/WHITE-BLOOD-CELLS.jpg" alt="A normal WBC (White Blood Cell) count - Star Health"></p><h1><strong style="background-color: transparent; color: rgb(0, 0, 0);">INTRODUCTION</strong></h1><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</span></p><p><br></p><h2><strong style="background-color: transparent; color: rgb(0, 0, 0);">Cell Structure</strong></h2><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.</span></p><p><br></p><h2><strong style="background-color: transparent; color: rgb(0, 0, 0);">Cell Anatomy</strong></h2><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.</span></p><h3><strong style="background-color: transparent; color: rgb(1, 133, 123);">Lorem ipsum</strong></h3><p><br></p><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</span></p><h3><strong style="background-color: transparent; color: rgb(1, 133, 123);">Dolor sit amet</strong></h3><p><br></p><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.</span></p><h2><strong style="background-color: transparent; color: rgb(0, 0, 0);">Cell Structure</strong></h2><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.</span></p><h3><strong style="background-color: transparent; color: rgb(1, 133, 123);">Lorem ipsum&nbsp;</strong></h3><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.&nbsp;</span></p>',
        "owner_id": 1
    },
    {
        "name": "Document 4",
        "text": "Testing text of document 4",
        "owner_id": 3
    },
    {
        "name": "Document 5",
        "text": "Testing text of document 5",
        "owner_id": 5
    },
    {
        "name": "Blank Document",
        "text": "Testing text of document 6",
        "owner_id": 6
    },
    {
        "name": "Playground Document",
        "text": "",
        "owner_id": 1
    }
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
