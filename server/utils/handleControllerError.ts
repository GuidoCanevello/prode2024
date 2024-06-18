/**
 * Handles errors generated by controllers
 * 
 * @param event The event generated by the Event Handler
 * @param error The error
 * @returns The error message, if any
 */
export default function (error: any) {
    throw createError({
        statusCode: error.number ?? 500,
        statusMessage: error.content != undefined ? error.content : error
    });
}