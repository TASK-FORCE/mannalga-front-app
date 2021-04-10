import RequestHelper from '@/store/service/helper/RequestHelper.ts';
import store from '@/store/index.ts';
import StateInitializer from '@/store/utils/StateInitializer.ts';
import { AlbumMutationTypes, BoardMutationTypes, ClubMutationTypes, MeetingMutationTypes } from '@/store/type/mutationTypes';
import { AlbumActionTypes, BoardActionTypes, ClubActionTypes, MeetingActionTypes } from '@/store/type/actionTypes';

class ClubDetailVuexService {

  private dispatching: boolean;

  constructor() {
    this.dispatching = false;
  }

  async dispatch(clubSeq: number, withLoading: boolean) {
    if (this.dispatching) {
      return;
    }
    try {
      this.dispatching = true;
      const promiseList: Promise<any>[] = [
        this.dispatchClubInfoAndUserInfo(clubSeq),
        this.dispatchClubMeetings(clubSeq),
        this.dispatchClubBoards(clubSeq),
        this.dispatchClubAlbums(clubSeq),
      ];
      await RequestHelper.dispatchAll(withLoading, promiseList);
    } finally {
      this.dispatching = false;
    }
  }

  private dispatchClubInfoAndUserInfo(clubSeq: number): Promise<any> {
    return store.dispatch(ClubActionTypes.REQUEST_CLUB_INFO_AND_USER_INFO, clubSeq);
  }

  private dispatchClubMeetings(clubSeq: number): Promise<any> {
    return store.dispatch(MeetingActionTypes.REQUEST_FIRST_MEETING_GROUP_LIST, clubSeq);
  }

  private dispatchClubBoards(clubSeq: number): Promise<any> {
    return store.dispatch(BoardActionTypes.REQUEST_FIRST_BOARD_LIST, { clubSeq });
  }

  private dispatchClubAlbums(clubSeq: number): Promise<any> {
    return store.dispatch(AlbumActionTypes.REQUEST_FIRST_ALBUM_LIST, clubSeq)
  }

  public reset(): void {
    store.commit(ClubMutationTypes.SET_CLUB_DETAIL_CONTEXT, StateInitializer.clubDetailContext());
    store.commit(MeetingMutationTypes.INIT_MEETING_GROUP_LIST);
    store.commit(AlbumMutationTypes.INIT_ALBUM_LIST);
    store.commit(BoardMutationTypes.INIT_BOARD_LIST);
  }
}

const clubDetailVuexService = new ClubDetailVuexService();
export default clubDetailVuexService;


