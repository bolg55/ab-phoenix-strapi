"use strict";

/**
 * `course-middleware` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = {
      coverImage: {
        fields: ["name", "url", "alternativeText", "caption"],
      },
      Section: {
        fields: ["title"],
        populate: {
          mux_assets: {
            fields: ["title", "playback_id", "aspect_ratio"],
          },
          downloads: {
            fields: ["title", "downloadUrl", "Content"],
            populate: {
              Content: {
                fields: ["name", "url"],
              },
            },
          },
        },
      },
    };

    await next();
  };
};
