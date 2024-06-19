import type { Schema, Attribute } from '@strapi/strapi';

export interface CourseCourseSection extends Schema.Component {
  collectionName: 'components_course_course_sections';
  info: {
    displayName: 'Course Section';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    mux_assets: Attribute.Relation<
      'course.course-section',
      'oneToMany',
      'plugin::mux-video-uploader.mux-asset'
    >;
    downloads: Attribute.Component<'course.resource', true>;
  };
}

export interface CourseResource extends Schema.Component {
  collectionName: 'components_course_resources';
  info: {
    displayName: 'Resource';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    Content: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    downloadUrl: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'course.course-section': CourseCourseSection;
      'course.resource': CourseResource;
    }
  }
}
