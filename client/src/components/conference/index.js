import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Card, Row, Button, Col } from "react-bootstrap";
import API from "../../utils/API";
import "./style.css";

function Conference({ conference }) {
	const { user } = useAuth0();
	const history = useHistory();

	function handleRegister(confid) {
		console.log("from component")
		const email = { email: user.email }
		API.updateRegisteredById(confid, email).then(() => {
			alert("Registered")
		})
	}

	function handleDelete(confId) {
		API.deleteConference(confId).then(
			history.push("/deleted")
		)
	}

	return (
		<div>
			{conference.map(e => (
				<Col>
					<Row>

						<div className="backgroundBody m-3 " style={{ width: "100%", borderRadius: "15px", }} key={e.title}>
							<Card.Body  >

								<Card style={{ borderRadius: "10px" }}>
									<Card.Header>
										<Row>
											<Col lg={10}>
												<h2 style={{ fontSize: "1.5vw" }}>{e.title}</h2>
											</Col>
											<Col lg={2}>
												{user.email === e.email &&
													<Link to={{
														state: { confInfo: conference },
														pathname: `/deleted`
													}}>

														<Button data-toggle="popover" title="Delete This Conference" onClick={() => handleDelete(e._id)}>
															<svg width="1.5vw" height="1.5vw" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
																<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
																<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
															</svg>
														</Button>
													</Link>}
											</Col>

										</Row>
									</Card.Header>



									<Card.Body>
										<Row>
											<Col lg={8} md={12}>
												<div style={{ fontSize: "1vw", overFlow: "auto" }}>{e.description}</div>


											</Col>
											<Col lg={4} md={12}>
												<div style={{ textAlign: "center" }}>
													<Row >

														<div>
															<h3 style={{ fontSize: ".8vw" }} >Live/Virtual:</h3>
														</div>
														<div>
															<h3 style={{ fontSize: ".8vw", fontWeight: "bold", paddingLeft: "0.5vw" }}>{e.confType.toUpperCase()}</h3>
														</div>

													</Row>
												</div>


												<div>
													<Row>
														<h3 style={{ fontSize: ".8vw" }}>Dates:</h3>

														<h3 style={{ fontSize: ".8vw", fontWeight: "bold", paddingLeft: "0.5vw" }}>{e.StartDate.slice(5).replace("-", "/")} | {e.EndDate.slice(5).replace("-", "/")}</h3>
													</Row>
												</div>


												<div className="pt-5">
													<Row>
														<Col lg={12}>
                                                            {user.email !== e.email &&                                         
																<div>
																	<Button style={{ width: "100%", marginTop: "6.5vh" }} onClick={() => handleRegister(e._id)}>Register</Button>
																</div>}
														</Col>

														<Col lg={12}>
															{user.email === e.email &&
																<div>
																	<Link to={{
																		state: { confInfo: conference },
																		pathname: `/edit_conference/${e._id}`
																	}}>
																		<Button style={{ width: "100%" }}>Edit</Button>
																	</Link>
																</div>}
														</Col>
														<Col lg={12}>
															{user.email === e.email &&
																<div className="pt-2">

																	<Link to={{
																		state: { confInfo: conference },
																		pathname: `/add_session/${e._id}`
																	}}>
																		<Button style={{ width: "100%" }}>Add session</Button>
																	</Link>
																</div>}
														</Col>
													</Row>
													<Row>
														<Col lg={12}>
															<div className="pt-2">
																<Link to={{
																	state: { confInfo: conference },
																	pathname: `/conferences/${e._id}`
																}}>
																	<Button style={{ width: "100%" }} >Details</Button>
																</Link>
															</div>
														</Col>
													</Row>
												</div>
											</Col>
										</Row>
										<div style={{ borderTop: "1px solid #33A5FF", marginTop: "2vh", paddingTop: "1vh" }}>
											<div className="ml-3">
												<Row>
													{e.confType === "live" &&
														<>
															<div >
																<h3 style={{ fontSize: "1vw", fontWeight: "bold", }}>Location</h3>
															</div>
															<div>
																<h3 style={{ fontSize: "1vw", paddingLeft: "1vw" }}><a target={"_blank"} href={`https://www.google.com/maps/search/${e.location.replace(" ", "+")}`}>{e.location}</a></h3>
															</div>
														</>}
													{e.confType === "virtual" &&
														<>
															<div >
																<h3 style={{ fontSize: "1vw", fontWeight: "bold", }}>URL</h3>
															</div>
															<div>
																<h3 style={{ fontSize: "0.7vw", paddingLeft: "1vw" }}><a target={"_blank"} href={e.location}>{e.location}</a> </h3>
															</div>
														</>}
												</Row>
											</div>
										</div>
									</Card.Body>

								</Card>

							</Card.Body>
						</div>
					</Row>
				</Col>
			))}
		</div >
	);
}

export default Conference;


