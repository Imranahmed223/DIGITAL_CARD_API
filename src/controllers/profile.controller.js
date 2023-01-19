const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { profileService } = require("../services");
const config = require("../config/config");

const getProfile = catchAsync(async (req, res) => {
  const { user } = req;
  const profile = await profileService.getProfileByUserId(user.id);
  for (var i = 0; i < profile.videos.length; i++) {
    profile.videos[i] = config.rootPath + profile.videos[i];
  }
  for (var i = 0; i < profile.links.length; i++) {
    profile.links[i].photoPath = config.rootPath + profile.links[i].photoPath;
  }
  if (!profile) throw new ApiError(httpStatus.NOT_FOUND, "No profile found!");
  res.send(profile);
});
const editCard = catchAsync(async (req, res) => {
  let body = req.body;
  const { user } = req;
  const profile = await profileService.editCard(body, user.id);
  res.status(httpStatus.CREATED).send(profile);
});

const addSocialLink = catchAsync(async (req, res) => {
  let body = req.body;
  const { user } = req;
  const profile = await profileService.addSocialLink(body, user.id);
  res.status(httpStatus.CREATED).send(profile);
});

const updateSocialLink = catchAsync(async (req, res) => {
  let body = req.body;
  const { user } = req;
  const profile = await profileService.updateSocialLink(body, user.id);
  res.status(httpStatus.CREATED).send(profile);
});
const deleteSocialLink = catchAsync(async (req, res) => {
  let body = req.body;
  const { user } = req;
  const profile = await profileService.deleteSocialLink(body, user.id);
  res.status(httpStatus.CREATED).send(profile);
});

const editStory = catchAsync(async (req, res) => {
  let body = req.body;
  const { user } = req;
  const profile = await profileService.editStory(body, user.id);
  res.status(httpStatus.CREATED).send(profile);
});

const addEvents = catchAsync(async (req, res) => {
  let body = req.body;
  const { user } = req;
  const profile = await profileService.addEvent(body, user.id);
  res.status(httpStatus.CREATED).send(profile);
});

const updateEvents = catchAsync(async (req, res) => {
  let body = req.body;
  const { user } = req;
  const profile = await profileService.updateEvent(body, user.id);
  res.status(httpStatus.CREATED).send(profile);
});

const deleteEvent = catchAsync(async (req, res) => {
  let body = req.body;
  const { user } = req;
  const profile = await profileService.deleteEvent(body, user.id);
  res.status(httpStatus.CREATED).send(profile);
});

const addVideo = catchAsync(async (req, res) => {
  let body = req.body;
  const { user } = req;
  if (req.file) {
    body.photo = req.file.filename;
    const profile = await profileService.addVideo(body, user.id);
    for (var i = 0; i < profile.videos.length; i++) {
      profile.videos[i] = config.rootPath + profile.videos[i];
    }
    res.status(httpStatus.CREATED).send(profile);
  } else throw new ApiError(httpStatus.BAD_REQUEST, "Video is required");
});

const deleteVideo = catchAsync(async (req, res) => {
  let body = req.body;
  const { user } = req;
  const profile = await profileService.deleteVideo(body, user.id);
  for (var i = 0; i < profile.videos.length; i++) {
    profile.videos[i] = config.rootPath + profile.videos[i];
  }
  res.status(httpStatus.CREATED).send(profile);
});

const addLinks = catchAsync(async (req, res) => {
  let body = req.body;
  const { user } = req;
  if (req.file) body.photoPath = req.file.filename;
  const profile = await profileService.addLinks(body, user.id);
  for (var i = 0; i < profile.links.length; i++) {
    profile.links[i].photoPath = config.rootPath + profile.links[i].photoPath;
  }
  res.status(httpStatus.CREATED).send(profile);
});

const updateLinks = catchAsync(async (req, res) => {
  let body = req.body;
  const { user } = req;
  if (req.file) body.photoPath = req.file.filename;
  const profile = await profileService.updateLinks(body, user.id);
  for (var i = 0; i < profile.links.length; i++) {
    profile.links[i].photoPath = config.rootPath + profile.links[i].photoPath;
  }
  res.status(httpStatus.CREATED).send(profile);
});
const deleteLink = catchAsync(async (req, res) => {
  let body = req.body;
  const { user } = req;
  if (req.file) body.photoPath = req.file.filename;
  const profile = await profileService.deleteLink(body, user.id);
  for (var i = 0; i < profile.links.length; i++) {
    profile.links[i].photoPath = config.rootPath + profile.links[i].photoPath;
  }
  res.status(httpStatus.CREATED).send(profile);
});

const updateContactInfo = catchAsync(async (req, res) => {
  let body = req.body;
  const { user } = req;
  const profile = await profileService.updateContactInfo(body, user.id);
  res.status(httpStatus.CREATED).send(profile);
});

module.exports = {
  editCard,
  getProfile,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
  deleteSocialLink,
  editStory,
  addEvents,
  updateEvents,
  deleteEvent,
  addVideo,
  deleteVideo,
  addLinks,
  updateLinks,
  deleteLink,
  updateContactInfo,
};
