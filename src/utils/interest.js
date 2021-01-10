// TODO: icon, color는 나중에 확실히 정하기.
const interestGroupVoStore = {
    '아웃도어/여행': {
        name: '아웃도어/여행',
        icon: '$airplaneTakeoff',
        color: '#ff9800',
    },
    '운동/스포츠': {
        name: '운동/스포츠',
        icon: '$bike',
        color: '#2196f3',
    },
    '인문학/책/글': {
        name: '인문학/책/글',
        icon: '$bookOpen',
        color: '#4caf50',
    },
    '외국/언어': {
        name: '외국/언어',
        icon: '$alphabetical',
        color: '#673ab7',
    },
    '문화/공연/축제': {
        name: '문화/공연/축제',
        icon: '$partyPopper',
        color: '#f50e22',
    },
};

class InterestUtils {
    static findInterestGroupVo = (interest) => interestGroupVoStore[interest.interestGroup.name];
    static findInterestGroupVoByName = (name) => interestGroupVoStore[name];
}

export { InterestUtils };
