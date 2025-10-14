interface PaginationProps {
    itemsPerPage: number;
    changePage: (page: number) => void;
    totalItems: number;
    currentPage: number;
}

export default function Pagination({ itemsPerPage, changePage, totalItems, currentPage }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);
    const firstPage = pagesArray[0];
    const lastPage = totalPages;

    function handleNext() {
        if (currentPage < lastPage) {
            changePage(currentPage + 1);
        }
    }

    function handlePrevious() {
        if (currentPage > firstPage) {
            changePage(currentPage - 1);
        }
    }

    function handlePageClick(page: number) {
        changePage(page);
    }

    return (
        <div className='flex gap-2'>
            <button
                onClick={handlePrevious}
                className='cursor-pointer rounded-lg border p-2 disabled:opacity-50'
                disabled={currentPage === firstPage}
            >
                Anterior
            </button>

            <div className='flex gap-2'>
                {totalPages < 4 &&
                    pagesArray.map((pageNumber) => (
                        <button
                            onClick={() => handlePageClick(pageNumber)}
                            className={`flex h-full cursor-pointer items-center rounded-lg border px-4 ${
                                currentPage === pageNumber ? 'bg-terceary' : ''
                            }`}
                            disabled={currentPage === pageNumber}
                        >
                            {pageNumber}
                        </button>
                    ))}

                {totalPages >= 4 && currentPage < 3 && (
                    <>
                        <button
                            onClick={() => handlePageClick(firstPage)}
                            className={`flex h-full cursor-pointer items-center rounded-lg border px-4 ${
                                currentPage === firstPage ? 'bg-terceary' : ''
                            }`}
                        >
                            {firstPage}
                        </button>
                        <button
                            onClick={() => handlePageClick(2)}
                            className={`flex h-full cursor-pointer items-center rounded-lg border px-4 ${currentPage === 2 ? 'bg-terceary' : ''}`}
                        >
                            {2}
                        </button>
                        <span className='flex h-full items-center rounded-lg border px-4'>...</span>
                        <button
                            onClick={() => handlePageClick(lastPage)}
                            className={`flex h-full cursor-pointer items-center rounded-lg border px-4 ${
                                currentPage === lastPage ? 'bg-terceary' : ''
                            }`}
                        >
                            {lastPage}
                        </button>
                    </>
                )}

                {currentPage > 2 && currentPage + 1 !== lastPage && currentPage !== lastPage && (
                    <>
                        <button
                            onClick={() => handlePageClick(firstPage)}
                            className={`flex h-full cursor-pointer items-center rounded-lg border px-4 ${
                                currentPage === firstPage ? 'bg-terceary' : ''
                            }`}
                        >
                            {firstPage}
                        </button>
                        <span className='flex h-full items-center rounded-lg border px-4'>...</span>
                        <button
                            onClick={() => handlePageClick(currentPage)}
                            className='bg-terceary flex h-full cursor-pointer items-center rounded-lg border px-4'
                        >
                            {currentPage}
                        </button>
                        <span className='flex h-full items-center rounded-lg border px-4'>...</span>
                        <button
                            onClick={() => handlePageClick(lastPage)}
                            className={`flex h-full cursor-pointer items-center rounded-lg border px-4 ${
                                currentPage === lastPage ? 'bg-terceary' : ''
                            }`}
                        >
                            {lastPage}
                        </button>
                    </>
                )}

                {totalPages >= 4 && currentPage > 2 && currentPage >= lastPage - 1 && (
                    <>
                        <button
                            onClick={() => handlePageClick(firstPage)}
                            className={`flex h-full cursor-pointer items-center rounded-lg border px-4 ${
                                currentPage === firstPage ? 'bg-terceary' : ''
                            }`}
                        >
                            {firstPage}
                        </button>
                        <span className='flex h-full items-center rounded-lg border px-4'>...</span>
                        <button
                            onClick={() => handlePageClick(lastPage - 1)}
                            className={`flex h-full cursor-pointer items-center rounded-lg border px-4 ${
                                currentPage === lastPage - 1 ? 'bg-terceary' : ''
                            }`}
                        >
                            {lastPage - 1}
                        </button>
                        <button
                            onClick={() => handlePageClick(lastPage)}
                            className={`flex h-full cursor-pointer items-center rounded-lg border px-4 ${
                                currentPage === lastPage ? 'bg-terceary' : ''
                            }`}
                        >
                            {lastPage}
                        </button>
                    </>
                )}
            </div>

            <button onClick={handleNext} className='cursor-pointer rounded-lg border p-2 disabled:opacity-50' disabled={currentPage === lastPage}>
                Siguiente
            </button>
        </div>
    );
}
