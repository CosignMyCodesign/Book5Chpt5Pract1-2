import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'


export default class ApplicationViews extends Component {
// Need to start with empty arrays in state
    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: []
    }
// componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    componentDidMount() {
      const newState = {}
  
      fetch("http://localhost:5002/animals")
          .then(r => r.json())
          .then(animals => newState.animals = animals)
          .then(() => fetch("http://localhost:5002/employees")
          .then(r => r.json()))
          .then(employees => newState.employees = employees)
          .then(() => fetch("http://localhost:5002/owners")
          .then(r => r.json()))
          .then(owners => newState.owners = owners)
          .then(() => fetch("http://localhost:5002/locations")
          .then(r => r.json()))
          .then(locations => newState.locations = locations)
          .then(() => this.setState(newState))
          }

// Chapter 5 addition
// Method to delete an animal
      deleteAnimal = id => {
      return fetch(`http://localhost:5002/animals/${id}`, {
          method: "DELETE"
      })
      .then(e => e.json())
      .then(() => fetch(`http://localhost:5002/animals`))
      .then(e => e.json())
      .then(animals => this.setState({
          animals: animals
      })
    )
  }
// Method to remove an owner
      removeOwner = id => {
        return fetch(`http://localhost:5002/owners/${id}`, {
            method: "DELETE"
        })
        .then(e => e.json())
        .then(() => fetch(`http://localhost:5002/owners`))
        .then(e => e.json())
        .then(owners => this.setState({
            animals: owners
        })
      )
      }
// Method to fire an employee
      fireEmployee = id => {
        return fetch(`http://localhost:5002/employees/${id}`, {
            method: "DELETE"
        })
        .then(e => e.json())
        .then(() => fetch(`http://localhost:5002/employees`))
        .then(e => e.json())
        .then(employees => this.setState({
            animals: employees
        })
      )
      }
// Once the data is fetched we need to render that data
    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/animals" render={(props) => {
                    return <AnimalList
                     animals={this.state.animals}
                     deleteAnimal={this.deleteAnimal} />
                }} />
                <Route path="/employees" render={(props) => {
                    return <EmployeeList 
                    employees={this.state.employees}
                    fireEmployee={this.state.fireEmployee} />
                }} />
                <Route path="/owners" render={(props) => {
                    return <OwnerList 
                    owners={this.state.owners}
                    removeOwner={this.removeOwner} />
                }} />
            </React.Fragment>
        )
    }
}

