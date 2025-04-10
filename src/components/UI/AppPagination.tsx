import MoviePagination from "../../types/moviepagination";

type Props = {
  pagination: MoviePagination
};

const AppPagination: React.FC<Props> = ({ pagination} : Props) => {
  const { page, total_pages, onPageChange, maxVisiblePages} = pagination
  const pageNumbers: (number | '...')[] = [];
  const halfVisible = Math.floor(maxVisiblePages / 2);

  // Show first page
  pageNumbers.push(1);

  if (total_pages <= maxVisiblePages) {
    // Show all pages if total is less than or equal to max visible
    for (let i = 2; i <= total_pages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Show pages around the current page
    const startPage = Math.max(2, page - halfVisible);
    const endPage = Math.min(total_pages - 1, page + halfVisible);

    // Show ellipsis if there are pages before the start
    if (startPage > 2) {
      pageNumbers.push('...');
    }

    // Add the visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Show ellipsis if there are pages after the end
    if (endPage < total_pages - 1) {
      pageNumbers.push('...');
    }

    // Show last page
    if (total_pages > 1) {
      pageNumbers.push(total_pages);
    }
  }

  const nextPageStyles = "flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200";
  const shownPageStyles = "items-center hidden px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:flex"
  return (
    <div className="flex justify-center mb-6">
      <button 
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
      >
        previous
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((number, index) => (
        <button
          key={typeof number === 'number' ? number : `ellipsis-${index}`}
          onClick={() => typeof number === 'number' && onPageChange(number)}
          disabled={typeof number !== 'number'}
          className={`${shownPageStyles} ${
            typeof number === 'number' && page === number
              ? 'bg-blue-500 text-white'
              : 'bg-slate-200 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
          } ${typeof number === 'string' ? 'cursor-default' : 'cursor-pointer'}`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === total_pages} 
        className={nextPageStyles}
      >
        Next
      </button>
    </div>
  )
}

export default AppPagination