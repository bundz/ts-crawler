import { RequestManager, RequestManagerOptions } from '../request-manager';
import { ProxyManager } from '../proxy-manager';
import { BaseCrawlerOptions } from './base-crawler-options';

export abstract class BaseCrawler {
  private active: boolean = true;
  private proxyManager?: ProxyManager;
  private currentUrl: string;
  private baseUrl: string;
  private cycles: number;
  private currentCycle: number;
  private useProxy: boolean;

  abstract getData(page: string): Promise<any>;
  abstract handleData(data: any);

  constructor(options: BaseCrawlerOptions) {
    this.baseUrl = options.baseUrl;
    this.cycles = options.cycles;
    this.useProxy = options.useProxy;
  }

  get nextUrl(): string {

    if (this.currentCycle === 0) {
      this.currentUrl = this.baseUrl;
      return this.currentUrl;
    }

    if (this.currentCycle < this.cycles) {
      this.currentUrl = this.getNextUrl();
      return this.currentUrl;
    }

    return '';
  }

  private getNextUrl(): string {
    return '';
  }

  private async getPage(url: string): Promise<string> {
    const options: RequestManagerOptions = {};

    if (this.useProxy) {
      options.proxy = this.proxyManager?.proxy;
    }

    return await RequestManager.get(url, options);
  }

  private async crawl() {
    const page = await this.getPage(this.currentUrl);
    const data = await this.getData(page);
    await this.handleData(data);
  }

  public activate() {
    this.active = true;
  }

  public disactivate() {
    this.active = false;
  }

  public setProxyManager(proxyManager: ProxyManager) {
    this.proxyManager = proxyManager;
  }

  public async run() {
    this.currentCycle = 0;

    while (this.active && this.nextUrl) {
      try {
        await this.crawl();
      } catch (err) {
        console.log(err);
      } finally {
        this.currentCycle += 1;
      }
    }
  }
}

export { BaseCrawlerOptions };