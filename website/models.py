from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from website import db

Base = declarative_base()
db.Model.metadata.reflect(db.engine)
Base.metadata.reflect(db.engine)

class Objects(db.Model):
	__table__ = Base.metadata.tables['objects']
