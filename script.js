// ========================================
// Student Management System - script.js
// ========================================

const API_URL = "/api/students";

let allStudents = [];


// ========================================
// Page Load
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    loadStudents();

    const form = document.getElementById("student-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        saveStudent();
    });
});


// ========================================
// READ - Load All Students
// ========================================

async function loadStudents() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load students");
        }

        const students = await response.json();

        allStudents = students;

        displayStudents(students);

    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to connect to the server.",
            "error"
        );
    }
}


// ========================================
// Display Students
// ========================================

function displayStudents(students) {

    const tableBody =
        document.getElementById("student-table-body");

    const noStudents =
        document.getElementById("no-students");

    tableBody.innerHTML = "";

    if (students.length === 0) {

        noStudents.style.display = "block";

        return;
    }

    noStudents.style.display = "none";


    students.forEach(function (student) {

        const row = document.create