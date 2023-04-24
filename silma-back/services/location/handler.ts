import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { LocationAttributes } from "database/models";
import { connectToDatabase } from "database/sequelize";
import { SilmaAPIFunction, silmaAPIhandler } from "lib/handler/handler";
import { getLocationsList } from "logic/location";
import { LocationCreate, LocationCreateSchema } from "types";
import { badRequest } from "utils";

const createLocationFunction: SilmaAPIFunction = async (
    event: APIGatewayEvent
) => {
    const data: LocationCreate = JSON.parse(event.body);
    const { error } = LocationCreateSchema.validate(data);
    if (error) {
        throw badRequest("Wrong data format");
    }
    
    const locationDB: LocationAttributes = {
        title: data.title,
        description: data.description,
        createdAt: new Date(),
        deletedAt: null
    };

    const db = await connectToDatabase();
    const { Location } = db;
    const newLocation = await Location.create(locationDB);

    return { data: newLocation }; 
};

export const createLocation: APIGatewayProxyHandler = silmaAPIhandler(
    createLocationFunction
);

const getLocationFunction: SilmaAPIFunction = async () => {
    const db = await connectToDatabase();
    const { Location } = db;

    const rawLocations = await Location.findAll({
        attributes: ["id", "title", "description"],
        where: { deletedAt: null }
    });

    const locations = rawLocations.map( (rawLocation) => 
        rawLocation.get({ plain: true })
    );

    const locationList = getLocationsList(locations);
    
    return {data: locationList}
};

export const getLocation: APIGatewayProxyHandler = silmaAPIhandler (
    getLocationFunction
);