import { LocationAttributes } from "database/models";
import { LocationItem } from "types";

export const getLocationsList = (locations: LocationAttributes[]): LocationItem[] => {
    const storages: LocationItem[] = locations.map((locations) => {
        return {
            id: locations.id,
            titulo: locations.titulo,
            descripcion: locations.descripcion
        }
    })
    return storages;
}