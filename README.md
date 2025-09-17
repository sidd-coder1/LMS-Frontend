# 🖥️ Lab Management System

A modern, responsive web application for managing computer lab resources, built with React and React Router.

## 🚀 Features

- **Interactive Dashboard**
  - Real-time status of working and non-working computers
  - Clean, intuitive user interface
  - Responsive design for all devices

- **Computer Status Tracking**
  - View detailed information about working computers
  - Monitor non-working computers
  - Easy navigation between different views

- **Modern UI/UX**
  - Smooth animations and transitions
  - Loading states and error handling
  - Accessible and keyboard-navigable interface
  - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Routing**: React Router v6
- **State Management**: Context API
- **Styling**: CSS3 with modern features (Flexbox, Grid, CSS Variables)
- **Build Tool**: Create React App

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v7 or later) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lab-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components
├── context/       # React context providers
├── pages/         # Page components
│   ├── HomePage.js
│   ├── WorkingComputers.js
│   └── NonWorkingComputers.js
├── styles/        # CSS files
└── App.js         # Main application component
```

## 🔍 Features in Detail

### Home Page
- Displays two main cards for working and non-working computers
- Shows real-time counts
- Smooth hover and click animations

### Working Computers Page
- Lists all working computers
- Shows detailed status information
- Clean, card-based layout

### Non-Working Computers Page
- Displays computers that need attention
- Highlights issues clearly
- Easy navigation back to home

## 🎨 Design System

### Colors
- Primary: `#3498db` (Blue)
- Success: `#2ecc71` (Green)
- Danger: `#e74c3c` (Red)
- Text: `#2c3e50` (Dark Gray)
- Background: `#f5f7fa` (Light Gray)

### Typography
- Main Font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Font Weights: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Color palette inspired by [Flat UI Colors](https://flatuicolors.com/)

---

<div align="center">
  Made with ❤️ by [Your Name]
</div>
- CSS3 (No CSS frameworks)
- Responsive design with CSS Grid and Flexbox

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/lab-management-system.git
   cd lab-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

In the project directory, you can run:

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Project Structure

```
src/
  ├── components/         # Reusable components
  ├── context/           # Context providers
  ├── pages/             # Page components
  ├── styles/            # CSS files
  ├── App.js             # Main App component
  ├── index.js           # Entry point
  └── index.css          # Global styles
```

## Authentication

For demonstration purposes, the authentication is simulated. You can log in with any credentials:

- **Regular User**: Any username/password
- **Admin**: Any username/password with "Admin" checkbox checked

## API Integration

The application is designed to work with a RESTful API. Update the API endpoints in the respective service files when connecting to a real backend.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
