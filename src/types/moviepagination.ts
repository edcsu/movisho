export default interface MoviePagination {
  page: number;
  total_pages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages: number;
}