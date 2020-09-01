//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBBtn,
  MDBBadge,
  MDBIcon,
  MDBPageItem,
  MDBCardHeader,
  MDBMedia,
  MDBPageNav,
  MDBPagination,
} from "mdbreact";

//> CSS
import "./talk.scss";

class TalkPage extends React.Component {
  state = {
    talk: undefined,
  };

	componentWillMount = async () => {
		if (this.props.match) {
			if (this.props.match.params) {
				if (this.props.match.params.talk && this.props.match.params.username) {
					const uid = this.props.match.params.talk;
					const username = this.props.match.params.username;
					if (
						this.props.globalState.fetchedUser === undefined ||
						this.state.talk === undefined
					) {
            let talk = await this.props.getTalk(uid, username);

						talk.social = {
							likes: 17,
							date: new Date().toLocaleDateString("en-US", {
								year: "numeric",
								month: "numeric",
								day: "numeric",
							}),
            };
            console.log(talk.interval, "xxxx");
            talk.interval = {
              timeoutID: setInterval(() => this.updateIframe(), 4000),
              loaded: false,
            };
						this.setState({ talk });
					}
				}
			}
		}
  };
  
  
  updateIframe = () => {
    let iframe;
    let talk = this.state.talk;

    if (talk.interval.loaded === false) {
      if (document.getElementById(talk.uid)) {
        iframe = document.getElementById(talk.uid);
        iframe.src = talk.displayUrl;
      }
    }  
  }

  render() {
    const talk = this.state.talk;

		return (
			<div id="talk">
				{talk && (
					<>
						<MDBContainer>
							<MDBRow>
								<MDBCol lg="12">
									{talk.location === "snek" && (
										<a
											href={talk.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<MDBBadge color="elegant-color">
												<MDBIcon fab icon="github" />
												Open source
											</MDBBadge>
										</a>
									)}
									<p />
								</MDBCol>
								<MDBCol lg="12">
									<MDBCard>
										<MDBCardBody>
											<iframe
                        src={talk.displayUrl}
                        id={talk.uid}
												width="100%"
                        height="620px"
                        onLoad={() => {
                          clearInterval(talk.interval.timeoutID);
                          talk.interval.loaded = true;
                        }}
                        onError={() => {
                          this.state.talk.interval = {
                            timeoutID: setInterval(() => this.updateIframe(talk), 4000),
                            loaded: false,
                          }
                        }}
                        frameBorder="0"
											/>
										</MDBCardBody>
									</MDBCard>
								</MDBCol>
								<MDBCol lg="12">
									<MDBCard>
										<MDBCardBody>
											<MDBRow className="d-flex align-items-center">
												<MDBCol lg="2">
													<img
														src={talk.repository.avatarUrl}
														alt="logo"
														className="img-fluid"
													/>
												</MDBCol>
												<MDBCol lg="10">
													<div className="d-flex justify-content-space-between">
														<div>
															<p className="lead font-weight-bold mb-1">
																Owned by {talk.repository.owner.username}
															</p>
															{talk.repository.owner && (
																<div className="verified-badge mb-1">
																	<MDBBadge color="success">
																		<MDBIcon icon="check-circle" />
																		Verified
																	</MDBBadge>
																</div>
															)}
															<p className="text-muted mb-1">
																{talk.repository.description}
															</p>
														</div>
														<div className="d-flex">
															<a>
																<MDBBtn color="indigo" size="md">
																	<MDBIcon icon="thumbs-up"></MDBIcon>
																	Like
																</MDBBtn>
															</a>
															<a>
																<MDBBtn color="green" size="md">
																	<MDBIcon icon="heart"></MDBIcon>
																	Follow
																</MDBBtn>
															</a>
														</div>
													</div>
													<div>
														{talk.location === "github" && (
															<a
																href={talk.url}
																target="_blank"
																rel="noopener noreferrer"
															>
																<MDBBadge color="elegant-color">
																	<MDBIcon fab icon="github" />
																	Open source
																</MDBBadge>
															</a>
														)}
														{talk.location === "snek" && (
															<a
																href={talk.url}
																target="_blank"
																rel="noopener noreferrer"
															>
																<MDBBadge color="green">
																	<MDBIcon icon="dragon" />
																	On SNEK
																</MDBBadge>
															</a>
														)}
													</div>
												</MDBCol>
											</MDBRow>
										</MDBCardBody>
										<MDBCardFooter className="px-4 py-3">
											<div className="stats d-flex">
												{talk.social && (
													<span className="d-inline-block mr-4">
														<MDBIcon
															icon="thumbs-up"
															className="green-text font-weight-bold"
														/>{" "}
														<span className="font-weight-bold green-text">
															{talk.social.likes}
														</span>{" "}
														likes
														<br />
														<small className="text-muted">
															published on {talk.social.date}
														</small>
													</span>
												)}
												{talk.download && (
													<a href={talk.downloadUrl}>
														<span className="d-inline-block mr-4">
															<MDBIcon
																icon="file-download"
																className="blue-text font-weight-bold"
															/>{" "}
															download
														</span>
													</a>
												)}
											</div>
										</MDBCardFooter>
									</MDBCard>
								</MDBCol>
								{/* <MDBCol lg="12">
              <MDBCard>
                <MDBCardBody>
                  {talk1.repository.readme}
                </MDBCardBody>
              </MDBCard>
            </MDBCol> */}
              </MDBRow>
            </MDBContainer>
            <MDBContainer>
              <MDBCardHeader className="border-0 font-weight-bold">
                <p className="mr-4 mb-0">4 comments</p>
              </MDBCardHeader>
              <MDBMedia className="d-block d-md-flex mt-4">
                <img
                  className="card-img-64 d-flex mx-auto mb-3"
                  src="https://mdbootstrap.com/img/Photos/Avatars/img (20).jpg"
                  alt=""
                />
                <MDBMedia
                  body
                  className="text-center text-md-left ml-md-3 ml-0"
                >
                  <h5 className="font-weight-bold mt-0">
                    Miley Steward
                    <MDBIcon icon="reply" className="pull-right ml-2" />
                  </h5>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                  <MDBMedia className="d-block d-md-flex mt-4">
                    <img
                      className="card-img-64 d-flex mx-auto mb-3"
                      src="https://mdbootstrap.com/img/Photos/Avatars/img (27).jpg"
                      alt=""
                    />
                    <MDBMedia
                      body
                      className="text-center text-md-left ml-md-3 ml-0"
                    >
                      <h5 className="font-weight-bold mt-0">
                        Tommy Smith
                        <MDBIcon icon="reply" className="pull-right ml-2" />
                      </h5>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                      <div className="form-group mt-4">
                        <label htmlFor="quickReplyFormComment">
                          Your comment
                        </label>
                        <textarea
                          className="form-control"
                          id="quickReplyFormComment"
                          rows="5"
                        ></textarea>
                        <div className="text-center my-4">
                          <MDBBtn size="sm" color="primary">
                            Post
                          </MDBBtn>
                        </div>
                      </div>
                      <MDBMedia className="d-block d-md-flex mt-4">
                        <img
                          className="card-img-64 d-flex mx-auto mb-3"
                          src="https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg"
                          alt=""
                        />
                        <MDBMedia
                          body
                          className="text-center text-md-left ml-md-3 ml-0"
                        >
                          <h5 className="font-weight-bold mt-0">
                            Sylvester the Cat
                            <MDBIcon icon="reply" className="pull-right ml-2" />
                          </h5>
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident, sunt
                          in culpa qui officia deserunt mollit anim id est
                          laborum.
                        </MDBMedia>
                      </MDBMedia>
                    </MDBMedia>
                  </MDBMedia>
                </MDBMedia>
              </MDBMedia>
              <MDBMedia className="d-block d-md-flex mt-4">
                <img
                  className="card-img-64 d-flex mx-auto mb-3"
                  src="https://mdbootstrap.com/img/Photos/Avatars/img (30).jpg"
                  alt=""
                />
                <MDBMedia
                  body
                  className="text-center text-md-left ml-md-3 ml-0"
                >
                  <h5 className="font-weight-bold mt-0">
                    Caroline Horwitz
                    <MDBIcon icon="reply" className="pull-right ml-2" />
                  </h5>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </MDBMedia>
              </MDBMedia>
              <MDBPagination className="d-flex justify-content-center mt-5">
                <MDBPageItem disabled>
                  <MDBPageNav>
                    <span>First</span>
                  </MDBPageNav>
                </MDBPageItem>
                <MDBPageItem disabled>
                  <MDBPageNav aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </MDBPageNav>
                </MDBPageItem>
                <MDBPageItem active>
                  <MDBPageNav>
                    1 <span className="sr-only">(current)</span>
                  </MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav>2</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav>3</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav>4</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav>5</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav>&raquo;</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav>Last</MDBPageNav>
                </MDBPageItem>
              </MDBPagination>
            </MDBContainer>
          </>
        )}
      </div>
    );
  }
}

export default TalkPage;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
