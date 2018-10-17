import { Place } from './Place';
import { IDisplayedPlace } from './intf/IDisplayedPlace';

export class DisplayedPlace implements IDisplayedPlace {

    constructor(public place: Place, public marker_id: number) { }
}
