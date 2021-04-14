import { ProxyOptions } from './proxy-options';
import { ProxyManagerOptions, Algorithm } from './proxy-manager-options';

export class ProxyManager {
  private proxies: ProxyOptions[];
  private algorithm: Algorithm;
  private rotative: boolean;

  constructor(proxies: ProxyOptions[], options?: ProxyManagerOptions) {
    this.proxies = proxies;
    this.algorithm = options?.algorithm ?? Algorithm.RoundRobin;
    this.rotative = options?.rotative ?? true;
  }

  get proxy(): ProxyOptions {
    return this[`nextProxyBy${this.algorithm}`];
  }

  get nextProxyByRoundRobin(): ProxyOptions {
    const current: ProxyOptions = this.proxies.shift() as ProxyOptions;
    this.proxies.push(current);
    return current;
  }

  get nextProxyByRandom(): ProxyOptions {
    const number = Math.floor(Math.random() * this.proxies.length);
    return this.proxies[number];
  }
}

export { ProxyManagerOptions, ProxyOptions };