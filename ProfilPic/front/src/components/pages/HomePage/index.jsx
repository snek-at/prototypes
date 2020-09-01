//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Redirect } from "react-router-dom";

//> Additional
import Typed from "react-typed";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBSmoothScroll,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBAlert,
  MDBIcon,
  MDBModal,
} from "mdbreact";

//> Components
import {
  Register,
} from "../../organisms";
import {
  Donate,
} from "../../molecules/modals";

//> Images
import ImageRanking from '../../../assets/body/ranking.png';
import ImageProfiles from '../../../assets/body/profiles.png';
import ImageTrophy from '../../../assets/body/trophy.png';

//> CSS
import "./homepage.scss";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotate: -2,
      modalDonate: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    if(window.pageYOffset < 400) {
      window.addEventListener('scroll', this.handleScroll);
    } else {
      this.setState({
        rotate: 0,
      });
    }
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };

  getRotation = () => {
    return {
      transform: `rotate(${this.state.rotate}deg)`
    }
  }

  handleScroll(event) {
    if(window.pageYOffset <= 400){
      if(window.pageYOffset / 200 < 402){
        this.setState({
          rotate: -2 + (window.pageYOffset / 200)
        });
      } else {
        this.setState({
          rotate: 0,
        });
      }
    } else if(window.pageYOffset > 400){
      this.setState({
        rotate: 0,
      });
    }
  };

  toggle = () => {
    if(!this.state.modalDonate){
      this.setState({
        modalDonate: true
      });
    } else {
      this.setState({
        modalDonate: false
      });
    }
      
  }

  render() {
    const { globalState } = this.props;

    if(!globalState.loading && globalState.logged){
      return(
        <Redirect to={"/u/"+globalState.user} />
      )
    }

    return (
      <div id="home" className="pt-5">
        <MDBContainer className="mb-5">
          <MDBRow className="flex-center">
            <MDBCol md="6" className="whois d-flex align-items-center">
              <div className="d-block">
                <div className="d-flex">
                  <h1>
                    <Typed
                      strings={[
                        'Built for developers.',
                        'Built for photographers.',
                        'Built for programmers.',
                        'Built for engineers.',
                        'Built for students.',
                        'Built for teachers.',
                        'Built for sneks.'
                      ]}
                      typeSpeed={30}
                      backSpeed={50}
                      loop >
                    </Typed>
                  </h1>
                </div>
                <div>
                  <p className="lead">Open Source Social Network</p>
                  <div className="mt-4">
                  <MDBBtn
                  color="white"
                  className="btn-underlined-red"
                  onClick={() => this.setState({modalDonate: true})}
                  >
                  Donate
                  <MDBIcon far icon="heart" className="pl-1 red-text" />
                  </MDBBtn>
                  <MDBSmoothScroll 
                  to="features"
                  className="d-inline"
                  >
                  <MDBBtn
                  color="white"
                  className="btn-underlined-blue"
                  >
                  Our mission
                  <MDBIcon icon="angle-right" className="pl-1 blue-text" />
                  </MDBBtn>
                  </MDBSmoothScroll>
                  </div>
                </div>
              </div>
            </MDBCol>
            <MDBCol md="6">
              <MDBCard className="px-3 py-4">
                <Register 
                login={this.props.login}
                registerUser={this.props.registerUser}
                handleLogin={this.props.globalFunctions.handleLogin}
                globalState={globalState}
                />
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="position-relative">
          <div className="banner-wrapper">
            <div 
            className="banner"
            style={this.getRotation()}
            >
            </div>
          </div>
        </div>
        <section id="features" className="pb-5">
          <MDBContainer>
            <MDBRow className="flex-center text-center white-text mb-5">
              <MDBCol md="4">
                <img src={ImageProfiles} alt="You get profiles" className="img-fluid"/>
                <h2>Profiles</h2>
                <p className="lead">
                Time to spotlight yourself.
                </p>
                <p>
                SNEK provides all the tools to represent yourself,
                in the way you want to be perceived by others. Everything is customizable, 
                from your profile picture up to your profile color theme. We do not intent to
                limit you in any shape or form, so give it a try and create your 21st century portfolio.
                </p>
              </MDBCol>
              <MDBCol md="4">
                <img src={ImageRanking} alt="You get profiles" className="img-fluid"/>
                <h2>Visualizations</h2>
                <p className="lead">
                Visualize your numbers.
                </p>
                <p>
                SNEK evaluates your statistics and builds fancy graphs out of it.
                This makes it possible that everyone can see your passion and skills right away.
                Our visualizations even makes Excel users a little bit envious, so give it a try and create your 21st century portfolio.
                </p>
              </MDBCol>
              <MDBCol md="4">
                <img src={ImageTrophy} alt="You get profiles" className="img-fluid"/>
                <h2>Achievements</h2>
                <p className="lead">
                Climb the ladder.
                </p>
                <p>
                SNEK achievements are based on everyday work, so you will gain achievements
                without any extra effort and climb the ladder while you do the things you love.
                You can also invite your friends and challenge them over achievements, 
                so give it a try and create your 21st century portfolio.
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
        {this.state.modalDonate &&
          <MDBModal 
          modalStyle="white"
          className="text-dark"
          size="sm"
          backdrop={true}
          isOpen={this.state.modalDonate}
          toggle={this.toggle}
          >
            <Donate toggle={this.toggle} />
          </MDBModal>
          }
      </div>
    );
  }
}

export default HomePage;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
