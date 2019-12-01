import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {List,Icon,Header  } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/semantic.min.css'
class App extends Component  {
  state={
    values:[]
  }
  componentDidMount(){
    axios.get("http://localhost:5000/api/values")
      .then((response)=>{
        
        this.setState({
          values:response.data
        })
      })
  }
  render(){
    return (
      <div>
         <Header as='h2' icon>
          <Icon name='users' />
           Users
        </Header>
       
        <List>
            {this.state.values.map((value:any)=>(
              <List.Item key={value.id}>{value.name}</List.Item>
            ))} 
        </List>
          <ul>
            
          </ul>
         

      </div>
    )
  }
}

export default App;
