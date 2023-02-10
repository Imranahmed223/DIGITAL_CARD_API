const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    firstName: {
      type: String,
      trim: true,
      default: null,
    },
    lastName: {
      type: String,
      trim: true,
      default: null,
    },
    jobTitle: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    photoPath: {
      type: String,
      default: null,
    },
    coverImage: {
      type: String,
      default: null,
    },
    socialLinks: {
      facebook: {
        type: String,
        default: null,
      },
      instagram: {
        type: String,
        default: null,
      },
      linkedin: {
        type: String,
        default: null,
      },
      twitter: {
        type: String,
        default: null,
      },
      youtube: {
        type: String,
        default: null,
      },
      tiktok: {
        type: String,
        default: null,
      },
      whatsapp: {
        type: String,
        default: null,
      },
      snapchat: {
        type: String,
        default: null,
      },
      telegram: {
        type: String,
        default: null,
      },
      vimeo: {
        type: String,
        default: null,
      },
      patreon: {
        type: String,
        default: null,
      },
      viber: {
        type: String,
        default: null,
      },
      tripadvisor: {
        type: String,
        default: null,
      },
      dribble: {
        type: String,
        default: null,
      },
      skype: {
        type: String,
        default: null,
      },
    },
    story: {
      type: String,
      trime: true,
      default: "",
    },
    events: [
      {
        title: {
          type: String,
          default: "",
        },
        story: {
          type: String,
          default: "",
        },
        images: {
          type: [String],
          default: [],
        },
      },
    ],
    videos: {
      type: String,
    },
    links: [
      {
        photoPath: {
          type: String,
          default: null,
        },
        name: {
          type: String,
          default: "",
        },
        link: {
          type: String,
          default: null,
        },
      },
    ],
    contactInfo: {
      phoneNumber: {
        type: String,
        default: null,
      },
      email: {
        type: String,
        default: null,
      },
      webiste: {
        type: String,
        default: null,
      },
      location: {
        latitude: {
          type: Number,
          default: null,
        },
        longitude: {
          type: Number,
          default: null,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

profileSchema.plugin(toJSON);
profileSchema.plugin(paginate);
/**
 * @typedef Profile
 */
const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
