import React, {useState} from 'react';
import { Button, Box, Grid, TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    forms: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '75%',
        },
    },
    linkElement: {
        textDecoration: 'None',
    },
    introButton: {
        textDecoration: 'None',
        width: 'auto',
        height: 'auto',
    },
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      },
    secondaryContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: 'white',
    },
}));

const LoginPage = () => {
    const classes = useStyles();
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorState, setErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const submitForm = () => {
        const userInfo = {
            username: username,
            password: password,
        }
        console.log(userInfo);
        setUsername('')
        setPassword('')
        axios.get('http://localhost:5000/userInfo/'+username)
        .then(res => {
            console.log('we hooo')
            console.log(res.data.username)
            if ((res.data.password) == (password)) {
                history.push({
                    pathname: '/profile',
                    state: {data: username}
                })
            }
        })
        .catch(err => {
            console.log("we have uh oh" + err)
            setErrorState(true)
            setErrorMessage("Invalid Login Credentials")
        });
    }

    return(
        <Grid container spacing={3}>
            <Grid item xs={3}/>
            <Grid item xs={6}>
                <Box py={5} mt={10} className={classes.container}>
                    <Box py={10} className={classes.secondaryContainer}>
                        <Box className='App'>
                            <form className={classes.forms} noValidate autoComplete="off">
                                <div>
                                    <TextField
                                    error={errorState}
                                    helperText={errorMessage}
                                    id="outlined-required"
                                    label="Username"
                                    type="Name"
                                    name="Username"
                                    value={username}
                                    variant="outlined"
                                    onChange={event => setUsername(event.target.value)}
                                    />
                                    <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    value={password}
                                    name="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    onChange={event => setPassword(event.target.value)}
                                    />
                                </div>
                            </form> 
                        </Box>  
                            <Button className={classes.root} onClick={submitForm}>
                                Log In
                            </Button>
                        <Box className='App' m={3}>
                            Don't have an account? <br/>
                            Create one <Link to="/signup">Here</Link>    
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
    );
}

export default LoginPage;
