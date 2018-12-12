import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
handleChangeType = (event) => {
  // event.persist
  // console.log("selection changed", event.target.value)
  this.setState({
    filters: {type: event.target.value}
  })
}

onFindPetsClick = () => {
  let filterType = this.state.filters.type;
  if(filterType === 'all'){
    fetch(`/api/pets`)
    .then(res => res.json())
    .then(data => this.setState({pets: data}))
  } else {
    fetch(`/api/pets?type=${filterType}`)
    .then(res => res.json())
    .then(data => this.setState({pets: data}))
  }
}

onAdoptPet = (id) => {
  const pets = this.state.pets.map((p) => {
    if (p.id === id){
      // p.isAdopted = !pet.isAdopted;
      // return p
      return {...p, isAdopted: true }
    } else {
      return p
    }
  })
  this.setState({
    pets: pets
  })
}
  render() {

    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
              onChangeType={this.handleChangeType}
              onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
