import { LocalCache } from '@/utils/cache/LocalCache.ts';

class LastScrollPositionCache {

  private scrollYCache: LocalCache<number>;

  constructor() {
    this.scrollYCache = new LocalCache(100);
  }

  save(key: string) {
    this.scrollYCache.put(key, window.scrollY);
  }

  get(key: string): number {
    return this.scrollYCache.get(key);
  }

  init(key: string) {
    this.scrollYCache.put(key, 0);
  }
}

const lastScrollPositionCache = new LastScrollPositionCache();
export default lastScrollPositionCache;
