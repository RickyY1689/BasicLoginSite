import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button, Typography, Toolbar, AppBar} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textTransform: 'none'
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color="white" position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" className={classes.title}>
            Hacker Hub
          </Typography>
          <Button>
            <HomeIcon />
            <Box mx={0.5}/>
            <Typography variant="subtitle2" className={classes.title}> Home </Typography>
          </Button>
          <Box mx={2}/> 
          <Button>
            <DeveloperModeIcon />
            <Box mx={0.5}/>
            <Typography variant="subtitle2" className={classes.title}> Explore Projects </Typography>
          </Button>
          <Box mx={2}/> 
          <Button>
            <GroupAddIcon />
            <Box mx={0.5}/>
            <Typography variant="subtitle2" className={classes.title}> Find Hackers </Typography>
          </Button>
          <Box mx={4}/> 
          <Button color="inherit">Sign Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;