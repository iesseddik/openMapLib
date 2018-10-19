export interface Config {
    type: string;
    geometry: { type: string, coordinates:[number, number] };
    properties: {name:string};
}