import { Container } from "react-bootstrap";
import "./About.scss";
import nicholasprussen from "./images/nicholasprussen-headshot.jpg";
import timothypoehlman from "./images/timothy-headshot.jpg";
import jerryliu from "./images/jerry-headshot.jpg";

function About() {

  return (
    <div className="about-us">
      <div className="what-is-amplyst">
        <h1 className="what-is-amplyst-h1">What is Amplyst?</h1>
        <p className="what-is-amplyst-description">Amplyst is a passion project started by Nicholas Prussen for the purpose of exploring every aspect of Full Stack Web Development. Users of this site are able to create, edit, update and destroy lists chosen from a set of templates such as Todo, Gift, and Shopping, etc.</p>
      </div>
      <div className="amplyst-technical-specs">
        <h1 className="technical-specs">Amplyst Technical Specs</h1>
        <ul>
          <li>ReactJS</li>
          <li>MongoDB</li>
          <li>Flask</li>
          <li>Bootstrap</li>
          <li>TypeScript</li>
          <li>Flask-Mongoengine</li>
        </ul>
      </div>
      <div className="about-users">
        <div className="about-users-header">
          <Container fluid="md">
            <h2 className="about-users-header-title">Meet the team.</h2>
          </Container>
        </div>
        <div className="teammember-about">
          <Container fluid="md">
            <div className="teammember-about-container">
              <div className="teammember1-col-1">
                <img src={nicholasprussen} alt="Nicholas Prussen's Head" className="teammember-headshot" />
              </div>
              <div className="teammember1-col-2">
                <h1 className="teammember-name"><b>Nicholas Prussen</b></h1>
                <h3 className="teammember-title"><i>Lead Developer, Full Stack Developer</i></h3>
                <p className="teammember-description">Nicholas Prussen is a senior at Boise State University studying Computer Science and is due to graduate with his bachelors in December 2021. Amplyst is a passion project of Nicholas' and was started as a way to journey into all things web development and has expanded into a full stack project with hundreds of hours in development time.</p>
              </div>
            </div>
          </Container>
        </div>
        <div className="teammember-about">
          <Container fluid="md">
            <div className="teammember-about-container-2">
              <div className="teammember1-col-1">
                <h1 className="teammember-name">Timothy Poehlman</h1>
                <h3 className="teammember-title"><i>Backend Developer</i></h3>
                <p className="teammember-description">Graduating this coming December 2021 with a Bachelors in Computer Science, Tim is a Software Engineer who loves to try his hands at new technologies and get involved where he can.  Joining Amplyst to help his friend Nicholas with backend code, Tim has had a great time expanding his backend coding experience.</p>
              </div>
              <div className="teammember1-col-2">
                <img src={timothypoehlman} alt="Timothy Poehlman's Head" className="teammember-headshot" />
              </div>
            </div>
          </Container>
        </div>
        <div className="teammember-about">
          <Container fluid="md">
            <div className="teammember-about-container">
              <div className="teammember1-col-1">
                <img src={jerryliu} alt="Jerry Liu's Head" className="teammember-headshot" />
              </div>
              <div className="teammember1-col-2">
                <h1 className="teammember-name"><b>Jerry Liu</b></h1>
                <h3 className="teammember-title"><i>Software Developer</i></h3>
                <p className="teammember-description">Description</p>
              </div>
            </div>
          </Container>
        </div>
        <div className="about-us-padding"></div>
      </div>
    </div>
  );
}

export default About;