import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Place } from '../model/Place';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const places = [
            { id: 11, name: 'Sword', logo: '', localization: [48.848529, 2.370831] },
            { id: 12, name: 'Smart/Origin', logo: '', localization: [45.194302, 5.729416] },
            { id: 13, name: 'CapGemini', logo: '', localization: [48.876767, 2.346584] },
            { id: 14, name: 'WeGoto', logo: '', localization: [45.259944, 5.825618] },
            { id: 14, name: 'Magellium', logo: '', localization: [48.905079, 2.241434] }
        ];
        return { places };
    }

    // Overrides the genId method to ensure that a place always has an id.
    // If the places array is empty,
    // the method below returns the initial number (11).
    // if the places array is not empty, the method below returns the highest
    // place id + 1.
    genId(places: Place[]): number {
        return places.length > 0 ? Math.max(...places.map(place => place.id)) + 1 : 11;
    }
}
