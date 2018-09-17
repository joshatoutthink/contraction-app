import React, { Component } from 'react'
import History from './History.js'
import Averages from './Averages'
import Chart from './Chart.js'

export default class Stats extends Component {

  constructor(props){
    super(props)
    this.state = {
      recordArray:[],
      contraction:true,
      hover:false,
      display:1,
    }
    
  }
  
  switchRecordType=()=>{
    if(this.props.on){
    this.state.contraction 
      ? this.setState({ contraction: false }) 
      : this.setState({contraction:true})
  }
  }
  recordTheTime=()=>{
     this.setState({
       recordArray: [{
          contracting:this.state.contraction,
          time:this.props.time,
          parsedTime:this.props.parsedTime
        },
         ...this.state.recordArray],
    })
    this.switchRecordType()
    this.props.softReset()
  }
  buttonHover=()=>{
    this.setState({
      hover:!this.state.hover
    })
  }
  buttonColor = ()=>{
   if(this.props.on){ 
      if(this.state.contraction){
        if(this.state.hover){
          return this.props.colors.darkerRed
        }
        return this.props.colors.red
      }else if(!this.state.contracting){
        if(this.state.hover){
          return this.props.colors.darkerDarkBlue
        }
        return this.props.colors.darkBlue
      }
    }else{
     if (this.state.hover) {
        return this.props.colors.darkerDarkBlue
      }
        return this.props.colors.darkBlue
      }
    }
         
  nextDisplay= ()=>{
    if(this.state.display !== 3){
     return this.setState({display:this.state.display +1})
    }else{
      return this.setState({display:1})
    }
  }
  prevDisplay= ()=>{
    if (this.state.display !== 1) {
      return this.setState({ display: this.state.display - 1 })
    } else {
      return this.setState({ display: 3 })
    }
  }
  
  
  render() {
    const sliderBtn = {
      height: '30px',
      width: "30px",
      background: this.props.colors.purple,
      display:'flex',
      borderRadius:'5px',
      flexFlow:'column',
      color:'white',
      justifyContent:'center'

    }
    return (
      <div style={{
        position:'relative',
        height:'-webkit-fill-available',
        display:'flex',
        justifyContent:'space-between',
        flexFlow:'column',
        marginBottom:'0',

      }}>
        <div style={{
          display:'flex',
          height:'300px',
          justifyContent:'space-between',
          padding:'20px',
          alignItems:'center',
          minHeight:'300px',
          margin:'auto 0'
        }}>
          <span 
          style={sliderBtn} 
          onClick={this.prevDisplay}> {'<'} </span>
          <div style={{
            boxShadow: '0 0 20px rgba(0,0,0,0.2)',
            display:'block',
            width:'100%',
            height:'100%',
            margin:'10px',
            padding:'20px',
          }}>
            {this.state.display===1? <Averages dataAverage={this.state.recordArray} />:''}
            {this.state.display === 2 ? <Chart data={this.state.recordArray} svgWidth='700' svgHeight='300' /> : ''}
            {this.state.display === 3 ? <History BgColor={this.state.contraction} colors={this.props.colors} allRecords={this.state.recordArray} /> : ''}
          </div>
          <span 
            style={sliderBtn}
            onClick={this.nextDisplay}>{'>'}</span>
        </div>
          <button 
            style={{
              width:'100%',
              border:this.props.colors.red,
              background:this.buttonColor(),
              height:'75px',
              fontSize:'24px',
              color:'white',
              display:'flex',
              justifyContent:'space-between',
              alignItems:'center',
              lineHeight:'0',
              padding:'0 30px',
              position:'absoulute',
              bottom:'0',
              left:'0',
              right:'0'
            }}
            onMouseEnter={this.buttonHover}
            onMouseLeave={this.buttonHover} 
            onClick={this.props.on?this.recordTheTime.bind(this):this.props.start}
            >
            <span> 
              {!this.props.on ? "START" : this.state.contraction 
                ? "Record Contraction" 
                : "Record Rest"
              } 
              </span>
            {this.props.parsedTime}
          </button> 
      </div>
    )
  }
}
