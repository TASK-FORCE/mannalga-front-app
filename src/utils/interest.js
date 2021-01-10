// TODO: icon, color는 나중에 확실히 정하기.
const interestGroupVoStore = {
    '아웃도어/여행': {
        name: '아웃도어/여행',
        icon: 'mdi-airplane-takeoff',
        color: '#ff9800',
    },
    '운동/스포츠': {
        name: '운동/스포츠',
        icon: 'mdi-fencing',
        color: '#2196f3',
    },
    '인문학/책/글': {
        name: '인문학/책/글',
        icon: 'mdi-book-open-variant',
        color: '#4caf50',
    },
    '외국/언어': {
        name: '외국/언어',
        icon: 'mdi-alphabetical-variant',
        color: '#673ab7',
    },
    '문화/공연/축제': {
        name: '문화/공연/축제',
        icon: 'mdi-party-popper',
        color: '#f50e22',
    },
};

class InterestUtils {
    static findInterestGroupVo = (interest) => interestGroupVoStore[interest.interestGroup.name];
}

export { InterestUtils };
