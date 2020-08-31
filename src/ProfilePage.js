import React, {useState, useEffect} from 'react';
import { Button, Box , Grid, Paper, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/header'
import ProfileBio from './components/profileBio'
import ProfileProject from './components/profileProject'
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { Buffer } from 'buffer'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(5),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    projectbackground:{
        background: 'linear-gradient(0deg, rgba(182,221,220,1) 100%, rgba(0,212,255,1) 100%)',
    },
    projectcontainer:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center",
    }
}));

const ProfilePage = (props) => {
    const classes = useStyles();
    const username = props.location.state.data

    const [imgData, setImgData] = useState([])
    const [imgType, setImgType] = useState([])
    const [summary, setSummary] = useState("")
    const [interests, setInterests] = useState([])
    const [tagsAssociated, setTagsAssociated] = useState([])
    const [tagsDesired, setTagsDesired] = useState([])

    console.log("we in")
    console.log(username)

    useEffect(() => {
        axios.get('http://localhost:5000/userInfo/' + username)
        .then(res => {
            console.log('wa hooo!')
            console.log(res)
            setImgData(Buffer.from(res.data.img.data, 'binary').toString('base64'))
            setImgType(res.data.img.contentType)
            setSummary(res.data.summary)
            setInterests(res.data.interests)
            setTagsAssociated(res.data.tagsAssociated)
            setTagsDesired(res.data.tagsDesired)
            console.log(interests)
        })
        .catch(err => {
            console.log("we have uh oh" + err)
        });
    }, [])

    return (
        <Box>
            <Header/>
            <Box mx={10} my={5}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ProfileBio name={username} imgData={imgData} imgType={imgType} interests={interests} tagsAssociated={tagsAssociated} tagsDesired={tagsDesired}/>
                    </Grid>
                    <Grid item xs={8}>
                            <Paper className={classes.paper}>
                                {summary}
                            </Paper>
                            <Box borderRadius={16} my={3} className={classes.container, classes.projectbackground} >
                                <Box borderRadius={16} width="100%" bgcolor="white" className={classes.container}> 
                                    <Typography variant="h6">Your Current Projects</Typography>
                                </Box>
                                <Box p={2} my={3} width="95%" className={classes.projectcontainer}>
                                    <ProfileProject/>
                                    <Box px={0.5}/>
                                    <ProfileProject/>
                                    <Box px={1}/>
                                    <Button borderRadius={25} variant="contained" color="primary">
                                        <AddIcon/>
                                    </Button>
                                </Box>   
                            </Box>

                            <Box borderRadius={16} my={3} className={classes.container, classes.projectbackground} >
                                <Box borderRadius={16} width="100%" bgcolor="white" className={classes.container}> 
                                    <Typography variant="h6">Previous Projects</Typography>
                                </Box>
                                <Box p={2} my={3} width="95%" className={classes.projectcontainer}>
                                    <ProfileProject/>
                                    <Box px={0.5}/>
                                    <ProfileProject/>
                                    <Box px={1}/>
                                    <Button borderRadius={25} variant="contained" color="primary">
                                        <AddIcon/>
                                    </Button>
                                    {/* <img src={`data:image/png;base64,${imgData}`} />     */}
                                </Box>   
                            </Box> 
                    </Grid>
                </Grid>
            </Box> 
        </Box>
    )
}

export default ProfilePage