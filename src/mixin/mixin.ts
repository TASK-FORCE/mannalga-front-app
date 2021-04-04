import Vue from 'vue/types/umd';
import { ComponentOptions } from 'vue/types/options';
import routerHelper from '@/router/RouterHelper';
import store from '@/store';
import clubDetailVuexService from '@/store/service/ClubDetailVuexService';
import { PATH } from '@/router/route_path_type';

const mixin: ComponentOptions<Vue> = {
  async mounted() {
    if (routerHelper.clubSeq()) {
      if (store.state.club.currentUserInfo.userSeq === 0) {
        clubDetailVuexService.dispatch(routerHelper.clubSeq(), false, PATH.CLUB_LIST);
      }
    }
  }
};

export { mixin }
