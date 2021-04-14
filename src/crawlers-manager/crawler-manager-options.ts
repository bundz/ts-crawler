import { ProxyManager } from '../proxy-manager';

export interface CrawlerManagerOptions {
  cron: string,
  proxy?: ProxyManager
}