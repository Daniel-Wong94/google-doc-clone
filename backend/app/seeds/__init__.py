from flask.cli import AppGroup
from .users import seed_users, undo_users
from .documents import seed_documents, undo_documents
from .user_documents import seed_user_documents, undo_user_documents
from .comments import seed_comments, undo_comments
from .messages import seed_messages, undo_messages

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
    seed_users()
    seed_documents()
    seed_user_documents()
    seed_comments()
    seed_messages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_documents()
    undo_user_documents()
    undo_comments()
    undo_messages()
    # Add other undo functions here
