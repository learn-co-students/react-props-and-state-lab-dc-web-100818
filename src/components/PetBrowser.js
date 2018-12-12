import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    // .map cause we need to return an array of pet components to render
    return <div className="ui cards">
      {this.props.pets.map(obj => {
        return <Pet key={obj.id} pet={obj} onAdoptPet={this.props.onAdoptPet}/>
      })}
    </div>
  }

}

export default PetBrowser
