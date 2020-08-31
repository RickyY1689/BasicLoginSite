import React from 'react';
import Header from './old_files/Header';


const About = (props) => {
    const {name, password} = props.location.state
    console.log(name, password)
  return (
    <Header data={name}/> 
  );
}

export default About;
