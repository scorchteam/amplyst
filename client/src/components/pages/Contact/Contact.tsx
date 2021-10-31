import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { flask_url } from "../../../App";
import { CustomButton } from "../../general";
import { validateEmail, validateMoreInformation, validateName, validateSubject } from "../../general/AuthHelpers";
import "./Contact.scss";

interface ContactUsFormErrors {
    firstName?: string,
    lastName?: string,
    email?: string,
    subject?: string,
    moreInformation?: string
}

interface ContactUsFormData {
    first_name: string,
    last_name?: string,
    email: string,
    subject: string,
    more_information: string
}

function Contact() {

    const [firstName, updateFirstName] = useState<string>("");
    const [lastName, updateLastName] = useState<string>("");
    const [email, updateEmail] = useState<string>("");
    const [subject, updateSubject] = useState<string>("");
    const [moreInformation, updateMoreInformation] = useState<string>("");
    const [contactUsErrors, updateContactUsErrors] = useState<ContactUsFormErrors>({});
    const [submitError, updateSubmitError] = useState<string>();
    const [formStarted, updateFormStarted] = useState<Boolean>(false);
    const [formSubmitted, updateFormSubmitted] = useState<Boolean>(false);

    const handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        updateFormStarted(true);

        let copyOfErrors = { ...contactUsErrors };

        if (name === "first_name") {
            copyOfErrors["firstName"] = validateName(value);
            updateFirstName(value);
        }

        if (name === "last_name") {
            copyOfErrors["lastName"] = validateName(value);
            if (copyOfErrors["lastName"] === "name must not be blank") {
                copyOfErrors["lastName"] = undefined;
            }
            updateLastName(value);
        }

        if (name === "email") {
            copyOfErrors["email"] = validateEmail(value);
            updateEmail(value);
        }

        if (name === "subject") {
            copyOfErrors["subject"] = validateSubject(value);
            updateSubject(value);
        }

        if (name === "more_information") {
            copyOfErrors["moreInformation"] = validateMoreInformation(value);
            updateMoreInformation(value);
        }

        clearUndefined(copyOfErrors);
        updateContactUsErrors(copyOfErrors);
    }

    const clearUndefined = (errors: ContactUsFormErrors) => {
        if (errors["firstName"] === undefined) {
            delete errors.firstName;
        }
        if (errors["lastName"] === undefined) {
            delete errors.lastName;
        }
        if (errors["email"] === undefined) {
            delete errors.email;
        }
        if (errors["subject"] === undefined) {
            delete errors.subject;
        }
        if (errors["moreInformation"] === undefined) {
            delete errors.moreInformation;
        }
        return;
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        updateSubmitError(undefined);

        if (!formStarted) {
            updateSubmitError("Please input required information into form");
            return;
        }

        if (Object.keys(contactUsErrors).length !== 0) {
            updateSubmitError("Please resolve errors in form");
            return;
        }

        let formBody: ContactUsFormData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            subject: subject,
            more_information: moreInformation
        }

        submitContactForm(formBody);
    }

    const submitContactForm = async (formBody: ContactUsFormData) => {
        /** Create POST request options */
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'crossorigin': 'true',
                'Origin': flask_url
            },
            body: JSON.stringify(formBody)
        };
        console.log(requestOptions.body);
        /** Execute POST request */
        await fetch(flask_url + "/api/contact", requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data === null) {
                    updateFormSubmitted(true);
                    updateFirstName("");
                    updateLastName("");
                    updateEmail("");
                    updateSubject("");
                    updateMoreInformation("");
                } else {
                    updateSubmitError("An error occurred while submitting the form");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="contact-us">
            <div className="contact-us-form">
                <div className="contact-us-form">
                    <Container className="contact-us-container">
                        <div className="contact-us-form-container">
                            <h1>Contact Us</h1>
                            <form onSubmit={handleSubmit}>
                                <p className="text-warning">This is a WIP and not currently functional</p>
                                <div className="contact-us-form-name-fields">
                                    <div className="first-name-field">
                                        <Form.Label htmlFor="first_name">First Name*</Form.Label>
                                        <Form.Control
                                            id="first_name"
                                            name="first_name"
                                            value={firstName}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="John"
                                        />
                                        <p className="text-danger">{contactUsErrors.firstName}</p>
                                    </div>
                                    <div className="last-name-field">
                                        <Form.Label htmlFor="last_name">Last Name</Form.Label>
                                        <Form.Control
                                            id="last_name"
                                            name="last_name"
                                            value={lastName}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="Doe"
                                        />
                                        <p className="text-danger">{contactUsErrors.lastName}</p>
                                    </div>
                                </div>
                                <Form.Label htmlFor="email">Email*</Form.Label>
                                <Form.Control
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleInputChange}
                                    type="email"
                                    placeholder="johndoe@something.com"
                                />
                                <p className="text-danger">{contactUsErrors.email}</p>

                                <Form.Label htmlFor="subject">Subject*</Form.Label>
                                <Form.Control
                                    id="subject"
                                    name="subject"
                                    value={subject}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="subject"
                                />
                                <p className="text-danger">{contactUsErrors.subject}</p>
                                <Form.Label htmlFor="more_information">More Information*</Form.Label>
                                <Form.Control
                                    id="more_information"
                                    name="more_information"
                                    as="textarea"
                                    value={moreInformation}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="info info info..."
                                />
                                <p className="text-danger">{contactUsErrors.moreInformation}</p>
                                <p className="text-danger text-center">{submitError}</p>
                                {
                                    formSubmitted &&
                                    <p className="text-success text-center">Form submmitted successfully. Please Check your email for a copy of your submission</p>
                                }
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