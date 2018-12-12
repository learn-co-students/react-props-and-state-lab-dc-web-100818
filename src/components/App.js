import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
      filters: {type: event.target.value}
    })
  }

  onFindPetsClick = () => {
    let filterType = this.state.filters.type;

    if (filterType === 'all') {
      fetch('/api/pets')
        .then(res => res.json())
        .then(json => this.setState({pets: json}))
    } else {
      fetch(`/api/pets?type=${filterType}`)
        .then(res => res.json())
        .then(json => this.setState({pets: json}))
  }
}

  onAdoptPet = (id) => {
    let currentPets = [...this.state.pets]
    let pet = currentPets.find( (pet, index) => {
      return pet.id === id
    })
    pet.isAdopted = true
     this.setState({
      pets: currentPets
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
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
