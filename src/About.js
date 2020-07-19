import React from 'react';
import Header from './Header';


const About = (props) => {
    const {name, password, number, helperText} = props.location.state
    console.log(name, password, number, helperText)
  return (
    <Header data={name}/> 
  );
}

export default About;
