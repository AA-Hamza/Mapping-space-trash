from init_database import engine,Object
from sqlalchemy.orm import Session
from requests.auth import HTTPBasicAuth
from datetime import datetime
import requests,json


# URL = 'https://www.space-track.org/basicspacedata/query/class/decay/orderby/NORAD_CAT_ID%20asc/emptyresult/show'
# resp = requests.get(url = URL)
# data=resp.json()

with open('data.json') as file:
	data = json.load(file) 	#read the data
	with Session(engine) as session:     #initialize session
		for row in data:
			for key,value in row.copy().items():
				if key in ['COMMENT','COMMENTCODE','RCSVALUE','RCS_SIZE','FILE']: #delete unnecessary data
					row.pop(key)
				elif key in ['DECAY','LAUNCH']:    #convert strings to datetime to be stored in the database
					if value:
						row[key] =datetime.strptime(value,'%Y-%m-%d')
			object = Object(**row)
			session.add(object)
		session.commit()
