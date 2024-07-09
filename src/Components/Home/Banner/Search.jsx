import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import './search.css';

const searchOptions = [
  'Travel',
  'Food',
  'Fashion',
  'Technology',
  'Health',
  'Business',
];

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');

  return (
    <Box sx={{ width: 300, margin: '0 auto', backgroundColor:"white", borderRadius:"5px" }}>
      <Autocomplete
        freeSolo
        options={searchOptions}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search blogs..."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}
