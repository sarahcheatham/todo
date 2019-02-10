import React, { Component } from 'react';
import './App.css';


export default class Todolist extends React.Component{
    state = {
        listObj: [],
        inputValue: '',
        itemCount: 0
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
        
        listObj.push({list : this.state.inputValue, checked: false, itemCount: this.state.itemCount++});
        //take the input value, put it in the list
        this.setState({ listObj, inputValue: ''})
    }

    removeItem = (item, index)=>{
        const listObj = [...this.state.listObj];
        listObj.splice(index, 1)
        this.setState({ listObj })
    };

    checkItem = item =>{ 
        const listObj = [...this.state.listObj];
        listObj[listObj.indexOf(item)].checked = !listObj[listObj.indexOf(item)].checked;
        this.setState({ list: listObj });  
    };

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
            }
        });
    }

    render(){
        console.log(this.state.itemCount)
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <h2 className="heading">To Do List:</h2>
                    <div>List Items: {this.state.itemCount}</div>
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