import Joi from 'joi';
import { longText } from 'utils'; 

export type LocationCreate = {
    title: string;
    description: string;
};

export type LocationItem = {
    id: string;
    title: string;
    description: string;
};

export const LocationCreateSchema = Joi.object<LocationCreate>({
    title: Joi.string().required().max(longText).label("Location title"),
    description: Joi.string().required().max(longText).label("Location description")
});

