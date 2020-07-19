
import React, { Component } from 'react';
import { TextField, Box, Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import './App.css';

const styles = theme => ({
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
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },
});

class InfoForm extends Component {
    initialState = {
        name: '',
        password: '',
        number: '',
        helperText: 'Default Value!',
      }
    
    state = this.initialState

    handleChange = (event) => {
        const {name, value} = event.target;
            this.setState({
                [name]: value,
            });
    }
    
    submitForm = () => {
        console.log(this.state)
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
        console.log("here")
    }
    
    render() {
        const { name, password, number, helperText } = this.state;
        const {classes} = this.props;
        return (
            <Box className={classes.container}>
                <Box pl={20}>
                    <form className={classes.forms} noValidate autoComplete="off">
                        {/* <div>
                            <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
                            <TextField
                            id="standard-number"
                            label="Number"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </div> */}
                        <div>
                            <TextField
                            id="outlined-required"
                            label="Name"
                            type="Name"
                            name="name"
                            value={name}
                            variant="outlined"
                            onChange={this.handleChange}
                            />
                            <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            value={password}
                            name="password"
                            autoComplete="current-password"
                            variant="outlined"
                            onChange={this.handleChange}
                            />
                            <TextField
                            id="outlined-number"
                            label="Number"
                            type="number"
                            name="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={number}
                            onChange={this.handleChange}
                            />
                            <TextField
                            id="outlined-helperText"
                            label="Helper text"
                            name="helperText"
                            defaultValue="Default Value"
                            helperText="Some important text"
                            variant="outlined"
                            value={helperText}
                            onChange={this.handleChange}
                            />
                        </div>
                    </form> 
                </Box>  
                <Link className={classes.linkElement} to={{ 
                    pathname: '/About', 
                    state: {name: name, password :password, number: number, helperText: helperText}}}>
                        <Button className={classes.root} onClick={this.submitForm}>
                        Step Into the Future
                        </Button>
                </Link>
            </Box>
       
        );
    }
    
}


export default withStyles(styles, { withTheme: true })(InfoForm);