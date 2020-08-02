module.exports = {
    get() {
        return {
            locationTemplate: [
                { id: 1, title: '서울특별시', subLocations: getSubLocations() },
                { id: 2, title: '부산광역시', subLocations: getSubLocations() },
                { id: 3, title: '경기도', subLocations: getSubLocations() },
                { id: 4, title: '강원도', subLocations: getSubLocations() },
                { id: 5, title: '경상남도', subLocations: getSubLocations() },
                { id: 6, title: '충청북도', subLocations: getSubLocations() },
            ],
        };
    },
    post() {},
    put() {},
    delete() {},
};

function getSubLocations() {
    return [
        { id: 1, title: '1강동구' },
        { id: 2, title: '2강동구' },
        { id: 3, title: '3강동구' },
        { id: 4, title: '4강동구' },
        { id: 5, title: '5강동구' },
    ];
}
