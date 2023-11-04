# Real-Time Chat Web App
![Chat pic]()

This is a real-time chat web application built using React.js, Tailwind CSS, and Firebase. It allows users to create accounts, sign in, join chat rooms, and exchange messages in real-time. The app uses Firebase Firestore for real-time data synchronization and Firebase Authentication for user management.

## Features
* User account creation and authentication.
* Real-time chat rooms with messages updating in real-time.
* Responsive design for both desktop and mobile devices.
* Customizable user avatars.

## Technologies Used
* **React.js** : The front-end of the application is built using React.js, a popular JavaScript library for building user interfaces.

* **Tailwind CSS** : Tailwind CSS is used for styling the app. It provides a utility-first approach to CSS, making it easy to create responsive and attractive designs.

* **Firebase** : Firebase is a cloud-based platform provided by Google. In this app, Firebase is used for two main purposes:
    * **Firebase Authentication** : It handles user registration and authentication.
    * **Firebase Firestore** : Firestore is used as a real-time database to store and sync chat messages and room data.

## Installation
1. Clone the repository to your local machine:
```bash
git clone https://github.com/Nadjib4869/Realtime-chat.git
```

2. Navigate to the project directory:
```bash
cd real-time-chat-app
```

3. Install the project dependencies:
```bash
npm install
```

4. Create a Firebase project and configure it:
    * visit the [Firebase Console](https://console.firebase.google.com/)
    * Create a new project.
    * Set up Firebase Authentication with the necessary providers (e.g., Google, Email/Password).
    * Create a Firestore database.

5. Create a .env file in the project root and add your Firebase configuration:
```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

6. Start the development server:
```bash
npm start
```

7. The app will be available at http://localhost:3000 in your web browser.

## Usage
* Create an account or sign in using Firebase Authentication.
* create chat rooms
* Start sending and receiving real-time messages.

## Contributing
Contributions are welcome! If you have any ideas or improvements, please open an issue or submit a pull request.

## Known isssues (work in progress)
this web app is still ongoing. it still lacking some features such as create chat group, join chat groups, video call. They are coming soon!

## License 
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 
* Thanks to Firebase for providing authentication and Firestore services.