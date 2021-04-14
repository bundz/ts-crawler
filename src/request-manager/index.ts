import axios from 'axios';
import { RequestManagerOptions } from './request-manager-options';

export class RequestManager {
  static get defaultOptions(): RequestManagerOptions {
    const requestOptions: RequestManagerOptions = {
      headers: this.headers
    };
    return requestOptions;
  }

  static get headers() {
    return {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246'
    }
  }

  static async get(url: string, options: RequestManagerOptions): Promise<string> {
    const getOptions: RequestManagerOptions = { ...this.defaultOptions, ...options };
    const { data } = await axios.get(url, getOptions);
    return data;
  }
}

export { RequestManagerOptions };