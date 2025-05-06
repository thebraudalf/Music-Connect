import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import Joi from "joi";

// middleware for search validation
const searchValidation = asyncHandler((req, res, next) => {
    const schema = Joi.object({
        searchQuery: Joi.string().min(5),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        console.log("error", error);
        return res.status(400)
            .json(new ApiError(400, "Bad request: ", error))
    }

    next();
})

// middleware for songEvents validation
const songEventsValidation = asyncHandler((req, res, next) => {
    const schema = Joi.object({
        userId: Joi.string().min(1).required(),
        songId: Joi.string().min(1).required(),
        eventType: Joi.string().min(1).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        console.log("error", error);
        return res.status(400)
            .json(new ApiError(400, "Bad request: ", error))
    }

    next();
})

export { searchValidation, songEventsValidation }
