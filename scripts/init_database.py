from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
engine= create_engine('sqlite:///objects.db')


class Object(Base):
	__tablename__ ='objects'

	id=Column(Integer,primary_key=True)
	INTLDES = Column(String)
	NORAD_CAT_ID = Column(String)
	OBJECT_TYPE=Column(String)
	SATNAME = Column(String)
	COUNTRY =Column(String)
	LAUNCH = Column(DateTime)
	DECAY =Column(DateTime)
	SITE = Column(String)
	PERIOD=Column(Float)
	INCLINATION=Column(Float)
	APOGEE=Column(Integer)
	PERIGEE=Column(Integer)
	LAUNCH_YEAR =Column(Integer)
	LAUNCH_NUM=Column(Integer)
	LAUNCH_PIECE =Column(String(1))
	CURRENT = Column(String(1))
	OBJECT_NAME=Column(String)
	OBJECT_ID =Column(String)
	OBJECT_NUMBER =Column(Integer)
	
Base.metadata.create_all(bind=engine)


