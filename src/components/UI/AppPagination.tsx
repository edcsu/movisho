import MoviePagination from "../../types/moviepagination";

type Props = {
  pagination: MoviePagination
};

const AppPagination: React.FC<Props> = ({ pagination} : Props) => {
  const { page, total_pages, onPageChange, maxVisiblePages} = pagination
  const pageNumbers: (number | '...')[] = [];
  
  if (total_pages <= maxVisiblePages) {
    // Show all pages if total is less than or equal to max visible
    for (let i = 1; i <= total_pages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, page - halfVisible);
    let endPage = Math.min(total_pages, page + halfVisible);

    const shouldShowLeftEllipsis = startPage > 2;
    const shouldShowRightEllipsis = endPage < total_pages - 1;

    pageNumbers.push(1);

    if (shouldShowLeftEllipsis) {
      pageNumbers.push('...');
    }

    // Add the relevant page numbers around the current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (shouldShowRightEllipsis) {
      pageNumbers.push('...');
    }

    if (total_pages > 1 && !pageNumbers.includes(total_pages)) {
      pageNumbers.push(total_pages);
    }

    // Ensure page is always visible, adjusting the window if needed
    if (!pageNumbers.includes(page)) {
      if (page < startPage) {
        // Current page is before the visible window, shift the window to the left
        const diff = startPage - page;
        startPage = Math.max(1, startPage - diff);
        endPage = Math.max(Math.min(total_pages, endPage - diff), maxVisiblePages - (shouldShowLeftEllipsis ? 1 : 0) - (shouldShowRightEllipsis ? 1 : 0) + (total_pages === 1 ? 0 : 1)); // Adjust endPage
        pageNumbers.length = 0;
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push('...');
        for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
        if (endPage < total_pages - 1) pageNumbers.push('...');
        if (total_pages > 1 && !pageNumbers.includes(total_pages)) pageNumbers.push(total_pages);

      } else if (page > endPage) {
        // Current page is after the visible window, shift the window to the right
        const diff = page - endPage;
        endPage = Math.min(total_pages, endPage + diff);
        startPage = Math.min(Math.max(1, startPage + diff), total_pages - (maxVisiblePages - (shouldShowLeftEllipsis ? 1 : 0) - (shouldShowRightEllipsis ? 1 : 0) + (total_pages === 1 ? 0 : 1)) + 1); // Adjust startPage
        pageNumbers.length = 0;
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push('...');
        for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
        if (endPage < total_pages - 1) pageNumbers.push('...');
        if (total_pages > 1 && !pageNumbers.includes(total_pages)) pageNumbers.push(total_pages);
      }
    }

    // Ensure we don't exceed maxVisiblePages (simplified)
    const visiblePageCount = pageNumbers.filter(num => typeof num === 'number').length;
    while (visiblePageCount > maxVisiblePages && pageNumbers.includes('...')) {
      // Prioritize keeping the current page visible.
      const leftEllipsisIndex = pageNumbers.indexOf('...');
      const rightEllipsisIndex = pageNumbers.lastIndexOf('...');

      if (page < total_pages / 2) {
        // Try to remove from the right side
        if (rightEllipsisIndex > 0) {
          const indexToRemove = rightEllipsisIndex - 1;
          if (typeof pageNumbers[indexToRemove] === 'number' && pageNumbers[indexToRemove] !== page) {
            pageNumbers.splice(indexToRemove, 1);
          } else if (leftEllipsisIndex > 1) {
            pageNumbers.splice(leftEllipsisIndex + 1, 1);
          } else {
            break;
          }
        } else if (leftEllipsisIndex > 1) {
          pageNumbers.splice(leftEllipsisIndex + 1, 1);
        } else {
          break;
        }
      } else {
        // Try to remove from the left side
        if (leftEllipsisIndex < pageNumbers.length - 1) {
          const indexToRemove = leftEllipsisIndex + 1;
          if (typeof pageNumbers[indexToRemove] === 'number' && pageNumbers[indexToRemove] !== page) {
            pageNumbers.splice(indexToRemove, 1);
          } else if (rightEllipsisIndex < pageNumbers.length - 2) {
            pageNumbers.splice(rightEllipsisIndex - 1, 1);
          } else {
            break;
          }
        } else if (rightEllipsisIndex < pageNumbers.length - 2) {
          pageNumbers.splice(rightEllipsisIndex - 1, 1);
        } else {
          break;
        }
      }
    }
  }

  // Remove duplicate ellipsis
  const filteredPageNumbers = pageNumbers.filter((item, index) => !(item === '...' && pageNumbers[index + 1] === '...'));
 
  const previousPageStyles = "flex items-center px-4 py-2 mx-1 text-gray-500 bg-slate-200 rounded-md dark:bg-gray-800 dark:text-gray-600"
  const nextPageStyles = "flex items-center px-4 py-2 mx-1 text-gray-700 bg-slate-200 transition-colors duration-300 transform rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200";
  const shownPageStyles = "items-center hidden px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:flex"
  return (
    <div className="flex justify-center mb-6">
      <button
        type="button" 
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`${previousPageStyles} ${page === 1 ? 'cursor-not-allowed' : ' hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 cursor-pointer'}`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {filteredPageNumbers.map((number, index) => (
        <button
          type="button" 
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
        type="button" 
        onClick={() => onPageChange(page + 1)}
        disabled={page === total_pages} 
        className={`${nextPageStyles} ${page === total_pages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        Next
      </button>
    </div>
  )
}

export default AppPagination