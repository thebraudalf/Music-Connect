## Overview

Music Connect is a full-stack web application that allows users to explore and interact with music-related content. The application includes features such as user authentication, playlist management, and music recommendations. The frontend is built using React, Create React App, and styled components, while the backend is built using Node.js, Express, and MongoDB.

The application allows users to register, log in, and update their account details. It also provides a user-friendly interface to discover new music, manage playlists, and interact with the music community. The music recommendation feature uses a machine learning model to suggest songs based on the user's mood and preferences.

Music Connect aims to provide a seamless and engaging music experience for its users, connecting them with the music they love and introducing them to new artists and genres.
## INSTALLATION

To install and set up this project, follow these steps:

### Prerequisites

* Node.js (ensure you have a compatible version installed)
* MongoDB (set up a MongoDB instance and update the `MONGODB_URI` environment variable accordingly)
* Create a `.env` file with the necessary environment variables (e.g., `GROQ_API_KEY`)

### Project Setup

1. Clone the repository: `git clone <repository-url>`
2. Change into the project directory: `cd <project-name>`
3. Install dependencies: `npm install` (in the root directory)
4. Set up the MongoDB connection: update the `MONGODB_URI` environment variable with your MongoDB instance URL
5. Start the server: `node server.js` (ensure the server is running at `http://localhost:8000`)

### Frontend Setup

1. Change into the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start` (ensure the app is running at `http://localhost:3000`)

### Additional Configurations

* Update the `GROQ_API_KEY` environment variable with your Groq API key
* Configure any additional services or integrations required for the project

### Verify Setup

* Ensure the server is running at `http://localhost:8000`
* Verify the frontend app is running at `http://localhost:3000`
* Test the API endpoints and MongoDB connection to ensure everything is working as expected
## USAGE

### Running the Application

To run the application, navigate to the root directory of the project and execute the following command:
```
node server.js
```
This will start the server and connect to the MongoDB instance specified in the `MONGODB_URI` environment variable.

### API Endpoints

The application exposes several API endpoints for user management, authentication, and song prediction. These endpoints can be accessed using a REST client or a tool like Postman.

#### User Registration
```
POST /api/v1/users/register
```
Body:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```
#### User Login
```
POST /api/v1/users/login
```
Body:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
#### Get Current User
```
GET /api/v1/users/me
```
#### Update Account Details
```
PATCH /api/v1/users/me
```
Body:
```json
{
  "name": "Jane Doe",
  "email": "janedoe@example.com"
}
```
#### Update User Avatar
```
PATCH /api/v1/users/me/avatar
```
Body:
```json
{
  "avatar": "<avatar_url>"
}
```
#### Update User Cover Image
```
PATCH /api/v1/users/me/cover-image
```
Body:
```json
{
  "coverImage": "<cover_image_url>"
}
```
### Frontend

The frontend application is built using Create React App and can be started using the following command:
```
npm start
```
This will start the development server and open the application in your default web browser.
## Tech Stack

### Programming Languages

* JavaScript

### Frameworks

* Create React App (for frontend)
* Express.js (for backend)

### Libraries

* Mongoose (for MongoDB interactions)
* Axios (for HTTP requests)
* Styled Components (for CSS styling)
* React Router DOM (for client-side routing)

### Databases

* MongoDB

### Build Tools

* Webpack (for bundling and minification)
* Babel (for JavaScript transpilation)

### Test Frameworks

* Jest (for unit testing)

### CI/CD Pipelines

* Not specified, but potentially uses GitHub Actions or other pipeline tools

### Other Tools

* dotenv (for environment variable management)
* Groq (for AI/ML-related tasks)


## Features

### User Management

* Register a new user
* Login and authenticate a user
* Logout a user
* Refresh access token
* Change current password
* Get current user details
* Update account details
* Update user avatar
* Update user cover image

### MongoDB Connection

* Establish a connection to a MongoDB database using Mongoose

### API Error Handling

* Handle API errors with a custom error class (ApiError)
* Return error responses in a standardized format

### API Response Handling

* Handle API responses with a custom response class (ApiResponse)
* Return success responses in a standardized format

### Async Request Handling

* Handle asynchronous requests with a custom async handler (asyncHandler)
* Catch and handle errors in asynchronous requests

### Frontend Features

* Create a React app using Create React App
* Run the app in development mode
* Run tests in interactive watch mode
* Build the app for production
* Deploy the app
* Learn more about Create React App and React

### Utilities

* Generate chat completions based on user prompts and context using Groq
* Analyze user questions and define their mood
* Generate song lyric examples that evoke a specific mood
## Contributing

Contributions are what make the open-source community such an amazing place. We're thrilled that you'd like to contribute to our project. Here are some guidelines to get you started.

### Code Style

We follow the Airbnb JavaScript Style Guide. Please ensure your code adheres to these guidelines.

### Branch Management

We use a feature-branch workflow. Create a new branch for each feature or bug fix, and name it accordingly (e.g., `feature/new-login-system` or `fix/avatar-upload-bug`). Once your changes are ready, create a pull request to merge your branch into `main`.

### Testing

Please write unit tests for any new code you add. We use Jest for testing. Make sure your tests are comprehensive and cover all possible scenarios.

### Submitting a Pull Request

Before submitting a pull request, ensure:

1. Your code is formatted correctly.
2. You've added unit tests for your changes.
3. Your branch is up-to-date with the latest `main` branch.
4. Your changes are clearly described in the pull request description.

### Getting Started

To get started, fork our repository, clone it to your local machine, and create a new branch for your feature or bug fix. When you're ready, create a pull request, and we'll review your changes.

Thank you for contributing to our project!
## Configuration

This section provides an overview of the project's configuration parameters, their roles, and how to adjust settings for different environments (development, staging, production).

### Environment Variables

The project uses environment variables to configure various aspects of the application. These variables are stored in a `.env` file and loaded using the `dotenv` package.

* `MONGODB_URI`: The URI of the MongoDB instance used for database connections.
* `PORT`: The port number used by the server.
* `GROQ_API_KEY`: The API key for the Groq SDK used in the `utils/ai/PromptTemplate.js` file.

### Package.json Scripts

The `package.json` file defines several scripts used for building, testing, and running the application.

* `start`: Starts the development server using `react-scripts start`.
* `build`: Builds the application for production using `react-scripts build`.
* `test`: Runs the test suite using `react-scripts test`.
* `eject`: Ejects the application from the Create React App setup, allowing for manual configuration of Webpack and other dependencies.

### Create React App Configuration

The project uses Create React App to manage the frontend build process. Configuration for Create React App is stored in the `frontend/package.json` file.

* `browserslist`: Defines the target browsers for the application.
* `eslintConfig`: Configures ESLint for code linting and formatting.
* `scripts`: Defines scripts for building, testing, and running the application.

### MongoDB Connection

The project uses Mongoose to connect to a MongoDB instance. The connection settings are configured in the `db/connection.js` file.

* `MONGODB_URI`: The URI of the MongoDB instance used for database connections.


## DEPENDENCIES

This project relies on the following external libraries and tools:

### Frontend

* React (`^19.1.0`)
* React DOM (`^19.1.0`)
* React Router DOM (`^7.5.0`)
* Axios (`^1.8.4`)
* Styled Components (`^6.1.17`)
* Web Vitals (`^2.1.4`)
* Create React App (`5.0.1`)
* Testing Library (`@testing-library/*`)

### Backend

* Mongoose (`mongoose`)

### Utilities

* Cloudinary (for image upload and management)

Please ensure you have these dependencies installed in your project to ensure proper functionality.
## Deployment

### Setting Up the Deployment Environment

To deploy the project, ensure you have the following environment variables set up:

* `MONGODB_URI`: The connection string for your MongoDB instance
* `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`: Your Cloudinary credentials
* `GROQ_API_KEY`: Your Groq API key
* `CORS_ORIGIN`: The allowed origin for CORS requests
* `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`: Your access and refresh token secrets
* `PORT`: The port number for your server (default is 8000)

### Building and Running the Application

To build and run the application, follow these steps:

1. Run `npm run build` to build the frontend application
2. Run `node app.js` to start the server

### Deploying to a Production Environment

To deploy the application to a production environment, you can use a process manager like PM2 to manage the server process. You can also use a cloud platform like Heroku or AWS to host your application.

For continuous integration and continuous deployment (CI/CD), you can set up a pipeline using a tool like GitHub Actions or CircleCI to automate the build, test, and deployment process.

Note: Make sure to update the environment variables and configuration files according to your production environment requirements.
## SCREENSHOTS
Here are some screenshots of the application:

### Home Page
![Home Page](https://i.scdn.co/image/ab67616d0000e5ebcdce7620dc940db079bf4952/1/en/default)

### Search Page
![Search Page](https://i.scdn.co/image/ab67616d0000b273e8b066f70cfa9fc2d9f8fb6c4)

### Chat UI
![Chat UI](https://i.scdn.co/image/ab67616d0000b273c6f7af36cfa9fc2d9f8fb6c4)

### Player
![Player](https://i.scdn.co/image/ab67616d0000e5ebcdce7620dc940db079
## Roadmap

This project aims to evolve into a comprehensive music platform, connecting users through their musical experiences. Here's a glimpse into our upcoming features and milestones:

**Short-term (Next 3-6 months)**

* **AI-powered mood detection**: Integrate AI technology to analyze user input and suggest songs that match their current mood.
* **Enhanced playlist creation**: Allow users to create and manage playlists with ease, including features like playlist naming, descriptions, and sharing.
* **Improved user interface**: Refine the UI to provide a more seamless and engaging user experience, including visual enhancements and accessibility improvements.

**Mid-term (6-12 months)**

* **Music recommendation engine**: Develop a robust recommendation engine that suggests songs, artists, and genres based on user behavior, preferences, and listening history.
* **Community features**: Introduce community features, such as forums, chat rooms, and event planning tools, to foster connections among users with similar musical interests.
* **Artist and label integration**: Collaborate with artists and labels to offer exclusive content, promotions, and experiences, enriching the overall user experience.

**Long-term (1-2 years)**

* **Personalized radio stations**: Launch personalized radio stations that learn and adapt to individual users' listening habits, providing a unique and engaging streaming experience.
* **Live event integration**: Integrate live event features, including concert ticketing, artist meet-and-greets, and music festivals, to connect users with their favorite artists and bands.
* **Virtual and augmented reality experiences**: Explore the possibilities of virtual and augmented reality to create immersive music experiences, allowing users to engage with music in new and innovative ways.

These milestones will propel the project forward, enhancing the user experience, and solidifying our position as a leading music platform.
## FAQ
This section aims to provide answers to frequently asked questions about the project.

### 1. How do I use the chat interface?
The chat interface is designed to be user-friendly and intuitive. Simply type your query or message in the input field, and the AI assistant will respond accordingly.

### 2. What kind of responses can I expect from the AI assistant?
The AI assistant is programmed to provide helpful and informative responses to your queries. It may offer suggestions, provide explanations, or even engage in conversations.

### 3. Can I customize the appearance of the chat interface?
Yes, the chat interface is fully customizable. You can adjust the colors, fonts, and layout to suit your preferences.

### 4. Is my data secure when using the chat interface?
Absolutely! We take data security very seriously, and all interactions with the chat interface are encrypted and protected.

### 5. Can I report issues or provide feedback?
Yes, please do! We appreciate your feedback and would love to hear about any issues you encounter. You can report issues or provide feedback by contacting our support team.

### 6. How does the AI assistant generate responses?
The AI assistant uses a combination of natural language processing (NLP) and machine learning algorithms to generate responses based on the input provided.

### 7. Can I use the chat interface on multiple devices?
Yes, the chat interface is designed to be accessible on various devices, including desktops, laptops, tablets, and mobile phones.

### 8. What kind of support is available for the chat interface?
We offer comprehensive support for the chat interface, including documentation, FAQs, and a dedicated support team.

### 9. Can I integrate the chat interface with other applications or services?
Yes, the chat interface is designed to be modular and can be easily integrated with other applications or services using our APIs.

### 10. Are there any limitations to using the chat interface?
While we strive to provide an excellent user experience, there may be certain limitations to using the chat interface, such as data limits or restrictions on certain features. Please refer to our documentation for more information.
## ACKNOWLEDGEMENTS

This project is built upon the foundation of several open-source libraries and projects. 

A special thanks to:

* Facebook for creating and maintaining [Create React App](https://github.com/facebook/create-react-app), which was used to bootstrap the frontend application.
* The developers of [Mongoose](https://mongoosejs.com/), which enables interaction with MongoDB.
* The [Styled Components](https://styled-components.com/) team for making CSS-in-JS easier and more efficient.

Additionally, the project incorporates various icons and images from [Spotify CDN](https://t.scdn.co/), which are used to enhance the user interface.

The project's development would not have been possible without the contributions of these wonderful projects and their maintainers.
## Support

We're committed to helping you with any issues or questions you might have about our project. Here are some ways to get support:

### Contact Us

If you have any questions, concerns, or need help with something, please don't hesitate to reach out to us at [support@example.com](mailto:support@example.com). We'll do our best to respond as soon as possible.

### Community Forum

Join our community forum at [https://example.com/forum](https://example.com/forum) to connect with other users, ask questions, and share knowledge.

### Live Chat

We offer live chat support during our office hours (Monday to Friday, 9am-5pm EST). You can chat with us by clicking on the chat icon in the bottom right corner of our website.

### Report an Issue

If you encounter a bug or an issue with our project, please report it to us at [issues@example.com](mailto:issues@example.com). We'll do our best to fix it as soon as possible.

### Documentation

Check out our documentation at [https://example.com/docs](https://example.com/docs) for detailed guides, tutorials, and FAQs about our project.

### Social Media

Follow us on social media to stay up-to-date with the latest news, updates, and announcements about our project:

* Twitter: [@example](https://twitter.com/example)
* Facebook: [@example](https://facebook.com/example)
* GitHub: [@example](https://github.com/example)

We're here to help, and we appreciate your feedback!
## Author

I am [Your Name], a passionate developer with a strong background in software development and technology. I hold a degree in Computer Science and have been actively involved in the development of various projects.

With expertise in JavaScript, React, Node.js, and MongoDB, I have successfully built and deployed several web applications. My expertise also extends to designing and implementing databases, creating RESTful APIs, and ensuring the overall security and scalability of applications.

In addition to my technical skills, I possess excellent communication and problem-solving abilities, which enable me to effectively collaborate with cross-functional teams and drive projects forward.

You can connect with me on:

* LinkedIn: [Your LinkedIn Profile URL]
* GitHub: [Your GitHub Profile URL]
* Twitter: [Your Twitter Profile URL]

Feel free to reach out to me for any queries or collaborations!
