const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const getProfile = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const editCard = {
  body: Joi.object().keys({
    firstName: Joi.string().allow(null, "").optional(),
    lastName: Joi.string().allow(null, "").optional(),
    jobTitle: Joi.string().allow(null, "").optional(),
    company: Joi.string().allow(null, "").optional(),
  }),
};

const addSocialLink = {
  body: Joi.object()
    .keys({
      facebook: Joi.string().allow(null, "").optional(),
      instagram: Joi.string().allow(null, "").optional(),
      linkedin: Joi.string().allow(null, "").optional(),
      twitter: Joi.string().allow(null, "").optional(),
      youtube: Joi.string().allow(null, "").optional(),
      tiktok: Joi.string().allow(null, "").optional(),
      whatsapp: Joi.string().allow(null, "").optional(),
      snapchat: Joi.string().allow(null, "").optional(),
      telegram: Joi.string().allow(null, "").optional(),
      vimeo: Joi.string().allow(null, "").optional(),
      patreon: Joi.string().allow(null, "").optional(),
      viber: Joi.string().allow(null, "").optional(),
      tripadvisor: Joi.string().allow(null, "").optional(),
      dribble: Joi.string().allow(null, "").optional(),
      skype: Joi.string().allow(null, "").optional(),
    })
    .min(1)
    .max(1),
};
const updateSocialLink = {
  body: Joi.object()
    .keys({
      facebook: Joi.string().allow(null, "").optional(),
      instagram: Joi.string().allow(null, "").optional(),
      linkedin: Joi.string().allow(null, "").optional(),
      twitter: Joi.string().allow(null, "").optional(),
      youtube: Joi.string().allow(null, "").optional(),
      tiktok: Joi.string().allow(null, "").optional(),
      whatsapp: Joi.string().allow(null, "").optional(),
      snapchat: Joi.string().allow(null, "").optional(),
      telegram: Joi.string().allow(null, "").optional(),
      vimeo: Joi.string().allow(null, "").optional(),
      patreon: Joi.string().allow(null, "").optional(),
      viber: Joi.string().allow(null, "").optional(),
      tripadvisor: Joi.string().allow(null, "").optional(),
      dribble: Joi.string().allow(null, "").optional(),
      skype: Joi.string().allow(null, "").optional(),
    })
    .min(1)
    .max(1),
};

const deleteSocialLink = {
  body: Joi.object()
    .keys({
      facebook: Joi.string().allow(null, "").optional(),
      instagram: Joi.string().allow(null, "").optional(),
      linkedin: Joi.string().allow(null, "").optional(),
      twitter: Joi.string().allow(null, "").optional(),
      youtube: Joi.string().allow(null, "").optional(),
      tiktok: Joi.string().allow(null, "").optional(),
      whatsapp: Joi.string().allow(null, "").optional(),
      snapchat: Joi.string().allow(null, "").optional(),
      telegram: Joi.string().allow(null, "").optional(),
      vimeo: Joi.string().allow(null, "").optional(),
      patreon: Joi.string().allow(null, "").optional(),
      viber: Joi.string().allow(null, "").optional(),
      tripadvisor: Joi.string().allow(null, "").optional(),
      dribble: Joi.string().allow(null, "").optional(),
      skype: Joi.string().allow(null, "").optional(),
    })
    .min(1)
    .max(1),
};

const editStory = {
  body: Joi.object().keys({
    story: Joi.string().required(),
  }),
};

const addEvent = {
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      story: Joi.string().required(),
    })
    .min(2)
    .max(2),
};

const updateEvent = {
  body: Joi.object()
    .keys({
      id: Joi.string().custom(objectId).required(),
      title: Joi.string().optional(),
      story: Joi.string().optional(),
    })
    .min(1),
};
const deleteEvent = {
  body: Joi.object()
    .keys({
      id: Joi.string().custom(objectId).required(),
    })
    .min(1),
};

const deleteVideo = {
  body: Joi.object()
    .keys({
      video: Joi.string().required(),
    })
    .min(1),
};

const addLinks = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      link: Joi.string().required(),
    })
    .min(2)
    .max(2),
};

const updateLinks = {
  body: Joi.object()
    .keys({
      id: Joi.string().custom(objectId).required(),
      name: Joi.string().optional(),
      link: Joi.string().optional(),
      photoPath: Joi.string().optional(),
    })
    .min(1)
    .max(4),
};

const deleteLink = {
  body: Joi.object()
    .keys({
      id: Joi.string().custom(objectId).required(),
    })
    .min(1)
    .max(1),
};

const updateContactInfo = {
  body: Joi.object()
    .keys({
      phoneNumber: Joi.any().optional(),
      email: Joi.string().email().optional(),
      website: Joi.string().uri().optional(),
      location: Joi.object().keys({
        latitude: Joi.number().optional(),
        longitude: Joi.number().optional(),
      }),
    })
    .min(1)
    .max(4),
};

module.exports = {
  getProfile,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
  editCard,
  editStory,
  addEvent,
  updateEvent,
  deleteEvent,
  deleteVideo,
  addLinks,
  updateLinks,
  deleteLink,
  updateContactInfo,
};
