export enum Algorithm {
  Random = 'random',
  RoundRobin = 'round-robin'
}

export interface ProxyManagerOptions {
  rotative: boolean,
  algorithm: Algorithm
}