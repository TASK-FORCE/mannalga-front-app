const transformService = {
    transformToPage(responseWithPage) {
        const { pageable, last, size } = responseWithPage;
        const currentPage = pageable.pageNumber;
        const nextPage = currentPage + 1;
        return {
            isLastPage: last,
            size,
            currentPage,
            nextPage,
        };
    },
};

export {
    transformService,
};
