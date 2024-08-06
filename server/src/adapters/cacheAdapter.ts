import {
  createClient,
  RedisClientOptions,
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from 'redis';

export class Cache {
  static instance: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

  static async connect(options: RedisClientOptions) {
    this.instance = await createClient(options).on('error', err => console.log('Redis Client Error', err)).connect();
  }

  static async set<T>(key: string, data: T): Promise<string | null> {
    return this.instance.set(key, JSON.stringify(data));
  }

  static async get(key: string): Promise<string | null> {
    return this.instance.get(key);
  }

  static async remove(key: string): Promise<number> {
    return this.instance.del(key);
  }
}