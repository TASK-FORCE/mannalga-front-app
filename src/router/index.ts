import Vue from 'vue';
import VueRouter from 'vue-router';
import { ScrollHelper } from '@/utils/scroll.ts';
import lastScrollPositionCache from '@/utils/cache/LastScrollPositionCache.ts';
import routes from './routes.js';
import { PositionResult, Route } from 'vue-router/types/router';

if (!process || process.env.NODE_ENV !== 'test') {
  Vue.use(VueRouter);
}


const scrollBehavior = (
  to: Route,
  from: Route,
): Promise<PositionResult> => {
  if (from.meta && from.meta.disableScrollBehavior) return Promise.resolve();

  lastScrollPositionCache.save(from.fullPath);

  const positionY = lastScrollPositionCache.get(to.fullPath) || 0;

  if (positionY === 0) {
    return new Promise(
      (resolve) => setTimeout(
        () => resolve(window.scrollTo({ top: 0 })), 100,
      ),
    );
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(window.scrollTo({ top: 0 }));
    }, 100);
    setTimeout(() => {
      resolve(ScrollHelper.scrollTo(positionY));
    }, 300);
  });
};

const router: VueRouter = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior,
});

export default router;
