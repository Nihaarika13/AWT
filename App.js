import './App.css';
import React from "react";
class App extends React.Component{
  constructor(){
    super();
    this.state={count:1}
    console.log("initialization")
  }
  componentWillMount(){
    console.log("will mount")
  }
  componentDidMount(){
    console.log("did mount")
  }
  componentDidUpdate(){
    console.log("did update")
  }
  componentWillUpdate(){
    console.log("will update")
  }
  shouldComponentUpdate(nextProps,nextState){
    if(nextState.count%2===0){
      return true
    }
    else
    return false
  }
  increment=()=>{
    this.setState({count:this.state.count+1})
  }
  render(){
    return(<>
    count:{this.state.count}
    <button onClick={this.increment}>Increment</button></>)
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
