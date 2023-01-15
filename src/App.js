import React, { Component } from 'react'
import NavBar from './component/NavBar'
import News from './component/News'
import './App.css'
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      mode: 'light',
      country: 'us',
    }
  }
  apiKey = process.env.REACT_APP_NEWS_API
  btnCustomize = ()=>{
    if(this.state.mode==='light')
    {
      this.setState({
      mode:"dark",

    })
    document.body.style.backgroundColor='#2f3b50';
    document.getElementById('heding-news').style.color='#fafafa';
  }else
  {
    this.setState({
      mode:"light",

    })
    document.body.style.backgroundColor='white';
    document.getElementById('heding-news').style.color='var(--bs-body-color)';
  }
  }
state = {
  progress:0,
}
setProgress = (progress)=>{
  this.setState({progress: progress});
}

  render() {
    return (
      <>
       <Router >
        <NavBar btnCustomize={this.btnCustomize} mode={this.state.mode}/>
        <LoadingBar
        height = {3}
        color='#f11946'
        progress={this.state.progress}
        
      />
        <Switch>
          <Route exact path="/"  element={<News setPrgoress={this.setProgress} apiKey={this.apiKey} key="general" pagesize={9} country={this.state.country} category="general"  /> } />
          <Route exact path="/general" element={<News setPrgoress={this.setProgress} apiKey={this.apiKey} key="general14" pagesize={9} country={this.state.country}category="general"  />}/>
          <Route exact path="/business" element={<News setPrgoress={this.setProgress} apiKey={this.apiKey} key="business" pagesize={9} country={this.state.country}category="business"  />} />
          <Route exact path="/entertainment" element={<News setPrgoress={this.setProgress} apiKey={this.apiKey} key="entertainment" pagesize={9} country={this.state.country}category="entertainment"  />} />
          <Route exact path="/health" element={<News setPrgoress={this.setProgress} apiKey={this.apiKey} key="health" pagesize={9} country={this.state.country}category="health"  />} />
          <Route exact path="/science" element={<News setPrgoress={this.setProgress} apiKey={this.apiKey} key="science" pagesize={9} country={this.state.country}category="science"  />} />
          <Route exact path="/sports" element={<News setPrgoress={this.setProgress} apiKey={this.apiKey} key="sports" pagesize={9} country={this.state.country}category="sports"  />} />
          <Route exact path="/technology" element={<News setPrgoress={this.setProgress} apiKey={this.apiKey} key="technology" pagesize={9} country={this.state.country}category="technology"  />} />
        </Switch>
        </Router>
      </>
    )
  }
}
