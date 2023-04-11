import Joi from 'joi';
import { longText } from 'utils'; 

export type LocationCreate = {
    id: number;
    titulo: string;
    descripcion: string;
};

export type LocationItem = {
    id: number;
    titulo: string;
    descripcion: string;
};

export const LocationCreateSchema = Joi.object<LocationCreate>({
    titulo: Joi.string().optional().max(longText).label("Location title"),
    descripcion: Joi.string().optional().max(longText).label("Location description")
});

