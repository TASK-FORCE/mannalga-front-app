function offRules(ruleNames) {
    const rules = {};
    ruleNames.forEach(name => { rules[name] = ['off']; });
    return rules;
}

module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error'] }] : 'off', // production 환경에선 warn, error 로그만 허용한다.
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // production 환경에선 debugger 금지
        ...offRules([
            'import/extensions',
            'global-require',
            'import/no-dynamic-require',
            'import/prefer-default-export',
            'arrow-parens',
            'no-use-before-define',
            'no-unused-expressions',
            'no-restricted-syntax',
            'object-curly-newline',
            'no-unused-vars',
            'no-trailing-spaces',
            'camelcase',
        ]),
        'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
        'no-shadow': ['error', { 'allow': ['state'] }],
        'indent': ['error', 4],
        'max-len': ['error', {
            'code': 200,
            'ignoreComments': true,
            'ignoreTrailingComments': true,
            'ignoreUrls': true,
        }],

        /** Vue 스타일 가이드가 추천하는 다중 속성 엘리먼트 규칙
         *  @link https://vuejs.org/v2/style-guide/index.html#Multi-attribute-elements-strongly-recommended
         */
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 1,
                multiline: {
                    max: 1,
                    allowFirstLine: true,
                },
            },
        ],

        /** Vue 스타일 가이드가 추천하는 컴포넌트 옵션 순서
         *  @link  https://vuejs.org/v2/style-guide/index.html#Component-instance-options-order-recommended
         */
        'vue/order-in-components': [
            'error',
            {
                order: [
                    'el',                                             // 1.   컴포넌트 외부에 효과가 미치는 옵션
                    'name',                                           // 2-1. 컴포넌트 바깥의 지식을 필요로 하는 옵션
                    'parent',                                         // 2-2. 컴포넌트 바깥의 지식을 필요로 하는 옵션
                    'functional',                                     // 3.   컴포넌트의 유형을 바꾸는 옵션
                    ['delimiters', 'comments'],                       // 4.   템플릿이 컴파일되는 방식을 바꾸는 옵션
                    ['components', 'directives', 'filters'],          // 5.   템플릿에 이용되는 요소들을 지정하는 옵션
                    ['extends', 'mixins'],                            // 6.   다른 컴포넌트의 속성을 가져와 합치는 옵션
                    ['inheritAttrs', 'model', 'props', 'propsData'],  // 7.   컴포넌트의 인터페이스를 지정하는 옵션
                    'data',                                           // 8-1. 반응적인 지역 속성들을 설정하는 옵션
                    'computed',                                       // 8-2. 반응적인 지역 속성들을 설정하는 옵션
                    'watch',                                          // 9-1. 반응적인 이벤트에 의해 실행되는 콜백을 지정하는 옵션
                    'LIFECYCLE_HOOKS',                                // 9-2. 반응적인 이벤트에 의해 실행되는 콜백을 지정하는 옵션
                    'methods',                                        // 10.  시스템의 반응성과 관계 없는 인스턴스 속성을 지정하는 옵션
                    ['template', 'render', 'renderError'],            // 11.  컴포넌트 출력을 선언적으로 지정하는 옵션
                ],
            },
        ],

        /** Vue 스타일 가이드가 추천하는 엘리먼트 속성 순서
         *  @link https://vuejs.org/v2/style-guide/index.html#Element-attribute-order-recommended
         */
        'vue/attributes-order': [
            'error',
            {
                order: [
                    'DEFINITION',       // ex) is                         컴포넌트 옵션 속성
                    'LIST_RENDERING',   // ex) v-for                      리스트 렌더링
                    'CONDITIONALS',     // ex) v-if, v-show, v-cloak...   조건부
                    'RENDER_MODIFIERS', // ex) v-pre, v-once              렌더 변경자
                    'GLOBAL',           // ex) id                         전역 인식
                    'UNIQUE',           // ex) ref, key, slot             유일 속성
                    'TWO_WAY_BINDING',  // ex) v-model                    양방향 바인딩
                    'OTHER_DIRECTIVES', //                                언급되지 않은 지시자
                    'OTHER_ATTR',       //                                언급되지 않은 속성
                    'EVENTS',           // ex) v-on                       이벤트
                    'CONTENT',          // ex) v-html, v-text             내용
                ],
            },
        ],
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                mocha: true,
            },
        },
    ],
};
