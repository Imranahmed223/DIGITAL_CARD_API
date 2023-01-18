const httpStatus = require("http-status");
const { User, Profile } = require("../models");
const ApiError = require("../utils/ApiError");
/**
 * Create a user
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const editCard = async (profileBody, id) => {
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "No profile found");
  }
  Object.assign(profile, profileBody);
  profile.save();
  return profile;
};

/**
 * Query for users
 * @returns {Promise<QueryResult>}
 */
const queryProfiles = async (filter, options) => {
  const profiles = await Profile.paginate(filter, options);
  return profiles;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Profile>}
 */
const getProfileByUserId = async (id) => {
  return await Profile.findOne({ user: id }).populate("user");
};

/**
 * Add Social Link
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const addSocialLink = async (profileBody, id) => {
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "No profile found");
  }
  let key = Object.keys(profileBody)[0];
  profile.socialLinks[key] = profileBody[key];
  await profile.save();
  return profile;
};

/**
 * Update Social Link
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const updateSocialLink = async (profileBody, id) => {
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "No profile found");
  }
  let key = Object.keys(profileBody)[0];
  profile.socialLinks[key] = profileBody[key];
  await profile.save();
  return profile;
};

/**
 * Delete Social Link
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const deleteSocialLink = async (profileBody, id) => {
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "No profile found");
  }
  let key = Object.keys(profileBody)[0];
  if (profile.socialLinks[key]) profile.socialLinks[key] = null;
  await profile.save();
  return profile;
};

/**
 * DEdit Story
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const editStory = async (profileBody, id) => {
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "No profile found");
  }
  Object.assign(profile, profileBody);
  await profile.save();
  return profile;
};

/**
 * Add Story
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const addEvent = async (profileBody, id) => {
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "No profile found");
  }
  const newEvent = {
    title: profileBody.title ? profileBody.title : null,
    story: profileBody.story ? profileBody.story : null,
  };
  profile.events.push(newEvent);
  await profile.save();
  return profile;
};

/**
 * Update Event Story
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const updateEvent = async (profileBody, id) => {
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "No profile found");
  }
  let index = profile.events.findIndex(
    (e) => e._id.toString() === profileBody.id.toString()
  );
  if (index !== -1) {
    profile.events[index]["title"] = profileBody.title;
    profile.events[index]["story"] = profileBody.story;
  }
  await profile.save();
  return profile;
};
/**
 * Delete Event Story
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const deleteEvent = async (profileBody, id) => {
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "No profile found");
  }
  let index = profile.events.findIndex(
    (e) => e._id.toString() === profileBody.id.toString()
  );
  if (index !== -1) profile.events.splice(index, 1);
  await profile.save();
  return profile;
};

/**
 * Delete Video
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const addVideo = async (profileBody, id) => {
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "No profile found");
  }
  console.log(profileBody);
  profile.videos.push(profileBody.photo);
  console.log(profile);
  await profile.save();
  return profile;
};

/**
 * Delete Video
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const deleteVideo = async (profileBody, id) => {
  console.log(profileBody);
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "No profile found");
  }
  if (profile.videos.length > 0) {
    let video = profileBody.video.split("/");
    video = video[video.length - 1];
    let index = profile.videos.indexOf(video);
    console.log(index);
    if (index !== -1) {
      profile.videos.splice(index, 1);
      await profile.save();
      return profile;
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, "No Videos Found");
    }
  }
  throw new ApiError(httpStatus.NOT_FOUND, "No Videos Found");
};

/**
 * Add Links
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const addLinks = async (profileBody, id) => {
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "No profile found");
  }
  profile.links.push(profileBody);
  await profile.save();
  return profile;
};

/**
 * Update Links
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const updateLinks = async (profileBody, id) => {
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "No profile found");
  }
  let index = profile.links.findIndex(
    (e) => e._id.toString() === profileBody.id.toString()
  );
  if (index !== -1) {
    Object.assign(profile.links[index], profileBody);
    await profile.save();
    return profile;
  } else throw new ApiError(httpStatus.NOT_FOUND, "Nothing found");
};

/**
 * Update Links
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const deleteLink = async (profileBody, id) => {
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "No profile found");
  }
  let index = profile.links.findIndex(
    (e) => e._id.toString() === profileBody.id.toString()
  );
  if (index !== -1) {
    profile.links.splice(index, 1);
    await profile.save();
    return profile;
  } else throw new ApiError(httpStatus.NOT_FOUND, "Nothing found");
};

/**
 * Update Contact
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const updateContactInfo = async (profileBody, id) => {
  const profile = await Profile.findOne({ user: id });
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, "No profile found");
  }
  console.log("Prof => ", profileBody);
  Object.assign(profile.contactInfo, profileBody);
  await profile.save();
  return profile;
};
module.exports = {
  editCard,
  getProfileByUserId,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
  editStory,
  addEvent,
  updateEvent,
  deleteEvent,
  addVideo,
  deleteVideo,
  addLinks,
  updateLinks,
  deleteLink,
  updateContactInfo,
};
