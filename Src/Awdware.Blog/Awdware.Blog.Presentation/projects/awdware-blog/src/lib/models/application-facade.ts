export class BlogPostDetailsDto {
  public postType: BlogPostType;
  public id: string;
  public title: string;
  public content: string;
  public locale: string;
  public translations: Array<BlogPostTranslationDto>;
  public dateTime: string;
}

export class BlogPostDto {
  public postType: BlogPostType;
  public id: string;
  public title: string;
  public preview: string;
  public locale: string;
  public translations: Array<BlogPostTranslationDto>;
  public dateTime: string;
}

export class BlogPostTranslationDto {
  public key: string;
  public value: string;
}

export enum BlogPostType {
  UNKNOWN = 0,
  PREVIEW = 1,
  DETAILS = 2
}
