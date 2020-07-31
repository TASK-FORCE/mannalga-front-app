export const NAME_RULES = [
    v => !!v || '이름을 작성해주세요.',
    v => v.search(/\s/) === -1 || '공백을 제거해주세요!',
];
