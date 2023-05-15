import md5 from 'md5';

class Utils {
  public static getHash(string: string): string {
    const hash: string = md5(string);
    return hash;
  }
}