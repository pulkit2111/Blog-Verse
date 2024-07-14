import * as React from 'react';
import { useNavigate} from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function Dropdown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClicked = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const handleClick = (query) => {
    return () => {
        handleClose();
        navigate(`/?category=${query}`);
    };
}

  return (
    <div>
      <Button
        variant="text"
        style={{textTransform:"none", color:"black"}}
        onClick={handleClicked}
        disableRipple
        endIcon={<KeyboardArrowDownIcon />}
        id='middle-button'
      >
        Categories
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
          <MenuItem onClick={handleClick('/')} disableRipple>
          All
        </MenuItem>
        <MenuItem onClick={handleClick('Travel')} disableRipple>
          Travel
        </MenuItem>
        <MenuItem onClick={handleClick('Food')} disableRipple>
          Food
        </MenuItem>
        <MenuItem onClick={handleClick('Fashion')} disableRipple>
          Fashion
        </MenuItem>
        <MenuItem onClick={handleClick('Technology')} disableRipple>
          Technology
        </MenuItem>
        <MenuItem onClick={handleClick('Cars')} disableRipple>
          Cars
        </MenuItem>
        <MenuItem onClick={handleClick('Cars')} disableRipple>
          Nature
        </MenuItem>
      </StyledMenu>
    </div>
  );
}