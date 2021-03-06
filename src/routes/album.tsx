import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreVert from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { RootState, useAppDispatch } from '../store';
import { fetchAlbumById } from '../store/thunks';
import { useParams } from 'react-router-dom';
import Photos from '../components/Photos';
import { Menu, MenuItem } from '@mui/material';
import { syncAlbum } from '../store/thunks/syncAlbum';

export default function Album() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { album } = useSelector((state: RootState) => state.albumById);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSync = () => {
    dispatch(syncAlbum(`${id}`));
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(fetchAlbumById(`${id}`));
  }, [id]);

  const handleBackButtonClick = async () => {
    navigate('/albums');
  };

  if (!album) return <></>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='back'
            sx={{ mr: 2 }}
            onClick={() => handleBackButtonClick()}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {album.title}
          </Typography>

          <div>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <MoreVert />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleSync}>Sync</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Photos album={album} />
    </Box>
  );
}
