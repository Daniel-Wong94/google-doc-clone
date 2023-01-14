import os
from flask import Flask, render_template, request, session, redirect
from flask_socketio import SocketIO, emit, join_room, leave_room, send
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User, Message
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.document_routes import document_routes
from .seeds import seed_commands
from .config import Config

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(document_routes, url_prefix='/api/documents')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

origins = []

if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        # http/https urls of rendered application
    ]
else:
    origins = '*'

socketio = SocketIO(app, cors_allowed_origins=origins)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@socketio.on("connect")
def on_connect():
    room = request.args.get('room')
    name = request.args.get('name')
    join_room(room)
    print("JOINED ROOM", (room))
    emit('room-joined', {'message': f'{name} has joined room {room}!'}, to=room, include_self=False)

@socketio.on('disconnect')
def on_disconnect():
    print("DISCONNECTED")
    name = request.args.get('name')
    room = request.args.get('room')
    print("NAME", name, "ROOM", room)
    emit('left-room', {'message': f'{name} has left room {room}!'}, to=room, include_self=False)
    if room is not None:
        leave_room(room)
        print("LEFT ROOM")


@socketio.on("message")
def handle_message(data):
    print("message data: ", data)
    message = Message(**data)
    db.session.add(message)
    db.session.commit()
    room = str(message.document_id)
    print('new message created', message)
    emit('receive-message', message.to_dict(), to=room)


@socketio.on("comment")
def handle_comment(data):
    print("COMMENT DATA: ", data)
    room = str(data['document_id'])
    emit("receive-comment", data, to=room, include_self=False)


@socketio.on("send-changes")
def handle_changes(data):
    room = data['room']
    delta = data['delta']
    print(f'SENDING DELTA({delta}) TO ROOM {room}')
    emit('receive-changes',  delta, to=room, include_self=False)


@socketio.on("sync-document")
def sync_document(data):
    room = data['room']
    change = data['change']
    print(f'SYNC DOCUMENT WITH CHANGE OBJECT: {data}')
    emit('sync-document', change, to=room, include_self=False)

if __name__ == '__main__':
    socketio.run(app)
