import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Checkbox, FormGroup, FormHelperText, Button, Typography, FormControl, FormLabel, FormControlLabel, Box , TextField} from '@material-ui/core';
import './App.css';

//Currently using this for ease of use (https://betterstack.dev/projects/react-tag-input/)
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css"; 
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
//Can switch to this if we want to add autocomplete suggestions (https://www.npmjs.com/package/react-tag-autocomplete)
//import ReactTags from 'react-tag-autocomplete'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: 'white',
  },
  formatComponents: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },    
  forms: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '80%',
    },
  },
  checkboxes: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    display: 'none',
  },
}));

function getSteps() {
  return ['General User Info', 'Intersts and Skills', 'Personalization'];
}

const SignUpPage = () => {
    const history = useHistory();
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [counter, setCounter] = useState(0); //can delete later

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usertags, setUserTags] = useState([])
    const [desiredtags, setDesiredTags] = useState([])

    const [interestsChecked, setInterestsChecked] = useState({
        database: false, 
        machineLearning: false,
        computerVision: false,
        augmentedReality: false,
        blockchain: false,
        virtualReality: false, 
        iot: false,
        robotic: false, 
        security: false
      });
    const [interests, setInterests] = useState([])

    const [userImage, setUserImage] = useState("")
    const [summary, setSummary] = useState("")

    const [errorStates, setErrorStates] = useState({
        username: false,
        email: false,
        password: false
    });
    const [errorMessages, setErrorMessages] = useState({
        username: '',
        email: '',
        password: ''
    });
    const steps = getSteps();

    const handleChange = event => {
        setInterestsChecked({ ...interestsChecked, [event.target.name]: event.target.checked });
        setInterests([...interests, event.target.name])
    };

    const buttonCounterHandle = () => {
        setCounter(counter+1)
        console.log(counter)
    }

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
        });
    };

    // const handleSubmit = () => {
    //     let interests = ["database", "machineLearning", "computerVision", "augmentedReality"
    //                     , "blockchain", "virtualReality", "iot", "robotic", "security"]; 
    //     for (var i=0; i<interestsChecked.length; i++) {
    //         console.log(interestsChecked[i])
    //     }

    //     const userInfo = {
    //         username: username,
    //         email: email,
    //         password: password,
    //         usertags: usertags,
    //         desiredtags: desiredtags,
    //         summary: summary
    //     }
    //     console.log(userInfo)
    //     axios.post('http://localhost:5000/account/add', userInfo)
    //     .then(res => console.log(res.data))
    //     .catch(err => {
    //         console.log("we have uh oh")
    //     });

    // };

    const handleSubmit = () => {
        const userInfo = new FormData()
        userInfo.append('username', username)
        userInfo.append('password', password)
        userInfo.append('email', email)
        userInfo.append('usertags', usertags)
        userInfo.append('desiredtags', desiredtags)
        userInfo.append('summary', summary)
        userInfo.append('interests', interests)
        userInfo.append('img', userImage)

        console.log(interests)
        axios({
            method: 'post',
            url: 'http://localhost:5000/userInfo/add', 
            data: userInfo,
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(res => {
            console.log(res.data)
            history.push({
                pathname: '/profile',
                state: {data: username}
            })
        })
        .catch(err => {
            console.log("we have uh oh" + err)
        });

    };

    const { database,machineLearning,computerVision,
        augmentedReality,blockchain,virtualReality, 
        iot,robotic, security } = interestsChecked;

    const getStepContent = (step) => {
        switch (step) {
        case 0:
            return (
                <Box className='App'> 
                    <form className={classes.forms} noValidate autoComplete="off">
                        <div>
                            <TextField
                            error={errorStates.username}
                            helperText={errorMessages.username}
                            id="outlined-required"
                            label="Username"
                            type="Name"
                            name="Username"
                            value={username}
                            variant="outlined"
                            onChange={event => setUsername(event.target.value)}
                            />
                            <TextField
                            error={errorStates.email}
                            helperText={errorMessages.email}
                            id="outlined-required"
                            label="Email"
                            type="Name"
                            name="Username"
                            value={email}
                            variant="outlined"
                            onChange={event => setEmail(event.target.value)}
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
                            <TextField
                            error={errorStates.password}
                            id="outlined-password-input"
                            label="Confirm Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            variant="outlined"
                            onChange={event => {
                                if (event.target.value != password) {
                                    setErrorStates({
                                        username:false,                                    
                                        email:false,
                                        password:true
                                    })
                                } else {
                                    setErrorStates({    
                                        username:false,  
                                        email:false,
                                        password:false
                                    })
                                }
                            }}
                            />
                        </div>
                    </form> 
                </Box>
            );
        case 1:
            return (
                <Box mx={10} className='App'>
                    <FormControl component="fieldset" required>
                        <FormLabel component="legend">What Are Your Interests?</FormLabel>
                            <Box className={classes.checkboxes}>
                                <FormGroup >
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={database}
                                        onChange={handleChange}
                                        name="database"
                                        />
                                    }
                                    label="Database"
                                    />
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={machineLearning}
                                        onChange={handleChange}
                                        name="machineLearning"
                                        />
                                    }
                                    label="Machine Learning"
                                    />            
                                    <FormControlLabel
                                        control={
                                        <Checkbox
                                            checked={computerVision}
                                            onChange={handleChange}
                                            name="computerVision"
                                        />
                                        }
                                        label="Computer Vision"
                                />
                                </FormGroup>
                                <Box m={3}/>
                                <FormGroup >
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={augmentedReality}
                                        onChange={handleChange}
                                        name="augmentedReality"
                                        />
                                    }
                                    label="Augmented Reality"
                                    />
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={blockchain}
                                        onChange={handleChange}
                                        name="blockchain"
                                        />
                                    }
                                    label="Blockchain"
                                    />
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={virtualReality}
                                        onChange={handleChange}
                                        name="virtualReality"
                                        />
                                    }
                                    label="Virtual Reality"
                                    />
                                </FormGroup>
                                <Box m={3}/>
                                <FormGroup>
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={iot}
                                        onChange={handleChange}
                                        name="iot"
                                        />
                                    }
                                    label="IOT"
                                    />
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={robotic}
                                        onChange={handleChange}
                                        name="robotic"
                                        />
                                    }
                                    label="Robotics"
                                    />
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={security}
                                        onChange={handleChange}
                                        name="security"
                                        />
                                    }
                                    label="Security"
                                    />
                                </FormGroup>
                        </Box>
                        <FormHelperText>Be careful</FormHelperText>            
                        <Box > 
                            <FormLabel component="legend"> Add some of your skills! </FormLabel>
                            <ReactTagInput 
                            tags={usertags} 
                            onChange={(newTags) => setUserTags(newTags)}
                            />

                            <FormLabel component="legend"> What are some skills you would like in a teammate  </FormLabel>
                            <ReactTagInput 
                            tags={desiredtags} 
                            onChange={(newTags) => setDesiredTags(newTags)}
                            />
                        </Box>
                    </FormControl>
                </Box>
                );
        case 2:
            return (
                <Box className={classes.container}> 
                    <Box width="150%" px={10} className='App'>
                        <Box pb={4}> 
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={event => {setUserImage(event.target.files[0])}}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                Upload a Profile Picture
                                </Button>
                            </label>
                        </Box>
                        <form className={classes.forms} noValidate autoComplete="off">
                            <TextField
                                id="outlined-multiline-static"
                                label="Personal Summary"
                                multiline
                                rows={4}
                                value={summary}
                                onChange={event => setSummary(event.target.value)}
                                variant="outlined"
                                />
                        </form>
                    </Box>
                </Box>
                );
        default:
            return 'Unknown step';
        }
    }

  return (
    <Box my={10} className={classes.formatComponents}>
        <Box className={classes.container} width="60%" py={3}>
            <Box width="75%">
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                    })}
                </Stepper>
            </Box>
            <div>
                {activeStep === steps.length ? (
                <div>
                    <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleSubmit} className={classes.button}>
                    Complete
                    </Button>
                </div>
                ) : (
                <Box>
                    <Box className={classes.formatComponents}>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                            Back
                        </Button>
                        {isStepOptional(activeStep) && (
                            <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSkip}
                            className={classes.button}
                            >
                            Skip
                            </Button>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                        </div>
                    </Box>
                </Box>
                )}
            </div>
        </Box>
    </Box>
  );
}

export default SignUpPage;
