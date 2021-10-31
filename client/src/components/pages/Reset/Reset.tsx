import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { flask_url } from "../../../App";
import { CustomButton } from "../../general";
import { validatePassword } from "../../general/AuthHelpers";
import "./Reset.scss";

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
    password?: string,
    reset_token?: string | null
}

interface ResetPasswordErrors {
    password?: string,
    passwordConfirm?: string,
    submit?: string
}

const Reset = (props: ListProps) => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const [resetToken] = useState<string | null>(urlParams.get('reset_token'));
    const [newUserPassword, updateNewUserPassword] = useState<string>("");
    const [newUserPasswordConfirm, updateNewUserPasswordConfirm] = useState<string>("");
    const [errors, updateErrors] = useState<ResetPasswordErrors>({});
    const [formSubmitted, updateFormSubmitted] = useState<Boolean>(false);
    const [formStarted, updateFormStarted] = useState<Boolean>(false);

    useEffect(() => {
        console.log(resetToken);
    })

    const handleSubmit = (event: any) => {
        event.preventDefault();
        let copyOfErrors = {...errors};

        if(!formStarted) {
            copyOfErrors["submit"] = "Please input a new password";
            updateErrors(copyOfErrors);
            return;
        }

        if(Object.keys(errors).length !== 0) {
            copyOfErrors["submit"] = "Please resolve errors";
            updateErrors(copyOfErrors);
            return;
        }

        let finalCheckErrors =  {
            password: newUserPassword,
            reset_token: resetToken
        }

        submitNewPassword(finalCheckErrors);
    }

    const handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let copyOfErrors = {...errors};

        updateFormStarted(true);

        if(name === "password") {
            copyOfErrors["password"] = validatePassword(value);
            updateNewUserPassword(value);
            updateErrors(copyOfErrors);
        }

        if (name === "passwordConfirm") {
            copyOfErrors["passwordConfirm"] = confirmPassword(newUserPassword, value);
            updateNewUserPasswordConfirm(value);
            updateErrors(copyOfErrors);
        }

        clearUndefined(copyOfErrors);
    }

    const clearUndefined = (errors : ResetPasswordErrors) => {
        if(errors["password"] === undefined) {
            delete errors.password;
        }
        if(errors["passwordConfirm"] === undefined) {
            delete errors.passwordConfirm;
        }
        if(errors["submit"] === undefined) {
            delete errors.submit;
        }
        return;
    }

    const confirmPassword = (password : string, passwordConfirm : string) => {
        if(password !== passwordConfirm) {
            return "Passwords do not match";
        }
        return undefined;
    }

    const submitNewPassword = async (formData: ForgotPasswordFormData) => {
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
        await fetch(flask_url + "/api/user/auth/reset", requestOptions)
            .then(res => res.json())
            .then(data => {
                if(data === null) {
                    updateFormSubmitted(true);
                }
                if(data && "Error" in data) {
                    let copyOfErrors = {...errors};
                    copyOfErrors["submit"] = data["Error"];
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="login-form">
            {
                resetToken === null &&
                <Redirect
                    to={{
                        pathname: "/login"
                    }}
                />
            }
            {
                formSubmitted &&
                <Redirect
                    to={{
                        pathname: "/login"
                    }}
                />
            }
            <Container className="login-container">
                <div className="login-form-container">
                    {
                        formSubmitted &&
                        <>
                            <h3 className="forgot-form-finished">Your password has been reset.</h3>
                            <p><Link to="/login">Login Now</Link></p>
                        </>
                    }
                    {
                        !formSubmitted &&
                        <div>
                            <h1>Reset Password</h1>
                            <form onSubmit={handleSubmit}>
                                <Form.Label htmlFor="password">Password</Form.Label>
                                <Form.Control
                                    id="password"
                                    name="password"
                                    value={newUserPassword}
                                    onChange={handleInputChange}
                                    type="password"
                                    placeholder="reallygoodpassword"
                                />
                                <p className="text-danger">{errors.password}</p>
                                <Form.Label htmlFor="passwordConfirm">Confirm Password</Form.Label>
                                <Form.Control
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    value={newUserPasswordConfirm}
                                    onChange={handleInputChange}
                                    type="password"
                                    placeholder="reallygoodpassword"
                                />
                                <p className="text-danger">{errors.passwordConfirm}</p>
                                <div className="button-container forgot-password-submit">
                                    <p className="text-warning">{errors.submit}</p>
                                    <CustomButton buttonText="Reset My Password" size="lg" type="submit" />
                                </div>
                            </form>
                            <div className="forgot-password">
                            </div>
                        </div>
                    }
                </div>
            </Container>
        </div>
    );
}

export default Reset;