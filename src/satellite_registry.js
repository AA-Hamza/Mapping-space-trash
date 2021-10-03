import { parseStationsFromFile } from "./satellite_util";

export const debris = [
    ...parseStationsFromFile('https://celestrak.com/NORAD/elements/stations.txt'),
    ...parseStationsFromFile('https://celestrak.com/NORAD/elements/2019-006.txt'),
    ...parseStationsFromFile('https://celestrak.com/NORAD/elements/supplemental/starlink.txt'),
    ...parseStationsFromFile('https://celestrak.com/NORAD/elements/tle-new.txt'),
    ...parseStationsFromFile('https://celestrak.com/NORAD/elements/iridium-33-debris.txt'),
    ...parseStationsFromFile('https://celestrak.com/NORAD/elements/1999-025.txt'),
    ...parseStationsFromFile('https://celestrak.com/NORAD/elements/active.txt'),
];