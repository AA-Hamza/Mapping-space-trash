import { parseStationsFromFile } from "./satellite_util";

export const debris = [
    ...parseStationsFromFile('data/starlink.txt'),
	...parseStationsFromFile('data/2019-006.txt'),
	...parseStationsFromFile('data/iridium-33-debris.txt'),
    ...parseStationsFromFile('data/1999-025.txt'),
    ...parseStationsFromFile('data/stations.txt'),
    ...parseStationsFromFile('data/tle-new.txt'),
    ...parseStationsFromFile('data/visual.txt'),
    ...parseStationsFromFile('data/active.txt'),
    ...parseStationsFromFile('data/analyst.txt'),
];
