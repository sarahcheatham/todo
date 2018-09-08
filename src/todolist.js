import React, { Component } from 'react';
import './App.css';


export default class Todolist extends React.Component{
    state = {
        listObj: [],
        inputValue: '',
    };

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => this.setState({list: data}))
    }

    handleChange(e){
        this.setState({inputValue: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        const listObj = [...this.state.listObj];
        const newList = listObj.slice();
        // const todoObj = {
        //     "userId": 1,
        //     "id": newList.length,
        //     "title": this.state.inputValue,
        //     "completed": false
        // }
        listObj.push({list : this.state.inputValue, checked: false});
        //take the input value, put it in the list
        this.setState({ listObj, inputValue: ''})
    }

    removeItem = (item, index)=>{
        const listObj = [...this.state.listObj];
        listObj.splice(index, 1)
        this.setState({ listObj })
        // const removedItem = this.state.list.slice();
        // removedItem.splice(index, 1);
        // this.setState({list: removedItem})
    };

    checkItem = item =>{ 
        const listObj = [...this.state.listObj];
        listObj[listObj.indexOf(item)].checked = !listObj[listObj.indexOf(item)].checked;
        this.setState({ list: listObj });
        // this.setState({checked: true})
        // const styles = {
        //     this.state.checked ? styles.crossOut : styles.listItem
        // }
        
    };
    
    // styleItem = (item, index)=>{
    //     if({checked: true}){
    //         const newItem = item.title;
    //         console.log(newItem)
    //         // const newList = this.state.list.slice();
    //         // // console.log(Array.isArray(newList))
    //         // newList.splice(0, 1, strikedItem)
    //         // this.setState({list: newList})
    //     }
    // };

    renderList(){
        const styles = {
            checkedStyle: {
                textDecoration: "line-through"
            },
            uncheckedStyle: {
                textDecoration: "none"
            }
        };

        return this.state.listObj.map((item, index)=>{
            if(item !== " "){
                console.log(item.list)
                return(
                    <li 
                        key={index}
                        item={item.list}
                        index={index}
                        className= "listitem"
                        style= {item.checked ? styles.checkedStyle : styles.uncheckedStyle}
                    >
                        <label className= "checkboxContainer">
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={item.checked}
                                onClick={() => this.checkItem(item)}
                            />
                            <span className="checkmark"/>
                        </label>
                            {item.list} 
                        <button
                            className= "deletebtn"
                            onClick={() =>{
                                this.removeItem(item, index);
                            }}
                        >
                        &times;
                        </button>
                    </li>
                );
                // return<li key={index} item={item} index={index} className="listitem" onChange={(e)=>{this.styleItem(item, index)}}>
                //     <label className="checkboxContainer">
                //         <input type="checkbox" className="checkbox" onChange={(e)=>{this.checkItem(item, index)}}/>
                //         <span className="checkmark"/>
                //     </label>
                //     {item.title}
                //     <button className="deletebtn" onClick={()=>{this.removeItem(item, index)}}>&times;</button>
                // </li> 
            }
        });
    }

    render(){
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <h2 className="heading">To Do List:</h2>
                    <div>
                        <input
                            value={this.state.inputValue} 
                            type="text" 
                            onChange={(e) => this.handleChange(e)}
                            className="inputbox"
                        />
                        <button type="submit" className="button">Add to List</button> 
                    </div>
                    <div>
                        <ul className="listcontainer">
                            {this.renderList()}
                        </ul>
                    </div>
                </form>
            </div>
        );
    }
}