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

  handleChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  handleFindPets = () => {
    let type = this.state.filters.type
    if(type !== 'all') {
      fetch(`/api/pets?type=${type}`).then(res => res.json()).then(pets => {
        this.setState({pets: pets})
      })
    }

    else {
      fetch('/api/pets').then(res => res.json()).then(pets => {
        this.setState({pets: pets})
      })
    }
  }

  adoptPet = (id) => {
    let currentPets = [...this.state.pets]
    let pet = currentPets.find( (pet, index) => {
      return pet.id === id
    })
    console.log(pet);
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
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.handleFindPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
