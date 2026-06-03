import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const FiltersBar = ({ value, onChange }: Props) => (
  <Box mb={3} display="flex" gap={2} flexWrap="wrap">
    <FormControl sx={{ minWidth: 180 }}>
      <InputLabel id="notification-type-label">Type</InputLabel>
      <Select
        labelId="notification-type-label"
        value={value}
        label="Type"
        onChange={(event) => onChange(event.target.value)}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Event">Event</MenuItem>
        <MenuItem value="Result">Result</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
      </Select>
    </FormControl>
  </Box>
);

export default FiltersBar;
