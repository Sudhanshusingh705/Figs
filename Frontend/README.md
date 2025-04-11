# Figs Academy Frontend

This is the frontend application for Figs Academy, an educational platform focused on medical education, including NExT (National Exit Test) preparation.

## Features

- **User Authentication**: Register, login, password recovery, and profile management
- **Course Catalog**: Browse and access various medical courses
- **NExT Preparation**: Specialized courses and resources for NExT exam preparation
- **Quiz System**: Interactive quizzes with different question types and progress tracking
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Role-based Access**: Different views and features for students and administrators

## Tech Stack

- **React.js**: UI library for building the user interface
- **React Router**: For handling navigation within the application
- **Context API**: For state management across components
- **Axios**: For making API requests to the backend
- **Formik & Yup**: For form handling and validation
- **Chart.js**: For data visualization in dashboard
- **Font Awesome**: For icons
- **CSS**: Custom styling using modern CSS techniques

## Setup & Installation

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd figs-academy-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── Auth/        # Authentication-related components
│   ├── CourseSections/ # Course category components
│   ├── Dashboard/   # Dashboard components
│   ├── Header/      # Header and navigation components
│   ├── Profile/     # User profile components
│   └── ...
├── context/         # React context for state management
├── pages/           # Page components
│   ├── About/       # About page
│   ├── NExT/        # NExT exam preparation page
│   ├── Home/        # Home page
│   └── ...
├── services/        # API service functions
├── utils/           # Utility functions and constants
└── styles/          # Global CSS styles
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Runs the test suite
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from create-react-app (one-way operation)

## Deployment

For production deployment:

1. Build the project:
   ```bash
   npm run build
   ```

2. The built files will be in the `build` directory, which can be deployed to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Contact

For questions or support, please contact [support@figsacademy.com](mailto:support@figsacademy.com) 