export interface BlogPostDetailsDto {
  postType: BlogPostType;
  id: string;
  title: string;
  content: string;
  locale: string;
  translations: Array<BlogPostTranslationDto>;
  dateTime: string;
}

export interface BlogPostDto {
  postType: BlogPostType;
  id: string;
  title: string;
  preview: string;
  locale: string;
  translations: Array<BlogPostTranslationDto>;
  dateTime: string;
}

export interface BlogPostTranslationDto {
  key: string;
  value: string;
}

export enum BlogPostType {
  UNKNOWN = 0,
  PREVIEW = 1,
  DETAILS = 2
}
