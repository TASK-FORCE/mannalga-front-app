export class DateUtils {
  static getKoreanLocalDate(localDateTime: string): string {
    const localDate = localDateTime.split(' ')[0];
    const token = localDate.split('-');

    if (token.length !== 3) {
      throw new Error(`Invalid localDateTime: ${localDateTime}`);
    }

    return `${token[0]}년 ${token[1]}월 ${token[2]}일`;
  }
}
