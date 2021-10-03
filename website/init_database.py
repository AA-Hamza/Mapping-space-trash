from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
engine= create_engine('sqlite:///objects.db')

class Object(Base):
	__tablename__ ='objects'

	id=Column(Integer,primary_key=True)
	name = Column(String)
	x = Column(Float)
	y=Column(Float)
	z = Column(Float)
	vx =Column(Float)
	vy = Column(Float)
	vz =Column(Float)
	latitude=Column(Float)
	longitude=Column(Float)
	altitude=Column(Float)

if __name__ == "__main__":
	Base.metadata.create_all(bind=engine)
