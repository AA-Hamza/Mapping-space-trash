import { parseStationsFromFile } from "./satellite_util";

export const debris = [
    ...parseStationsFromFile('data/starlink.txt'),
	...parseStationsFromFile('data/2019-006.txt'),
	...parseStationsFromFile('data/iridium-33-debris.txt'),
    ...parseStationsFromFile('data/1999-025.txt'),
    ...parseStationsFromFile('data/stations.txt'),
];
