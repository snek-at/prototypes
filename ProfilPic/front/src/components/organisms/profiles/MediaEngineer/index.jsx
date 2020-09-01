//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Redirect } from "react-router-dom";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBAlert,
  MDBBadge,
  MDBView,
  MDBMask,
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBProgress,
  MDBIcon,
} from "mdbreact";
// Chart.js
import { Doughnut } from "react-chartjs-2";

//> Components
import {
  ProfileContent,
} from "../../../organisms";
import {
  OverviewMedia,
  Projects,
} from "../../../organisms/tabs";
import {
  Settings,
} from "../../../molecules/modals";

//> CSS
// This file uses the SCSS of the Profile Page

class MediaEngineer extends React.Component {
  state = {
    showSettings: false,
  }

  componentDidMount = () => {
    console.log("########## MEDIA ###########");
  }

  saveSettings = (state) => {
    this.props.saveSettings(state);
  }

  displaySources = (sources) => {
    let res = sources.map((source, i) => {
      switch(source.source){
        case "github":
          return "github";
        case "gitlab":
          return "gitlab";
        case "bitbucket":
          return "bitbucket";
        default:
          return false;
      }
    });
    this.setState({
      sources: res
    });
  }

  _increaseBrightness = (hex, percent) => {
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
       ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
  }

  displayDoughnut = (skills) => {
    let dataLabels = [];
    let dataBackground = [];
    let dataBackgroundHover = [];
    let dataData = [];

    skills.map((skill, i) => {
      dataLabels.push(skill.name);
      if(skill.color){
        dataBackground.push(skill.color);
        dataBackgroundHover.push(this._increaseBrightness(skill.color, 10));
      } else {
        dataBackground.push("#ffffff");
        dataBackgroundHover.push(this._increaseBrightness("#ffffff", 10));
      }
      dataData.push(skill.share);
    });

    this.setState({
      dataDoughnut: {
        labels: dataLabels,
        datasets: [
          {
            data: dataData,
            backgroundColor: dataBackground,
            hoverBackgroundColor: dataBackgroundHover
          }
        ]
      }
    });
  }

  handleSettingsClose = () => {
    if(this.state.showSettings){
      this.setState({
        showSettings: false
      });
    }
  }

  render() {
    const { globalState } = this.props;
    console.log(globalState);

    if(globalState.loading && !globalState.fetchedUser) return <Redirect to="/"/>;

    if(globalState.fetchedUser && !this.state.sources){
      this.displaySources(globalState.fetchedUser.sources);
      this.displayDoughnut(globalState.fetchedUser.platformData.user.skills);
    }

    return (
      <>
      <MDBContainer id="profile" className="py-3">
        <MDBRow>
          <MDBCol md="3" className="social">
            <MDBView>
              <img 
              className="img-fluid main-avatar"
              src={globalState.fetchedUser && globalState.fetchedUser.platformData.user.avatarUrl}
              />
              <MDBMask />
            </MDBView>
            <div className="bg-elegant py-3 px-3">
              <h4 className="mb-0">
              {globalState.fetchedUser && 
              globalState.fetchedUser.platformData.user.first_name && 
              globalState.fetchedUser.platformData.user.last_name &&
              <>
                {globalState.fetchedUser.platformData.user.first_name + " "}
                {globalState.fetchedUser.platformData.user.last_name}
              </>
              }
              </h4>
              {globalState.fetchedUser && globalState.fetchedUser.platformData.user.company &&
              <>
              {globalState.fetchedUser && globalState.fetchedUser.platformData.user.settings.showCompanyPublic &&
                <small className="text-muted py-3">
                {globalState.fetchedUser.platformData.user.company}
                </small>
              }
              </>
              }
              <div className="badges">
              {globalState.fetchedUser && globalState.fetchedUser.accessories.badges &&
                <>
                {globalState.fetchedUser.accessories.badges.bids.map((bid, i) => {
                  switch(bid){
                    case "6403bf4d17b8472735a93b71a37e0bd0":
                      return(
                        <MDBBadge color="secondary-color" key={i}>
                          Alpha
                        </MDBBadge>
                      )
                  }
                })}
                </>
              }
              </div>
              <div className="connected mt-2 text-muted">
                <MDBIcon 
                fab
                icon="instagram"
                size="lg"
                className={this.state.sources && this.state.sources.includes("github") ? "active" : ""}
                />
                <MDBIcon 
                fab
                icon="linkedin"
                size="lg"
                className={this.state.sources && this.state.sources.includes("gitlab") ? "active" : ""}
                />
                <MDBIcon 
                fab
                icon="pinterest"
                size="lg"
                className={this.state.sources && this.state.sources.includes("bitbucket") ? "active" : ""}
                />
              </div>
              {globalState.fetchedUser && (globalState.fetchedUser.username !== globalState.user) ? (
                <div className="mt-2">
                {true ? (
                  <MDBBtn
                  color="green"
                  className="mx-0 px-4"
                  size="md"
                  >
                  <MDBIcon icon="plus-circle" className="mr-2" />
                  Follow
                  </MDBBtn>
                ) : (
                  <MDBBtn
                  color="green"
                  className="mx-0 px-4"
                  size="md"
                  >
                  <MDBIcon icon="check" className="mr-2" />
                  Following
                  </MDBBtn>
                )}
                  
                </div>
              ) : (
                <div className="mt-2">
                  <MDBBtn
                  color="grey"
                  className="mx-0 px-4 w-100"
                  size="md"
                  onClick={() => this.setState({showSettings: true})}
                  >
                  <MDBIcon icon="cogs" className="mr-1" />
                  Settings
                  </MDBBtn>
                </div>
              )}
            </div>
            <div className="bg-light py-3 px-2">
            {globalState.fetchedUser && globalState.fetchedUser.platformData.user.status &&
              <>
              {globalState.fetchedUser.platformData.user.statusEmojiHTML &&
                <div dangerouslySetInnerHTML={{__html: globalState.fetchedUser.platformData.user.statusEmojiHTML}} />
              }
                <small className="px-1">
                {globalState.fetchedUser.platformData.user.status}
                </small>
              </>
            }
              <hr />
              <p>My top skills</p>
              <div className="px-4">
                <Doughnut data={this.state.dataDoughnut} options={{ 
                  responsive: true, 
                  legend: {
                    display: false,
                  },
                }} height="300" />
              </div>
            </div>
          </MDBCol>
          <MDBCol md="9" className="content p-0">
            <ProfileContent
            projectCount={globalState.fetchedUser && globalState.fetchedUser.platformData.repos.length}
            >
              <OverviewMedia
              id={0}
              mapData={globalState.fetchedUser && globalState.fetchedUser.platformData.user.mapData}
              instagram={{
                instagramPosts: globalState.fetchedUser && globalState.fetchedUser.platformData.user.instagram,
                hideCaption: globalState.fetchedUser && 
                globalState.fetchedUser.platformData.user.settings.instagramHideCaption
              }}
              />
            </ProfileContent>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {this.state.showSettings &&
      <Settings {...this.props} closeModal={this.handleSettingsClose} saveSettings={this.saveSettings} />
      }
      </>
    );
  }
}

export default MediaEngineer;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
