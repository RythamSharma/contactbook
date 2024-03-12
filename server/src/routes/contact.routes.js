import { Router } from "express";
import {
  createContact,
  getallcontacts,
  editcontact,
  searchcontact,
  softdeletecontact,
} from "../controllers/contact.controller.js";
import authmiddleware from "../middlewares/auth.middleware.js";
const router = Router();

router.use(authmiddleware);
router.route("/getcontacts").get(getallcontacts);
router.route("/deletecontact/:contactId").delete(softdeletecontact);
router.route("/querycontacts").get(searchcontact);
router.route("/create").post(createContact);
router.route("/edit/:contactId").patch(editcontact);

export default router;
