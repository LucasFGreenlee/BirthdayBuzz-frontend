#! /app/bin/node
const sgMail = require("@sendgrid/mail");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

function getUsers() {
  const today = new Date().toLocaleDateString().slice(0, -5);
  console.log("Current Date: ", today);
  axios.get(`${BASE_URL}/users`).then((response) => {
    response.data.forEach((user) => {
      console.log(`In User: ${user.firstName} ${user.lastName}`);
      user.buzzList.forEach((person) => {
        if (person.birthday.slice(0, -5) === today) {
          console.log(`Birthday Boy: ${person.name}`);
          console.log(person.reminderTimeFrame);
          sendScheduledEmail(user.email, user.firstName, person.message); //Need to also pass user time of day sending preference as a parameter
        }
      });
    });
  });
}

async function sendScheduledEmail(address, name, message) {
  const data = {
    from: {
      email: "birthday.buzzx@gmail.com",
      name: "Birthday Buzz",
    },
    to: [
      {
        email: address,
        name: name,
      },
    ],
    subject: "Birthday Reminder!", //Future Feature: Let user customize this
    text: message,
    //send_at: 1617260400,
  };

  const response = await sgMail.send(data);
  response.forEach((email) => {
    if (email.statusCode === 202) {
      console.log("Email scheduled successfully!");
    }
  });
}

getUsers();
