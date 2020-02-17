import React, { Component } from 'react';
import './Banner.scss';
import logo from './Media/logo.png';


export default class Banner extends Component {

    render() {
      return (
        <div id="Banner">
          <img src={logo}></img>
        </div>
      );
    }
}
