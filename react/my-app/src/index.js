import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React, { Suspense, lazy } from 'react'; 
const Home = lazy(() => import('./routes/Home.js'));
const About = lazy(() => import('./routes/About.js'));
const MyContext = React.createContext("light");  


function Toolbar(props) {
    return (
      <div>
        <MyElemt />
      </div>
    );
  }
  

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
    <MyContext.Provider value="2d">
      <Switch> 
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/> 
      </Switch>   
            <Toolbar></Toolbar>  
      </MyContext.Provider>   
    </Suspense>
  </Router>
); 

class MyElemt extends React.Component{ 

    static contextType = MyContext;
    render(){ 
       return (<div>-----------{this.context}--------------</div>); 
    } 
}


ReactDOM.render(<App />, document.getElementById('root'));


// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';

// class SearchBar extends React.Component{ 

//     constructor(props){
//         super(props);
//         this.handleChange = this.handleChange.bind(this);
//     }
    
//     handleChange(e) { 
//         this.props.codechange(e.target.value)
//     }

//     render(){
//         return (
//             <input value={ this.props.code } onChange={this.handleChange} />
//         );
//     } 
// }

// function ProductCategoryRow(props){
//     return <tr><td colSpan='2' >{ props.category }</td></tr>;
// }

// function ProductRow(props){
//     return <tr><td>{ props.name }</td><td>{ props.price }</td></tr>;
// }

// class ProductTable extends React.Component{
 
//     render(){
//         let tr1 = [<ProductCategoryRow category={"Sporting Goods"} key={"Sporting Goods"}/>];  
//         let tr2 = [<ProductCategoryRow category={"Electronics"} key={"Electronics"}/>]; 
//         for(let p of this.props.result){
//             if(p.category === "Sporting Goods"){
//                 tr1.push(<ProductRow key={p.name} name={ p.name } price={ p.price }/>);
//             }else{
//                 tr2.push(<ProductRow key={p.name} name={ p.name } price={ p.price }/>);
//             }
//         }

//         return (
//             <table>
//                 <thead><tr><td>name</td><td>price</td></tr></thead>
//                 <tbody>
//                     {tr1}
//                     {tr2}
//                 </tbody> 
//             </table>
//         )
//     }
// } 


// class FilterableProductTable extends React.Component {
    
//     constructor(props) {
//         super(props);
//         this.state = {
//             source : [
//                 {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
//                 {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
//                 {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
//                 {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
//                 {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
//                 {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
//             ],
//             code : "",
//             result : [{category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
//             {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
//             {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
//             {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
//             {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
//             {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}]
//         };
//         this.codechange = this.codechange.bind(this);
//     }

//     codechange(value){  
//         let result = this.state.source.filter(item=>{
//             return item.name.indexOf(value) > -1
//         }); 
//         this.setState({
//             result :  result,
//             code : value
//         }); 
//     }

//     render() { 
//        return  <div><SearchBar code={this.state.code} codechange={this.codechange}/> <ProductTable result={this.state.result}/></div>
//     }

// }

// ReactDOM.render(<FilterableProductTable />, document.getElementById('root'));





// // class MyElement extends React.Component {

// //     constructor(props) {
// //         super(props);
// //     }

// //     render() {
// //         return (
// //             <div className="SplitPane">
// //                 <div className="SplitPane-left">
// //                     {this.props.left}
// //             </div>
// //                 <div className="SplitPane-right">
// //                     {this.props.right}
// //                 </div>
// //             </div>
// //         )
// //     }
// // }


// // class Father extends React.Component {
    
// //     constructor(props) {
// //         super(props);
// //     }

// //     render() { 
// //         return (
// //             <div>xxxxxxxxxxxxxxxxxxxx</div>
// //         )
// //     }

// // }
 

// // class Contacts  extends Father{
// //     constructor(props) {
// //         super(props);
// //     }

// //     render() { 
// //         return (
// //             <div>
// //                  1111111111111
// //             </div>
// //         )
// //     }
// // }

// // class Chat extends Father {
// //     constructor(props) {
// //         super(props);
// //     }

// //     render() { 
// //         let a = super.render();
// //         return ( 
// //             <div> 
// //                  { a }
// //                 22222222222222222
// //             </div>
// //         )
// //     }
// // }



// // function App() {
// //     return (
// //         <MyElement
// //             left={ <Contacts /> }
// //             right={  <Chat /> } 
// //         />
// //     );
// // }

// // ReactDOM.render(<App />, document.getElementById('root'));

// // function BoilingVerdict(props) {
// //     if (props.celsius >= 100) {
// //       return <p>The water would boil.</p>;
// //     }
// //     return <p>The water would not boil.</p>;
// // }

// // function tryConvert(temperature, convert) {
// //     const input = parseFloat(temperature);
// //     if (Number.isNaN(input)) {
// //       return '';
// //     }
// //     const output = convert(input);
// //     const rounded = Math.round(output * 1000) / 1000;
// //     return rounded.toString();
// // }

// // function toCelsius(fahrenheit) {
// //     return (fahrenheit - 32) * 5 / 9;
// // }

// // function toFahrenheit(celsius) {
// // return (celsius * 9 / 5) + 32;
// // }

// // const scaleNames = {
// //     c: 'Celsius',
// //     f: 'Fahrenheit'
// // };


// // class Calculator extends React.Component {
// //     constructor(props) {
// //       super(props);
// //       this.handleChange = this.handleChange.bind(this); 
// //       this.state = {temperature: '', scale: 'c'};
// //     }

// //     handleChange(temperature,scale) {
// //       this.setState({scale: scale, temperature});
// //     }

// //     render() {
// //       const scale = this.state.scale;
// //       const temperature = this.state.temperature;
// //       const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
// //       const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

// //       return (
// //         <div>
// //           <TemperatureInput
// //             scale="c"
// //             temperature={celsius}
// //             onTemperatureChange={this.handleChange} />

// //           <TemperatureInput
// //             scale="f"
// //             temperature={fahrenheit}
// //             onTemperatureChange={this.handleChange} />

// //           <BoilingVerdict
// //             celsius={parseFloat(celsius)} /> 
// //         </div>
// //       );
// //     }
// //   }

// // class TemperatureInput extends React.Component {
// //     constructor(props) {
// //       super(props);
// //       this.handleChange = this.handleChange.bind(this);
// //     }

// //     handleChange(e) {
// //       this.props.onTemperatureChange(e.target.value,this.props.scale);
// //     }

// //     render() {
// //       const temperature = this.props.temperature;
// //       const scale = this.props.scale;
// //       return (
// //         <fieldset>
// //           <legend>Enter temperature in {scaleNames[scale]}:</legend>
// //           <input value={temperature}
// //                  onChange={this.handleChange} />
// //         </fieldset>
// //       );
// //     }
// // }


// // ReactDOM.render(<Calculator />, document.getElementById('root'));

// // class Myelement extends React.Component {

// //     constructor(props) {
// //         super(props);
// //         this.handleChange = this.handleChange.bind(this);
// //         this.handleSubmit = this.handleSubmit.bind(this);
// //         this.ihandleChange = this.ihandleChange.bind(this);

// //         this.state = {
// //             value : "小黄",
// //             seleted : "lime",
// //             fruits : new Map([["grapefruit","葡萄柚"],["lime","柠檬"],["coconut","椰子"],["mango","芒果"]]),
// //         }
// //     }

// //     handleChange(event) {
// //         console.log(`change-----` + event.target.value);
// //         this.setState({
// //             seleted : event.target.value
// //         })
// //     }

// //     ihandleChange(event){
// //         console.log(`change-----` + event.target.value);
// //         this.setState({
// //             value : event.target.value
// //         })
// //     }

// //     handleSubmit(event) {
// //         console.log(`handleSubmit-----` + this.state.seleted);
// //         event.preventDefault();
// //     }

// //     getOptions(){
// //         let options = [];
// //         for(let [key,value] of this.state.fruits){ 
// //             options.push(<option key={key} value={key}>{value}</option>)  
// //         } 
// //         return options;
// //     }


// //     render() {
// //         return (
// //             <form onSubmit={this.handleSubmit}>
// //                 <label>
// //                     名字:<input type="text" value={this.state.value} onChange={this.ihandleChange} />
// //                 </label>
// //                 <select value={this.state.seleted} onChange={this.handleChange}> 
// //                     {this.getOptions()}
// //                 </select>
// //                 <input type="submit" value="提交" />
// //             </form>
// //         )
// //     }
// // }



// // ReactDOM.render(<Myelement />, document.getElementById('root'));


// // function Bdiv(props){
// //     return (<h2>{`-------1----------`}</h2>);
// // }

// // function Bdiv2(props){
// //     return (<h2>{`-------2----------`}</h2>);
// // }

// // function ListItems(props){
// //     let items =  props.nums.map( i => {
// //         return <li key={i.toString()}>{i}</li>
// //     })
// //     return <ul>{items}</ul>
// // }

// // class Myelement extends React.Component{

// //     constructor(props){
// //         super(props);
// //         let  nums = [1,2,3,4,5]; 
// //         this.state = {
// //             a  : timer.a ,
// //             p :  { x : 10},
// //             c : "111", 
// //             nums : nums
// //         }   
// //     }

// //     handleClick(){ 
// //         this.setState((state, props) => ({ 
// //              c : "ccc"
// //         }),function(){
// //             console.log(this.state);
// //         }); 
// //     }

// //     render() {   
// //         return (
// //             <div>
// //             <h1 >Hello, world! </h1> 
// //             {
// //                 this.state.c === "ccc" ?  <Bdiv></Bdiv> : null
// //             } 
// //             <button onClick={ ()=> {this.handleClick()}}>
// //                 Click me
// //             </button>
// //             <ListItems nums={this.state.nums}></ListItems>
// //           </div>
// //         );
// //     }

// // } 
// // ReactDOM.render(<Myelement />, document.getElementById('root'));

// // function Square(props) {
// //     return (
// //         <button className="square" onClick={props.onClick}>
// //             {props.value}
// //         </button>
// //     );
// // }

// // class Board extends React.Component {
// //     renderSquare(i) {
// //         return (
// //             <Square
// //                 value={this.props.squares[i]}
// //                 onClick={() => this.props.onClick(i)}
// //             />
// //         );
// //     }

// //     render() {
// //         return (
// //             <div>
// //                 <div className="board-row">
// //                     {this.renderSquare(0)}
// //                     {this.renderSquare(1)}
// //                     {this.renderSquare(2)}
// //                 </div>
// //                 <div className="board-row">
// //                     {this.renderSquare(3)}
// //                     {this.renderSquare(4)}
// //                     {this.renderSquare(5)}
// //                 </div>
// //                 <div className="board-row">
// //                     {this.renderSquare(6)}
// //                     {this.renderSquare(7)}
// //                     {this.renderSquare(8)}
// //                 </div>
// //             </div>
// //         );
// //     }
// // }

// // class Game extends React.Component {
// //     constructor(props) {
// //         super(props);
// //         this.state = {
// //             history: [
// //                 {
// //                     squares: Array(9).fill(null)
// //                 }
// //             ],
// //             stepNumber: 0,
// //             xIsNext: true
// //         };
// //     }

// //     handleClick(i) {
// //         const history = this.state.history.slice(0, this.state.stepNumber + 1);
// //         const current = history[history.length - 1];
// //         const squares = current.squares.slice();
// //         if (calculateWinner(squares) || squares[i]) {
// //             return;
// //         }
// //         squares[i] = this.state.xIsNext ? "X" : "O";
// //         this.setState({
// //             history: history.concat([
// //                 {
// //                     squares: squares
// //                 }
// //             ]),
// //             stepNumber: history.length,
// //             xIsNext: !this.state.xIsNext
// //         });
// //     }

// //     jumpTo(step) {
// //         this.setState({
// //             stepNumber: step,
// //             xIsNext: (step % 2) === 0
// //         });
// //     }

// //     render() {
// //         const history = this.state.history;
// //         const current = history[this.state.stepNumber];
// //         const winner = calculateWinner(current.squares);

// //         const moves = history.map((step, move) => {
// //             const desc = move ?
// //                 'Go to move #' + move :
// //                 'Go to game start';
// //             return (
// //                 <li key={move}>
// //                     <button onClick={() => this.jumpTo(move)}>{desc}</button>
// //                 </li>
// //             );
// //         });

// //         let status;
// //         if (winner) {
// //             status = "Winner: " + winner;
// //         } else {
// //             status = "Next player: " + (this.state.xIsNext ? "X" : "O");
// //         }

// //         return (
// //             <div className="game">
// //                 <div className="game-board">
// //                     <Board
// //                         squares={current.squares}
// //                         onClick={i => this.handleClick(i)}
// //                     />
// //                 </div>
// //                 <div className="game-info">
// //                     <div>{status}</div>
// //                     <ol>{moves}</ol>
// //                 </div>
// //             </div>
// //         );
// //     }
// // }

// // // ========================================

// // ReactDOM.render(<Game />, document.getElementById("root"));

// // function calculateWinner(squares) {
// //     const lines = [
// //         [0, 1, 2],
// //         [3, 4, 5],
// //         [6, 7, 8],
// //         [0, 3, 6],
// //         [1, 4, 7],
// //         [2, 5, 8],
// //         [0, 4, 8],
// //         [2, 4, 6]
// //     ];
// //     for (let i = 0; i < lines.length; i++) {
// //         const [a, b, c] = lines[i];
// //         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
// //             return squares[a];
// //         }
// //     }
// //     return null;
// // }
