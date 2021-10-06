<h1 align="center">
<img src="https://i.ibb.co/nCtX23w/amplyst-github-header.png" alt="amplyst-github-header" border="0">
</h1>

<div align="center">
<img alt="Website" src="https://img.shields.io/website?down_color=red&down_message=down&up_color=green&up_message=up&url=https%3A%2F%2Fwww.amplyst.com">
<img src="https://img.shields.io/badge/Made with-Python-4B8BBE" alt="Website shields.io">
<img src="https://img.shields.io/badge/Made with-React-61dbfb" alt="Website shields.io">
</div>

## Table of Contents
<details>
<summary>Click to expand</summary>
</details>

## About
Amplyst is an initiative to create a one-stop shop for all your listing needs.

## Development
Follow these steps to download and start the development environment:

### Requirements:
- docker
- docker-compose

### Installation Steps:
1. Clone the repository into a known directory
    ```
    $ git clone https://github.com/scorchteam/amplyst.git
    ```
2. Move to the downloaded repository
    ```
    $ cd amplyst/
    ```
3. Create JWT_SECRET_KEY environment variable. (Replace {JWT_SECRET_KEY} with secret key)
    ```
    $ export JWT_SECURITY_KEY={JWT_SECRET_KEY}
    ```
4. Build the docker image using docker-compose
    ```
    $ sudo docker-compose build
    ```
5. Run the built docker image
    ```
    $ sudo docker-compose up
    ```
6. Open the deployed site at http://localhost:3000
## Team
Read about our team on [Amplyst](https://www.amplyst.com/about)

## TODO
- Finish README table of contents
- Create production docker-compose for production deployment
