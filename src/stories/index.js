// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/vue';
import RootRegionTag from '../components/region/RootRegionTag.vue';

storiesOf('RootRegionTag', module)
  .add('root region tag list',
    () => ({
      components: { RootRegionTag },
      data() {
        return {
          rootRegionNames: [
            '서울특별시',
            '부산광역시',
            '대구광역시',
            '인천광역시',
            '광주광역시',
            '대전광역시',
            '울산광역시',
            '세종특별자치시',
            '경기도',
            '강원도',
            '충청북도',
            '충청남도',
            '전라북도',
            '전라남도',
            '경상북도',
            '경상남도',
            '제주특별자치도',
          ],
        };
      },
      template: `
        <div>
        <div
          v-for="name in rootRegionNames"
          style="margin: 10px"
        >
          <RootRegionTag
            :rootRegionName="name"
            :key="name"
          />
        </div>
        </div>
      `,
    }));
