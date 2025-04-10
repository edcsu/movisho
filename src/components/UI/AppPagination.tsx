import MoviePagination from "../../types/moviepagination";

type Props = {
  pagination: MoviePagination
};

const AppPagination: React.FC<Props> = ({ pagination} : Props) => {
  const { page, total_pages, onPageChange, maxVisiblePages} = pagination
  const pageNumbers: (number | '...')[] = [];
  
  if (total_pages <= maxVisiblePages) {
    // Show all pages
    for (let i = 1; i <= total_pages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const halfVisible = Math.floor(maxVisiblePages / 2);
    const startPage = Math.max(1, page - halfVisible);
    let endPage = Math.min(total_pages, page + halfVisible);

    const shouldShowLeftEllipsis = startPage > 2;
    const shouldShowRightEllipsis = endPage < total_pages - 1;

    pageNumbers.push(1);

    if (shouldShowLeftEllipsis) {
      pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < total_pages && !pageNumbers.includes(i)) {
        pageNumbers.push(i);
      } else if ((i === startPage || i === endPage) && !pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }

    if (shouldShowRightEllipsis) {
      pageNumbers.push('...');
    }

    if (total_pages > 1 && !pageNumbers.includes(total_pages)) {
      pageNumbers.push(total_pages);
    }

    // Ensure page is always visible and within the limit
    if (!pageNumbers.includes(page)) {
      const tempPageNumbers: (number | '...')[] = [1];
      let tempStart = Math.max(1, page - halfVisible);
      let tempEnd = Math.min(total_pages, page + halfVisible);
      const tempShouldShowLeft = tempStart > 2;
      const tempShouldShowRight = tempEnd < total_pages - 1;

      if (tempShouldShowLeft) tempPageNumbers.push('...');
      for (let i = tempStart; i <= tempEnd; i++) {
        if (i > 1 && i < total_pages && !tempPageNumbers.includes(i)) {
          tempPageNumbers.push(i);
        } else if ((i === tempStart || i === tempEnd) && !tempPageNumbers.includes(i)) {
          tempPageNumbers.push(i);
        }
      }
      if (tempShouldShowRight) tempPageNumbers.push('...');
      if (total_pages > 1 && !tempPageNumbers.includes(total_pages)) tempPageNumbers.push(total_pages);

      pageNumbers.length = 0;
      pageNumbers.push(...tempPageNumbers);
    }

    // Limit the number of visible page numbers
    const visibleNumbers = pageNumbers.filter(n => typeof n === 'number');
    while (visibleNumbers.length > maxVisiblePages && pageNumbers.length > 1) {
      if (Math.abs(visibleNumbers[0] - page) > Math.abs(visibleNumbers[visibleNumbers.length - 1] - page) || visibleNumbers[0] === 1) {
        // Remove from the left (after the first page/ellipsis)
        const firstVisibleIndex = pageNumbers.findIndex(n => typeof n === 'number' && n !== 1);
        if (firstVisibleIndex > 0) {
          pageNumbers.splice(firstVisibleIndex, 1);
        } else if (pageNumbers[1] === '...') {
          pageNumbers.splice(1, 1);
        } else {
          break;
        }
      } else {
        // Remove from the right (before the last page/ellipsis)
        const lastVisibleIndex = pageNumbers.lastIndexOf(visibleNumbers[visibleNumbers.length - 1]);
        if (lastVisibleIndex < pageNumbers.length - 1) {
          pageNumbers.splice(lastVisibleIndex, 1);
        } else if (pageNumbers[pageNumbers.length - 2] === '...') {
          pageNumbers.splice(pageNumbers.length - 2, 1);
        } else {
          break;
        }
      }
      const updatedVisibleNumbers = pageNumbers.filter(n => typeof n === 'number');
      if (updatedVisibleNumbers.length <= maxVisiblePages) break;
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