export interface RequestManagerOptions {
  proxy?: {
    protocol: string,
    host: string,
    port: number,
    auth?: {
      username: string,
      password: string
    }
  }

  headers?: Object,
  timeout?: number,
  auth?: {
    username: string,
    password: string
  }
}