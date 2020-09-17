module.exports = {
    get(req) {
    },
    post(req) {
        const { size, offset } = req.body.data;
        console.log('size', size, 'offset', offset);
        const totalElements = 50;
        const pageFloat = totalElements / size;
        const totalPages = Math.ceil(pageFloat);
        const isLastPage = offset + size > 50;
        const number = Math.floor(offset / size);

        if (offset > totalElements) {
            return {
                clubs: [],
                page: {},
            };
        }

        const leftClubCount = totalElements - offset + 1;
        const clubSize = leftClubCount < size ? leftClubCount : size;
        const clubs = makeClubs(Date.now(), clubSize);

        return {
            clubs,
            page: {
                totalElements,
                totalPages,
                isLastPage,
                number,
                size,
            },
        };
    },
    put() {
    },
    delete() {
    },
};

function makeClubs(seq, size) {
    const clubs = [];
    for (let i = 0; i < size; i++) {
        // eslint-disable-next-line no-param-reassign,no-plusplus
        clubs.push(makeClub(seq++));
    }
    return clubs;
}

function makeClub(seq) {
    const club = getClub();
    club.seq = seq;
    club.name += seq;
    return club;
}

function getClub() {
    return {
        seq: 6023,
        name: 'Club ',
        description: '산이 너무 좋은 사람들의 모임입니다. 매주 정모 필참! 정모 후 뒷풀이는 선택.많이 가입해주세요~',
        maximumNumber: 300,
        userCount: 42,
        mainImageUrl: 'taskforce-file-server/Exv2Es.png',
        interests: [
            {
                seq: 1,
                name: '운동',
            },
            {
                seq: 2,
                name: '건강',
            },
        ],
        states: [
            {
                seq: 101,
                name: '강남구',
                superStateRoot: '서울특별시/강남구',
                level: 2,
            },
            {
                seq: 102,
                name: '강서구',
                superStateRoot: '서울특별시/강서구',
                level: 2,
            },
        ],
    };
}
