import React, {Component} from 'react';
import { Button, Box, Grid} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import InfoForm from './InfoForm'

const styles = () => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
});

class LandingPage extends Component {
    state = {
        characters: [],
    };

    handleSubmit = (character) => {
        console.log(character);
        console.log(this.state.characters);
        this.setState({characters: [...this.state.characters, character]}, () => 
        console.log(this.state.characters));
    }
    
    render() {
        const classes = styles();
        return(
            <Grid container spacing={3}>
                <Grid item xs={3}/>
                <Grid item xs={6}>
                    <Box py={5} mt={10} bgcolor='white' className={classes.container}>
                        <InfoForm handleSubmit={this.handleSubmit}/>
                    </Box>
                </Grid>
                <Grid item xs={3}/>
            </Grid>
        );
    }
}

export default withStyles(styles)(LandingPage);