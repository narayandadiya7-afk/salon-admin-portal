import { TScreen } from "../types/config";
const REACT_APP_API_BASEURL = import.meta.env.REACT_APP_API_BASEURL ?? "/";
/**
 * Screen Util
 */
export class ScreenUtil {
  /**
   * get window screen dimension
   */
  static getWindowDimension(): TScreen {
    const { innerWidth: width, innerHeight: height } = window as any;
    return {
      width,
      height,
    };
  }
  /**
   * get window screen dimension
   */
  static reload() {
    window.location.reload();
  }
  /**
   * download
   * @param path
   */
  static download(path: string) {
    window.location.href = REACT_APP_API_BASEURL + path;
  }
  static isFullScreen() {
    // return (
    //   window.innerWidth == screen.width && window.innerHeight == screen.height
    // );
  }
}
