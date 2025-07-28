import styles from './Pagination.module.css'

interface PagenationProps {
    currentPage: number;
    totalPages: number;
    blockSize: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent = ({
    currentPage,
    totalPages,
    blockSize,
    onPageChange
}: PagenationProps) => {

    const pageBlock = Math.floor((currentPage - 1) / blockSize);
    const startPage = pageBlock * blockSize + 1;
    const endPage = Math.min(startPage + blockSize - 1, totalPages);
    const pageArray = Array.from(
        { length: endPage - startPage + 1 }, (_, i) => startPage + i
    );

    return (
        <div className={styles.pagination}>
            {pageBlock > 0 &&
                (<button
                    className={styles.blockButton}
                    onClick={() => onPageChange(startPage - 1)}>
                    이전
                </button>)}
            {pageArray.map((page) => {
                return (
                    <button key={page}
                        className={currentPage === page
                            ? styles.currentPageButton
                            : styles.pageButton
                        }
                        onClick={() => onPageChange(page)}>
                        {page}
                    </button>)
            })}
            {endPage < totalPages &&
                (<button
                    className={styles.blockButton}
                    onClick={() => onPageChange(endPage + 1)}>
                    다음
                </button>)}

        </div>);
}

export default PaginationComponent;