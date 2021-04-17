const EXTENSION_PATTERN = /\.\w+$/;

function toWebpImageUrl(url: string) {
  return url.replace(EXTENSION_PATTERN, '.webp');
}

export class Image {

  private readonly _imageUrl: string;
  private readonly _webpImageUrl: string;

  constructor(imageUrl: string) {
    this._imageUrl = imageUrl;
    this._webpImageUrl = toWebpImageUrl(imageUrl);
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  get webpImageUrl(): string {
    return this._webpImageUrl;
  }
}
