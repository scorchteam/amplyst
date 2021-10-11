import { Container, Form } from "react-bootstrap";
import { CustomButton } from "../../general";
import "./Contact.scss";

function Contact() {

    return (
        <div className="contact-us">
            <div className="contact-us-form">
                <div className="contact-us-form">
                    <Container className="contact-us-container">
                        <div className="contact-us-form-container">
                            <h1>Contact Us</h1>
                            <form>
                                <div className="contact-us-form-name-fields">
                                    <div className="first-name-field">
                                        <Form.Label htmlFor="first_name">First Name*</Form.Label>
                                        <Form.Control
                                            id="first_name"
                                            name="first_name"
                                            // value={this.state.email}
                                            // onChange={this.handInputChange}
                                            type="text"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="last-name-field">
                                        <Form.Label htmlFor="last_name">Last Name</Form.Label>
                                        <Form.Control
                                            id="last_name"
                                            name="last_name"
                                            // value={this.state.email}
                                            // onChange={this.handInputChange}
                                            type="text"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                                <Form.Label htmlFor="email">Email*</Form.Label>
                                <Form.Control
                                    id="email"
                                    name="email"
                                    // value={this.state.email}
                                    // onChange={this.handInputChange}
                                    type="email"
                                    placeholder="johndoe@something.com"
                                />
                                {/* <p className="text-danger">{this.state.errors.email}</p> */}

                                <Form.Label htmlFor="subject">Subject*</Form.Label>
                                <Form.Control
                                    id="subject"
                                    name="subject"
                                    // value={this.state.password}
                                    // onChange={this.handInputChange}
                                    type="text"
                                    placeholder="subject"
                                />
                                <Form.Label htmlFor="more_information">More Information*</Form.Label>
                                <Form.Control
                                    id="more_information"
                                    name="more_information"
                                    as="textarea"
                                    // value={this.state.password}
                                    // onChange={this.handInputChange}
                                    rows={3}
                                    placeholder="info info info..."
                                />
                                {/* <p className="text-danger">{this.state.errors.password}</p> */}
                                {/* <p className="text-danger text-center">{this.state.errors.login}</p> */}
                                <div className="button-container">
                                    <CustomButton buttonText="Submit" size="lg" type="submit" />
                                </div>
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default Contact;