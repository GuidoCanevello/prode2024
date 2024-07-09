import handleControllerError from "~/server/utils/handleControllerError";
import add_jugadores from "~/server/controllers/utils/add_jugadores";

export default defineEventHandler(async (event) => {
  try {
    await add_jugadores();
    setResponseStatus(event, 200);
  } catch (error) {
    handleControllerError(error)
  }
})