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
      filters: {
        type: event.target.value
      }
    })
  }

  onFindPetsClick = () => {
    const filterType = this.state.filters.type
    if (filterType === 'all') {
    fetch('/api/pets')
      .then(res => res.json())
      .then(data => this.setState({pets: data}))
    } else {
      fetch(`/api/pets?type=${filterType}`)
        .then(res => res.json())
        .then(data => this.setState({pets: data}))
    }
  }

// only mutated object is a new object, the rest is a copy of old objects
  onAdoptPet = (id) => {
    const pets = this.state.pets.map((obj) => {
      if (obj.id === id) {
        return {...obj, isAdopted: true} // -> {} creates a new obj
      } else {
        return obj
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets}
              onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
