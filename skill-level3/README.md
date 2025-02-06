# SkillLevel3

## Description

**SkillLevel3** is a web application built with Vite, React, and Redux. It allows users to enter their personal information (first name, last name, date of birth) and display a profile with a light/dark theme toggle.

## Features
Home Page (HomePage): Displays the user profile if available, otherwise prompts the user to enter information.
Information Page (InformationPage): A form allowing users to enter or update their details with validation.
Data Storage: Uses Redux to store user information.
Theme Toggle (Light/Dark Mode): A dedicated component enables switching between themes.
Birthday Countdown: A utility function calculates the days remaining until the user's birthday.
Custom Hook useUserData: Manages API calls and user data processing.

## Installation

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/tanguyjulien56/skill-level3.git
cd skill-level3
```

### 2. Install Dependencies

Install the necessary dependencies:

```bash
npm install
```

### 3. Start the Application

- **Development mode** on **localhost**:

```bash
npm run dev
```

- **Development mode** on your **local network** (useful for testing on other devices):

```bash
sudo npm run dev -- --host
```

### 4. Build the Application

To create a production-ready build of the application:

```bash
npm run build
```

This will generate the build files in the `dist/` folder, ready for deployment.

## Tests

To run the Jest tests:

```bash
npm test
```

## Technologies Used

- **Vite** for fast development
- **React** for the user interface
- **TypeScript** Typing and errors handling
- **Redux** for state management
- **Jest** for testing
- **Formik** for handling forms
- **Yup** for form validation
- **React Router DOM** for routing
- **Tailwind CSS** and **DaisyUi** for style CSS
- **Axios** API requests

## Test Cases

### Navbar Component

- **Should display navigation links in DesktopMenu**.
- **Should display navigation links in MobileMenu**.

### UseProfileCard Component

- **Should display the default image if `imageUrl` is empty**.
- **Should display the user image if `imageUrl` is present**.
- **Should display the birthday message with the number of days remaining**.
- **Should display a generic message if `daysToBirthday` is not a number**.

### HomePage Component

- **Should display an error message if no user data is available**.
- **Should display the `UserProfileCard` if valid user data is available**.

### InformationPage Component

- **Should render the form with initial values from Redux**.
- **Should display validation errors when submitting with empty fields**.
- **Should display a modal after successful form submission**.
- **Should not submit the form with invalid data**.

### UseUserData Hook

- **Should display the default image and handle invalid birthdays**.
- **Should handle errors and display an error message**.