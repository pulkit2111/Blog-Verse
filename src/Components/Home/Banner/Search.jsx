import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import './search.css';

export default function SearchBar({posts, category}) {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  category=category===null?'All blogs':category;

  return (
    <Box sx={{ width: 300, margin: '0 auto', backgroundColor:"white", borderRadius:"5px" }}>
      <Autocomplete
        freeSolo
        options={posts}
        getOptionLabel={(option) => option.title}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(event, newValue) => {
          if (newValue) {
            navigate(`/details/${newValue._id}`);
          }
        }}
        renderOption={(props, option) => (
          <Box component="li" sx={{ display: 'flex', alignItems: 'center' }} {...props}>
            <img
              src={option.picture}
              alt={option.title}
              style={{ width: 30, height: 30, marginRight: 10, borderRadius: '50%' }}
            />
            {option.title}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={`Search ${category}...`}
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
        PaperComponent={(props)=>(
          <Paper {...props} style={{maxHeight: 200, overflow: 'auto'}}/>
        )}
      />
    </Box>
  );
}
