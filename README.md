Aromatic Feedback Platform
Welcome to Aromatic, a user-friendly feedback platform designed to enhance your dining experience by providing a streamlined way to submit feedback to restaurants.

🚀 Features
🌟 Customer Feedback Form: Share your name, email, phone number, and country.
📊 Rating System: Rate the service quality, cleanliness, and overall dining experience.
✅ Validation: Ensures all inputs are correct and complete.
📱 Responsive Design: Works seamlessly on various devices.
🛠 Technologies Used
React: Building the user interface.
Chakra UI: Styling and UI components.
React Flags Select: Country selection.
CSS: Custom styles.
📋 Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/aromatic-feedback.git
Navigate to the project directory:

bash
Copy code
cd aromatic-feedback
Install the dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Access the application:
Open your browser and go to http://localhost:3000.

✨ Usage
Open the Application:
In your browser, navigate to the application URL.
Fill Out the Feedback Form:
Enter your name, email, phone number, and country.
Rate the Experience:
Provide ratings for service quality, cleanliness, and overall experience.
Submit the Form:
Click the submit button to send your feedback.
🌐 API Endpoint
Feedback is submitted to the following endpoint:

bash
Copy code
POST http://localhost:5000/feedback
🛡 Form Validation
Customer Name: Required.
Email: Required, must be a valid email format.
Phone: Required, must be a 10-digit number.
Service Quality, Cleanliness, Overall Experience: Required, must select a rating.
🎨 Custom Styles
Custom styles for Chakra UI components are included in Table.css:

css
Copy code
.chakra-checkbox__control[data-checked] {
    background-color: green;
    border: none;
    fill: green;
}

.chakra-checkbox__control {
    border-color: black;
}
🤝 Contributing
Fork the Repository:

Click the fork button at the top right of the repository page.
Create a New Branch:

bash
Copy code
git checkout -b feature-branch
Make Your Changes and Commit:

bash
Copy code
git commit -m 'Add new feature'
Push to the Branch:

bash
Copy code
git push origin feature-branch
Open a Pull Request:

Go to the repository page and click "New pull request".
📄 License
This project is licensed under the MIT License.

For any issues or questions, please contact [ankesh9053@gmail.com]. Thank you for contributing to Aromatic and helping us improve the dining experience! 🍽️
