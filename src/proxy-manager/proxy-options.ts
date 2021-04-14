export interface ProxyOptions {
  protocol: string,
  host: string,
  port: number,
  auth?: {
    username: string,
    password: string
  }
}