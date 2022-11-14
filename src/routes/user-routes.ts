import express from "express";
import { auth } from "../middlewares/check-auth";
import { modifyImage, upload } from "../middlewares/uplaod-image";

export const createUserRouter = (controller: UserControllerInterface) => {
  const router = express.Router();

  router.get("/all", auth, controller.getPaginatedUsers);
  router.get("/:userId", auth, controller.getUser);
  router.put("/image", auth, upload, modifyImage, controller.uploadUserImage);
  return router;
};
