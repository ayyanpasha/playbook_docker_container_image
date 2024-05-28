# Codedamn Container Code

This is made to support the playground communication with:
- FrontEnd: https://github.com/ayyanpasha/codedamn-frontend.git
- Express API: https://github.com/ayyanpasha/playbook_express_api.git
- Communication between client and Dockerized image: https://github.com/ayyanpasha/playbook_docker_proxy_image.git

This repository contains three WebSocket servers that handle various tasks:
- Managing terminal sessions.
- Reading and writing file content.
- Monitoring and sending file structure updates.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>=20.x.x)
- npm (>=10.x.x)
- Docker (for running Ubuntu containers)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ayyanpasha/playbook_docker_container_image.git
   cd playbook_docker_container_image

2. **Install dependencies:**
   ```bash
   npm install

3. **Convert TS to JS:**
    ```bash
    tsc

4. **Create Docker Image:**
    ```bash
    docker build -t terminal-codedamn-server .

5. **Run Docker Image:**
    The container will be created when API request has been made to create new project from server: https://github.com/ayyanpasha/playbook_express_api.git

## Built With

- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.