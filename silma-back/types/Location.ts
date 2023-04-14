import Joi from 'joi';
import { longText } from 'utils'; 

export type LocationCreate = {
    titulo: string;
    descripcion: string;
};

export type LocationItem = {
    id: number;
    titulo: string;
    descripcion: string;
};

export const LocationCreateSchema = Joi.object<LocationCreate>({
    titulo: Joi.string().required().max(longText).label("Location title"),
    descripcion: Joi.string().required().max(longText).label("Location description")
});

