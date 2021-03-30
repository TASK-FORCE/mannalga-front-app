import { CreateElement } from 'vue';
import { AsyncComponent, Component } from 'vue/types/options';

export default class RenderFunction {
  /** RenderFunction을 활용하여 동적으로 컴포넌트를 생성하는 메서드
   * - 이 방식을 사용하면 코드 파악이 힘들어지므로 사용 시, 충분한 이점이 있을 때만 사용하도록 한다.
   * @param component -> 렌더링 할 컴포넌트
   * @param props -> 컴포넌트에게 넘겨 줄 props
   * @param on -> 컴포넌트에게 넘겨 줄 events
   */
  static createComponent = (
    component: string | Component<any, any, any, any> | AsyncComponent<any, any, any, any> | (() => Component),
    props: { [key: string]: any },
    on: { [key: string]: Function | Function[] }
  ) => ({
    render(createElement: CreateElement) {
      return createElement(component,
        {
          props,
          on,
        });
    },
  });
}
