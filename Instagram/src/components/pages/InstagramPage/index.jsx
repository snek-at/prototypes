//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { Redirect } from "react-router-dom";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBSmoothScroll,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBBtn,
  MDBIcon,
} from "mdbreact";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";
import Geocode from "react-geocode";
//#endregion

//#region > Components
/** @class This component displays the landing page including login and register */
class InstagramPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken:
        "IGQVJWSjRJcjJYMHc4NGdoSlZADZA0MydHVVQkhXUDJwbVFHcC1mQkdaR1JnTTFBQXI5X01tTk84VDhkQWFZANEh5ZAmpHOWR4Yldmc2x2X3hHUG5jd0djcVVTZA0RhM3hJZAzEtY1czazVR",
      posts: [],
    };
  }

  componentWillMount = () => {
    this.refreshToken();
    this.getUserPosts();
  };

  refreshToken = () => {
    const refreshURL =
      `https://graph.instagram.com/refresh_access_token` +
      `?grant_type=ig_refresh_token` +
      `&access_token=${this.state.accessToken}`;

    fetch(refreshURL)
      .then(async (res) => await res.json())
      .then(async (res) => {
        this.setState({ accessToken: res.access_token });
      });
  };

  getUserPosts = () => {
    const userURL = `https://graph.instagram.com/me/media?fields=id&access_token=${this.state.accessToken}`;

    fetch(userURL)
      .then(async (res) => await res.json())
      .then(async (res) => {
        this.setState({ posts: res.data });
        this.getPostData();
      });
  };

  getPostData = async () => {
    let posts = [];

    for (let post of this.state.posts) {
      let mediaURL = `https://graph.instagram.com/${post.id}?fields=id,media_type,media_url,username,timestamp,permalink&access_token=${this.state.accessToken}`;

      await fetch(mediaURL)
        .then(async (res) => await res.json())
        .then((res) => {
          posts.push(res);
        });
    }

    this.setState({ posts }, () => this.getSite());
  };

  getSite = async () => {
    let posts = [];

    for (let post of this.state.posts) {
      await fetch(post.permalink)
        .then(async (res) => await res.text())
        .then(async (res) => {
          post.content = res;

          posts.push(post);
        });
    }

    this.setState({ posts }, () => this.getMetaData());
  };

  getMetaData = async () => {
    let posts = [];

    for (let post of this.state.posts) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(post.content, "text/html");
      let meta = doc.querySelectorAll('[type="application/ld+json"]');

      for (let data of meta) {
        data = JSON.parse(data.textContent);

        if ("contentLocation" in data) {
          post.meta = data;
        }
      }

      posts.push(post);
    }

    this.setState({ posts }, () => this.getGeoLocation());
  };

  getGeoLocation = async () => {
    let posts = [];

    for (let post of this.state.posts) {
      const geoLocationUrl = `https://nominatim.openstreetmap.org/search/?format=json&q=${post.meta.contentLocation.name}`;

      await fetch(geoLocationUrl)
        .then(async (res) => await res.json())
        .then((res) => {
          if (Array.isArray(res)) {
            res = res[0];
          }
          post.meta.contentLocation.lon = res.lon;
          post.meta.contentLocation.lat = res.lat;
        });

      posts.push(post);
    }

    this.setState({ posts });
  };

  render() {
    if (this.state.posts != []) {
      return (
        <div>
          {this.state.posts.map((post, i) => {
            return JSON.stringify(post);
          })}
        </div>
      );
    }
  }
}
//#endregion

//#region > Exports
//> Default Component
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 */
export default InstagramPage;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
