from init_database import engine,Object
from sqlalchemy.orm import Session
import json,datetime
from sgp4.api import Satrec,jday

with open('file.txt','r') as data:
	lines = data.readlines()
	sats = {}
	for index,line in enumerate(lines):
		if line[0] not in ['1','2']:
			line = line[:40].strip()
			sat = {
				(line+ str(index)):{
					'tle_1':lines[index+1].replace('\n',''),
					'tle_2':lines[index+2].replace('\n',''),
				}	
			}
			sats.update(sat)
	file = json.dumps(sats,indent = 3)

with Session(engine) as session:
	for key,value in sats.items():
		s =value['tle_1']
		t =value['tle_2']
		satellite = Satrec.twoline2rv(s, t)
		now =datetime.datetime.utcnow()
		jd, fr = jday(now.year,now.month,now.day,now.hour,now.second,0)
		e, r, v = satellite.sgp4(jd, fr)
		rec = {
				'name':key,
				'x':r[0],
				'y':r[1],
				'z':r[2],
				'vx':v[0],
				'vy':v[1],
				'vz':v[2]
			}
		object = Object(**rec)
		session.add(object)
	session.commit()