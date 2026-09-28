let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;

const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const searchInput = document.getElementById("searchInput");
const submitButton = document.getElementById("submitButton");

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const rollNo = document.getElementById("rollNo").value;
    const email = document.getElementById("email").value;
    const department = document.getElementById("department").value;

    const student = {
        name: name,
        rollNo: rollNo,
        email: email,
        department: department
    };

    if (editIndex === -1) {

        students.push(student);

    } else {

        students[editIndex] = student;

        editIndex = -1;

        submitButton.textContent = "Add Student";
    }

    localStorage.setItem("students", JSON.stringify(students));

    studentForm.reset();

    displayStudents();
});


function displayStudents(studentList = students) {

    studentTable.innerHTML = "";

    studentList.forEach(function(student, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.rollNo}</td>
            <td>${student.email}</td>
            <td>${student.department}</td>

            <td>
                <button class="edit-btn" onclick="editStudent(${index})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;

        studentTable.appendChild(row);
    });
}


function editStudent(index) {

    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("rollNo").value = student.rollNo;
    document.getElementById("email").value = student.email;
    document.getElementById("department").value = student.department;

    editIndex = index;

    submitButton.textContent = "Update Student";
}


function deleteStudent(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {

        students.splice(index, 1);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        displayStudents();
    }
}


searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();

    const filteredStudents = students.filter(function(student) {

        return (
            student.name.toLowerCase().includes(searchText) ||
            student.rollNo.toLowerCase().includes(searchText) ||
            student.department.toLowerCase().includes(searchText)
        );

    });

    displayStudents(filteredStudents);
});


displayStudents();