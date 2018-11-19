import React, { Component } from 'react'


export default class LocationList extends Component {
  render() {
      return (
          <section className="locations">
           <h2>Locations</h2>
          {
              this.props.locations.map(location =>
                  <div key={location.id}>
                      <li>{location.name}<br></br>{location.address}</li>
                  </div>
              )
          }
          </section>
      )
  }
}