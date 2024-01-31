# Special Tasks Application

This repository contains the code for a web application that allows users to manage their top 3 most important daily tasks and receive notifications to ensure they are completed.

## Features

- Manage a list of top 3 daily tasks that will help you achieve your goals.
- Subscribe to push notifications
- Receive periodic reminders for incomplete tasks every 2 hours

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Push Notifications**: Web Push API with VAPID

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDB
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/divyesh1099/special_tasks.git
cd special-tasks
```

2. Install NPM packages for the backend:

```bash
cd special_tasks_backend
npm install
```

3. Install NPM packages for the frontend:

```bash
cd ../special_tasks_frontend
npm install
```

4. Create a `.env` file in your backend directory and add your MongoDB URI and VAPID keys:

```plaintext
DB_URI=mongodb://localhost:27017/special_tasks_db
VAPID_PUBLIC_KEY="BA3vIRWgcdikER-UVDq5SUsA8b2voB8KbqIWxpjx7fxoXq3E9qP9v_Z8xIPR1zvSOZl63ANHq0xuW_vulIqECd8"
VAPID_PRIVATE_KEY="wgoewCN--CwVxHVLFINz5BumzTRuQhju1rqQavCY68k"
```

### Running the Application

1. Start the backend server:

```bash
cd special_tasks_backend
npm start
```

2. In a new terminal, start the frontend application:

```bash
cd special_tasks_frontend
npm start
```

The frontend should now be running on [http://localhost:3000](http://localhost:3000), and the backend on [http://localhost:5000](http://localhost:5000).

### Environment Variables

Ensure to replace the environment variables in the `.env` file with your actual MongoDB URI and VAPID keys.

## Usage

After running the application, navigate to [http://localhost:3000](http://localhost:3000) to manage tasks and subscribe to notifications.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/divyesh1099/special_tasks/tags).

## Authors

- **Divyesh Vishwakarma** - *Initial work* - [divyesh1099](https://github.com/divyesh1099)

See also the list of [contributors](https://github.com/divyesh1099/special_tasks/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Moti❤️