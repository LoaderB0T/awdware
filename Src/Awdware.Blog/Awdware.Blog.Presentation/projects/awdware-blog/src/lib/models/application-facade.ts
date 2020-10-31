export class BlogPostDetailsDto {
  public postType: BlogPostType;
  public id: string;
  public title: string;
  public content: string;
  public dateTime: string;
}

export class BlogPostDto {
  public postType: BlogPostType;
  public id: string;
  public title: string;
  public preview: string;
  public dateTime: string;
}

export enum BlogPostType {
  UNKNOWN = 0,
  PREVIEW = 1,
  DETAILS = 2
}
