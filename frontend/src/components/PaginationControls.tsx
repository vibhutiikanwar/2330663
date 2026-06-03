import { Box, Pagination, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface Props {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const PaginationControls = ({ page, limit, total, onPageChange, onLimitChange }: Props) => {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="page-size-label">Page Size</InputLabel>
        <Select
          labelId="page-size-label"
          value={limit}
          label="Page Size"
          onChange={(event) => onLimitChange(Number(event.target.value))}
        >
          {[10, 20, 50].map((size) => (
            <MenuItem key={size} value={size}>{size}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Pagination count={totalPages} page={page} onChange={(_, value) => onPageChange(value)} />
    </Box>
  );
};

export default PaginationControls;
