import schedule from 'node-schedule';
import { BaseCrawler } from '../crawler';
import { CrawlerManagerOptions } from './crawler-manager-options';
import { ProxyManager } from '../proxy-manager';

export class CrawlersManager {
  private proxyManager?: ProxyManager;
  private crawlers: BaseCrawler[];
  private cron: string;
  private job: any;

  constructor(crawlers: BaseCrawler[], options?: CrawlerManagerOptions) {
    this.cron = options?.cron ?? '*/10 * * * *';
    this.proxyManager = options?.proxy;
    this.crawlers = crawlers;
    this.prepareCrawlers();
  }

  private prepareCrawlers() {
    for (const crawler of this.crawlers) {
      crawler.activate();

      if (this.proxyManager) {
        crawler.setProxyManager(this.proxyManager);
      }
    }
  }

  public start() {
    this.job = schedule.scheduleJob(this.cron, () => this.run());
  }

  public stop() {
    if (this.job) {
      this.job.cancel();
    }
  }

  private async run() {
    for (const crawler of this.crawlers) {
      await crawler.run();
    }
  }
}

export { CrawlerManagerOptions };