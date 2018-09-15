import React, { Component } from 'react';
import Menu from './components/Menu.js'
import Stats from './components/Stats.js'
import Timer from './components/Timer.js'
import './App.css';



//colors
const colors={
  mainBgColor : '#faf3e5',
  darkBlue : '#3f5872',
  darkerDarkBlue:'#28394b',
  yellow : '#f6bc64',
  red : '#e5584e',
  darkerRed:'#b43b33',
  purple : '#a5537d',
  lightGrey : '#efefef',
  grey : '#dcdde0',
  green: "#89b099"
}
const font={
  fontFamily: 'Source Sans Pro'
}
class App extends Component {

  constructor(props){
    super(props)
    this.state={
      buttonHover:false
    }
  }
  
  parseTime = (time) => {
    let seconds = time
    const hours = Math.floor(seconds / 3600)
    seconds = seconds % 3600
    const minutes = Math.floor(seconds / 60)
    seconds = seconds % 60

    const displayedHours = hours < 10 ? `0${hours}` : hours
    const displayedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const displayedSeconds = seconds < 10 ? `0${seconds}` : seconds

    const formatted = `${displayedHours}:${displayedMinutes}:${displayedSeconds}`
    return formatted
  }
  toggleHover = () => {
    this.setState({ buttonHover: !this.state.buttonHover })
  }
  buttonHoverColor = () => this.state.buttonHover ? colors.yellow : colors.darkBlue
  render() {
    //styles
    const styles = {
      textAlign: 'center',
      height:100+'%',
      height:'100vh',
      //fontSize: 45+'px'
      //width: 100 + '%'
    }
    const topBar = {
      padding:30+'px',
      background:colors.red,
      borderRadius:'0 0 25px 25px',
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between'
    }
    const title = {
      color:'white',
      fontFamily:'Source Sans Pro',

    }
     
    const regBtn ={
      color: 'white',
      fontFamily: 'Source Sans Pro',
      background:this.buttonHoverColor(),
      border:'none',
      padding:'10px 35px',
      borderRadius:10+'px',
      fontSize:'20px',
    }
    const appBody={}
    
    return (

      <div>
      <Timer>
        {({ on, softReset, mystop, time})=>(
          <div style={styles}>
              <div style={topBar}>
              <h1 style={title}>Contraction Timer</h1>
              <a style={regBtn} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={mystop}>{on ? "pause" : "start"}</a>
              </div>
              {/* body of app */}
              <div  style={appBody}>
              <div style={{
                color:on?colors.darkBlue:colors.grey,
                fontSize:45+'px',
                font,
                fontWeight:'100'
                }}>
              </div>
              <Stats time={time} colors={colors} softReset={softReset} parsedTime={this.parseTime(time)} on={on}/>
              </div>
          </div>
        )}
      </Timer >  

      </div>
    );
    
  }
}

export default App;
