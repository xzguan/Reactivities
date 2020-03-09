import React from 'react'
import { DateTimePicker} from 'react-widgets';
class AppTest extends React.Component {
    constructor(...args) {
      super(...args)
      this.state = { date: new Date() }
    }
    onBlur=(e)=>{
      alert("it works")
      console.log("hello")
      //this.setState({value:0})
    }
    onChange=(value,valueStr)=>{
      alert(valueStr);
      this.setState({date:value});
    }
    render() {
      console.log("hello")
      return (
        <form>
          <DateTimePicker
          value={this.state.date}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onKeyDown={(x)=>{}}
        />
        </form>
        
      )
    }
  }



export default AppTest