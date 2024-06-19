"use strict";

/**
 * course controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::course.course", ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.db.query("api::course.course").findOne({
      where: { slug: id },
      populate: {
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
      },
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
