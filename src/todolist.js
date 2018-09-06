import React, { Component } from 'react';
import './App.css';
import DeleteIcon from '@material-ui/icons/Delete';


export default class Todolist extends React.Component{
    state = {
        list: [],
        inputValue: '',
        checked: false,
    };

    handleChange(e){
        this.setState({inputValue: e.target.value})

    }

    handleSubmit(e){
        e.preventDefault();
        const newList = this.state.list.slice();
        newList.push(this.state.inputValue);
        //take the input value, put it in the list
        this.setState({list: newList, inputValue: ''})
    }

    removeItem = (item, index)=>{
        const removedItem = this.state.list.slice();
        removedItem.splice(index, 1);
        this.setState({list: removedItem})
    };

    checkItem = (item, index)=>{ 
        this.setState({checked: true})
    };
    
    styleItem = (item, index)=>{
        const newItem = item.strike();
        const newList = this.state.list.slice();
        newList.splice(0, 1, newItem)
        this.setState({list: newList})
        
    };

    renderList(){
        return this.state.list.map((item, index)=>{
            if(item !== ''){
                return <li key={index} item={item} index={index} className="listitem" onChange={()=>{this.styleItem(item, index)}}>
                    <label className="checkboxContainer">
                        <input type="checkbox" className="checkbox" onChange={(e)=>{this.checkItem(item, index)}}/>
                        <span className="checkmark"/>
                    </label>
                    {item}
                    <button className="deletebtn" onClick={()=>{this.removeItem(item, index)}}>&times;</button>
                </li> 
            }
        })
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