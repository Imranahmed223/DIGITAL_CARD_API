const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const profileValidation = require("../validations/profile.validation");
const { profileController } = require("../controllers/index");
const { fileUpload } = require("../utils/fileUpload");
const router = express.Router();

router.route("/").get(auth(), profileController.getProfile);

router.patch(
  "/edit/card",
  auth(),
  fileUpload.fields([
    {
      name: "photoPath",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  validate(profileValidation.editCard),
  profileController.editCard
);
router
  .route("/social/links")
  .get()
  .post(
    auth(),
    validate(profileValidation.addSocialLink),
    profileController.addSocialLink
  )
  .patch(
    auth(),
    validate(profileValidation.updateSocialLink),
    profileController.updateSocialLink
  )
  .delete(
    auth(),
    validate(profileValidation.deleteSocialLink),
    profileController.deleteSocialLink
  );

router.post(
  "/story/edit",
  auth(),
  validate(profileValidation.editStory),
  profileController.editStory
);
router
  .route("/events")
  .get()
  .post(
    auth(),
    fileUpload.array("images"),
    validate(profileValidation.addEvent),
    profileController.addEvents
  )
  .patch(
    auth(),
    fileUpload.array("images"),
    validate(profileValidation.updateEvent),
    profileController.updateEvents
  )
  .delete(
    auth(),
    validate(profileValidation.deleteEvent),
    profileController.deleteEvent
  );

router
  .route("/vidoes")
  .get()
  .post(auth(), fileUpload.single("vidoe"), profileController.addVideo);

router.post(
  "/videos/delete",
  auth(),
  validate(profileValidation.deleteVideo),
  profileController.deleteVideo
);

router
  .route("/links")
  .get()
  .post(
    auth(),
    fileUpload.single("photoPath"),
    validate(profileValidation.addLinks),
    profileController.addLinks
  )
  .patch(
    auth(),
    fileUpload.single("photoPath"),
    validate(profileValidation.updateLinks),
    profileController.updateLinks
  );
router.post(
  "/links/delete",
  auth(),
  validate(profileValidation.deleteLink),
  profileController.deleteLink
);
router.post(
  "/contact/update",
  auth(),
  validate(profileValidation.updateContactInfo),
  profileController.updateContactInfo
);
module.exports = router;
