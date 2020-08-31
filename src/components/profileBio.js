import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Box, Typography, Paper} from '@material-ui/core';
import { Buffer } from 'buffer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30)
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },    
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ProfileBio = (props) => {
  const classes = useStyles();
  const name = props.name
  const imgData = props.imgData
  const imgType = props.imgType
  const interests = props.interests.toString().split(',')

  return (
      <Paper elevation={0} className={classes.paper}>
        <Box className={classes.container}>
            <Avatar src={`data:image/${imgType};base64,${imgData}`} className={classes.large}></Avatar>
            <Box my={1}/>
            <Typography variant="h4">{name}</Typography>
            <Box borderRadius={16} bgcolor="primary.main" color="primary.contrastText" className={classes.container} width="100%" py={5} my={3}>
              {interests.map((interest, index) => (
                <div key={index}>
                  <Typography>{interest}</Typography> 
                </div>
              ))}
            </Box>
            <Box border={1} width="10rem"/>
            <Box borderRadius={16} bgcolor="primary.main" color="primary.contrastText" className={classes.container} width="100%" py={5} my={3}>
                Skills
            </Box>
        </Box>
    </Paper>
  );
}

export default ProfileBio;