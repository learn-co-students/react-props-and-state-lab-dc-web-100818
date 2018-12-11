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

  changeFilter = (word) => {
    this.setState({
      filters: {
        type: word
      }
    })
  }

  adoptPet = (id) => {
    let currentPets = [...this.state.pets]
    let petId = id
    console.log(petId)
    let findPet = currentPets.find(pet => {
      return pet.id == petId
    })
    findPet.isAdopted = true;
 

    this.setState({
      pets: currentPets
      
    })
  }

  fetchAPI = () => {
    let petValue = this.state.filters.type
    if ( petValue === 'all') {
      fetch('/api/pets')
        .then(response => response.json())
        .then(data => {
          this.setState({
            pets: data
          })
        })
    } else {
      fetch(`/api/pets?type=${petValue}`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            pets: data
          })
        })
    }
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
              <Filters onFindPetsClick={this.fetchAPI} onChangeType={this.changeFilter} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
