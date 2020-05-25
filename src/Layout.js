import React, { Component } from 'react';
import './Layout.scss';
import { Jumbotron, Container } from 'react-bootstrap';

class Layout extends Component {
  render() {
    return(
      <div className="article-feeder-layout">
        <Jumbotron fluid={true} className="banner">
          <h1>The New York Times API feed</h1>
        </Jumbotron>
        <Container>
          {this.props.children}
        </Container>
        <Jumbotron className="footer">
          <span>Developed by: Vitor Ribeiro Carvalho</span>
          <span>Powered by: https://developer.nytimes.com/</span>
        </Jumbotron>
      </div>
    );
  }
}

export { Layout }
