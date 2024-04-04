# Fake_pro Project Setup Guide

This guide will help you set up and run the Fake_pro project on your local machine.

## Setup Instructions

1. **Navigate to the Project Directory**: Make sure you are in the main folder named "Fake_pro".

2. **Install Node Modules**: Run the following command to install the necessary Node modules for the project:

    ```bash
    npm install
    ```

3. **Build the Project**: Execute the following command to build the project:

    ```bash
    npm run build
    ```

## Running the Project

4. **Start the Project**: Run the following command to start the project:

    ```bash
    npm run start
    ```

## Additional Steps

5. **Install Ganache**: Before running the project, you need to install Ganache. You can do this via npm by running:

    ```bash
    npm install -g ganache
    ```

6. **Start Ganache**: Run the Ganache command to start the local blockchain.

7. **Configure MetaMask**: Add a test network manually in MetaMask by selecting the appropriate chain ID and RPC URL as specified in the Ganache output.

8. **Deploy Contracts**: Deploy the contracts in Remix IDE.

9. **Start Development Server**: After completing the above steps, start the development server using the following command:

    ```bash
    npm start
    ```

Once you've followed these steps, your Fake_pro project should be up and running. If you encounter any issues, make sure to troubleshoot each step and check for any errors or missing dependencies.
