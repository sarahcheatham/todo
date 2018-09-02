import React, { Component } from 'react';
import './App.css';

export default class Todolist extends React.Component{
    state = {
        list: [],
        inputValue: '',
    };

    handleChange(e){
        this.setState({inputValue: e.target.value})

    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.inputValue)
        const newList = this.state.list.slice();
        newList.push(this.state.inputValue);
        console.log(newList);
        //take the input value, put it in the list
        this.setState({list: newList, inputValue: ''})
    }

    renderList(){
        return this.state.list.map((item, index)=>{
            if(item !== ''){
                return <li className="listitem">
                        {item}
                </li>
                 
            } 
        })
    }

    addDeleteLink(){
        const listItems = this.state.newList;
        for(let i = 0; i < listItems; i++){
            console.log(listItems[i])
        }
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