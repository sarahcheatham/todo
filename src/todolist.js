import React, { Component } from 'react';
import './App.css';


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
    
    // styleItem = (e)=>{
    //     const checkedItem = {checked: true};
    //     const addStyle = {
    //         textDecoration: 'line-through'
    //     };
    //     const listItem = this.state.list.slice();
    //     if(checkedItem){
    //         listItem.map((item, index)=>{
    //             console.log([item.addStyle])
    //         })
    //     }
    // };

    renderList(){
        return this.state.list.map((item, index)=>{
            if(item !== ''){
                return <li key={index} item={item} index={index} className="listitem">
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