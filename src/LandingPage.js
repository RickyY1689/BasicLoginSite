import React, {useState} from 'react';
import { Button, Box, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import InfoForm from './InfoForm'

const useStyles = () => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
});

const LandingPage = () => {
    const classes = useStyles();
    const [characters, setCharacters] = useState(0);

    const handleSubmit = (character) => {
        console.log(character);
        console.log(characters);
        setCharacters(character);
    }
    
    return(
        <Grid container spacing={3}>
            <Grid item xs={3}/>
            <Grid item xs={6}>
                <Box py={5} mt={10} className={classes.container}>
                    <InfoForm handleSubmit={handleSubmit}/>
                </Box>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
    );
}

export default LandingPage;
