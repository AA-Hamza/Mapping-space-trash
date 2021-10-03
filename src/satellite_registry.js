import { parseStationsFromFile } from "./satellite_util";

export const debris = [
    ...parseStationsFromFile('https://celestrak.com/NORAD/elements/stations.txt'),
    ...parseStationsFromFile('https://celestrak.com/NORAD/elements/supplemental/starlink.txt')
];