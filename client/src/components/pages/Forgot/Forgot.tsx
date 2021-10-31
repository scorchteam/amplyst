import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { flask_url } from "../../../App";
import { CustomButton } from "../../general";
import { validateEmail } from "../../general/AuthHelpers";
import "./Forgot.scss";

interface ListProps {
    grabUserListData: any,
    history: any,
    location: any,
    logout: any,
    match: any,
    staticContext: any,
    token: string
}

interface ForgotPasswordFormData {
    email?: string
}

interface ForgotPasswordErrors {
    email?: string,
    submit?: string
}

const Forgot = (props: ListProps) => {

    const [userEmail, updateUserEmail] = useState<string>("");
    const [errors, updateErrors] = useState<ForgotPasswordErrors>({});
    const [formSubmitted, updateFormSubmitted] = useState<Boolean>(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        let copyOfErrors = { ...errors };

        console.log(userEmail)

        if (Object.keys(errors).length === 0) {
            copyOfErrors["submit"] = "Please input an email";
            updateErrors(copyOfErrors);
            return;
        }

        if (errors["email"] !== undefined) {
            copyOfErrors["submit"] = "Please resolve email errors";
            updateErrors(copyOfErrors);
            return;
        }

        let finalCheckErrors = {
            email: validateEmail(userEmail)
        }

        if (finalCheckErrors["email"] === undefined) {
            let formData = {
                email: userEmail
            }
            submitEmailForReset(formData);
        } else {
            updateErrors(finalCheckErrors)
        }
    }

    const handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name === "email") {
            let emailErrors = {
                email: validateEmail(value)
            }

            updateUserEmail(value);
            updateErrors(emailErrors);
        }
    }

    const submitEmailForReset = async (formData: ForgotPasswordFormData) => {
        /** Create POST request options */
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'crossorigin': 'true',
                'Origin': flask_url
            },
            body: JSON.stringify(formData)
        };
        console.log(requestOptions.body);
        /** Execute POST request */
        await fetch(flask_url + "/api/user/auth/forgot", requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data && "Error" in data) {
                    let emailErrors = {
                        submit: data["Error"]
                    }
                    updateErrors(emailErrors);
                    return;
                }

                if (data === null) {
                    updateFormSubmitted(true);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="login-form">
            <Container className="login-container">
                <div className="login-form-container">
                    {
                        formSubmitted &&
                        <h3 className="forgot-form-finished">An email has been sent to the address provided</h3>
                    }
                    {
                        !formSubmitted &&
                        <div>
                            <h1>Forgot Password</h1>
                            <form onSubmit={handleSubmit}>
                                <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control
                                    id="email"
                                    name="email"
                                    value={userEmail}
                                    onChange={handleInputChange}
                                    type="email"
                                    placeholder="johndoe@something.com"
                                />
                                <p className="text-danger">{errors.email}</p>
                                <div className="button-container forgot-password-submit">
                                    <p className="text-warning">{errors.submit}</p>
                                    <CustomButton buttonText="Send Me A Reset Email" size="lg" type="submit" />
                                </div>
                            </form>
                            <div className="register-redirect">
                                <p className="left-text">Remember your password?</p>
                                <p><Link to="/login">Login Now</Link></p>
                            </div>
                            <div className="forgot-password">
                            </div>
                        </div>
                    }
                </div>
            </Container>
        </div>
    );
}

export default Forgot;