module.exports = {
  defaultEngine: "nano-banana",

  engines: {
    "nano-banana": {
      enabled: true,
      priority: 1,

      provider: "nano",

      model:
        process.env.NANO_MODEL ||
        "gemini-3-pro-image",
    },

    imagen: {
      enabled: false,
      priority: 2,

      provider: "imagen",
    },

    "gemini-flash-image": {
      enabled: false,
      priority: 3,

      provider: "gemini",

      model:
        process.env.GEMINI_IMAGE_MODEL ||
        "gemini-3.1-flash-image",
    },

    flux: {
      enabled: false,
      priority: 4,

      provider: "flux",
    },
  },
};