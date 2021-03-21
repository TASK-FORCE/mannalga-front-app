import { LocalCache } from '@/utils/cache/LocalCache.ts';

export enum ClubTab {
  MAIN = 'main',
  MEETING = 'meeting',
  BOARD = 'board',
  ALBUM = 'album',
}

class LastClubTabCache {
  private cache: LocalCache<ClubTab>;

  constructor() {
    this.cache = new LocalCache<ClubTab>(1000);
  }

  get(clubSeq: number | string) {
    const value = this.cache.get(clubSeq);
    if (!value) {
      this.cache.put(clubSeq, ClubTab.MAIN);
    }
    return this.cache.get(clubSeq);
  }

  save(clubSeq: number | string, clubTab: ClubTab) {
    this.cache.put(clubSeq, clubTab);
  }
}

const lastClubTabCache = new LastClubTabCache();
export default lastClubTabCache;
