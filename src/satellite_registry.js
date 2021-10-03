import { parseStationsFromFile } from "./satellite_util";

export const debris = [
    ...parseStationsFromFile('https://celestrak.com/NORAD/elements/stations.txt'),
    ...parseStationsFromFile('https://celestrak.com/NORAD/elements/supplemental/starlink.txt')
    ...parseStationsFromFile('https://celestrak.com/NORAD/elements/2019-006.txt')
    ...parseStationsFromFile('https://celestrak.com/NORAD/elements/cosmos-2251-debris.txt')
    ...parseStationsFromFile('https://celestrak.com/NORAD/elements/tle-new.txt')
];
