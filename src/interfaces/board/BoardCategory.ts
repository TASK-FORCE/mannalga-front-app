import { CurrentUserInfo } from '@/interfaces/club';
import { BoardCategoryType } from '@/interfaces/board/board';

export class BoardCategory {

  static readonly NOTICE = new BoardCategory(BoardCategoryType.NOTICE, '공지사항', '#ba6f01')
  static readonly NORMAL = new BoardCategory(BoardCategoryType.NORMAL, '일반', '#009688')

  private readonly _type: BoardCategoryType;
  private readonly _name: string;
  private readonly _color: string;

  constructor(type: BoardCategoryType, name: string, color: string) {
    this._type = type;
    this._name = name;
    this._color = color;
  }

  static getCategoryNames(): string[] {
    return [this.NOTICE.name, this.NOTICE.name];
  }

  static findCategoryNamesByCurrentUserInfo(currentUserInfo: CurrentUserInfo): string[] {
    if (currentUserInfo.isMaster || currentUserInfo.isManager) {
      return this.getCategoryNames();
    }
    return [this.NORMAL.name];
  }

  static findCategoryByType(type: string): BoardCategory | null {
    if (this.NOTICE.type === type) {
      return this.NOTICE;
    }

    if (this.NORMAL.type === type) {
      return this.NORMAL;
    }
    return null;
  }


  static findCategoryByName(name: string): BoardCategory {
    if (this.NOTICE.name === name) {
      return this.NOTICE;
    }

    if (this.NORMAL.name === name) {
      return this.NORMAL;
    }
    throw Error(`invalid name: ${name}`);
  }

  static findCategoryTypeByName(name: string): BoardCategoryType {
    const category = this.findCategoryByName(name);
    return category.type;
  }

  get type(): BoardCategoryType {
    return this._type;
  }

  get name(): string {
    return this._name;
  }

  get color(): string {
    return this._color;
  }
}
