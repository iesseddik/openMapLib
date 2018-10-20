import { Place } from './Place';
import { IDisplayedPlace } from './intf/ILDisplayedPlace';

export class DisplayedPlace implements IDisplayedPlace {

    constructor(public place: Place, public marker_id: number) { }
}
