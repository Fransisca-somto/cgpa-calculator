/** @format */

import React, { useState } from "react";
import "./App.css";
import Html2Img from "html2img";
import { jsPDF } from "jspdf";

function App() {
  const [courses, setCourses] = useState([
    { course: "", creditLoad: "", grade: "5" },
  ]);
  const [cgpa, setCgpa] = useState(0);

  const [semesters, setSemesters] = useState([]);

  // Handle input changes for each course row
  const handleInputChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const exportTableToPDF = () => {
    window.open(
      "https://www.profitablecpmrate.com/m8vfhpjkiy?key=db85e62f42b7f9536fefe711ae987529",
      "_blank"
    );
    const doc = new jsPDF();
    const element = document.getElementById("table");

    doc.html(element, {
      callback: (doc) => {
        doc.saveGraphicsState();
        doc.save("mycgpa.pdf");
      },
      margin: 0,
      x: 1,
      y: 1,
      html2canvas: { scale: 0.287 },
    });
  };

  const saveAsImg = () => {
    window.open(
      "https://www.profitablecpmrate.com/m8vfhpjkiy?key=db85e62f42b7f9536fefe711ae987529",
      "_blank"
    );

    var el = document.getElementById("table");
    Html2Img.save(el, {
      name: "mycgpa",
      type: "jpg",
      quality: 1, // Set quality to maximum (1 = 100%)
      scale: 3000, // Increase scale to improve resolution (default might be 1)
      useCORS: true, // Ensure cross-origin resources are included
    });
  };

  // Add a new course row
  const addCourse = () => {
    // Check if the last course row has all fields filled
    const lastCourse = courses[courses.length - 1];
    if (!lastCourse.course || !lastCourse.creditLoad || !lastCourse.grade) {
      return;
    }

    // Add a new empty row
    setCourses([...courses, { course: "", creditLoad: "", grade: "5" }]);
  };

  // Add a new semester
  const addSemester = () => {
    // Validate that all rows in the current semester are filled
    const incompleteRow = courses.some(
      (course) => !course.course || !course.creditLoad || !course.grade
    );
    if (incompleteRow) {
      return;
    }

    // Save current courses to semesters and reset the courses
    setSemesters([...semesters, courses]);
    setCourses([{ course: "", creditLoad: "", grade: "5" }]); // Reset courses
  };

  const calculateCGPA = () => {
    // Ensure all rows are valid
    const incompleteRow = courses.some(
      (course) =>
        !course.course ||
        isNaN(Number(course.creditLoad)) ||
        isNaN(Number(course.grade))
    );

    if (incompleteRow) {
      alert("Ensure all fields are correctly filled before calculating CGPA.");
      return;
    }

    let totalWeightedGrade = 0;
    let totalCreditLoad = 0;

    courses.forEach((course) => {
      const creditLoad = Number(course.creditLoad);
      const grade = Number(course.grade);

      totalWeightedGrade += creditLoad * grade;
      totalCreditLoad += creditLoad;
    });

    const cgpa =
      totalCreditLoad > 0
        ? (totalWeightedGrade / totalCreditLoad).toFixed(2)
        : 0;

    setCgpa(cgpa);
  };

  return (
    <div>
      <h1>CGPA CALCULATOR</h1>
      <div className="tables" id="tables">
        <table id="table">
          <thead>
            <tr>
              <th>COURSE</th>
              <th>CREDIT LOAD</th>
              <th>GRADE</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={course.course}
                    onChange={(e) =>
                      handleInputChange(index, "course", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={course.creditLoad}
                    onChange={(e) =>
                      handleInputChange(index, "creditLoad", e.target.value)
                    }
                  />
                </td>
                <td>
                  <select
                    name="grade"
                    id="grade"
                    value={course.grade}
                    onChange={(e) =>
                      handleInputChange(index, "grade", e.target.value)
                    }
                  >
                    <option value="5">A</option>
                    <option value="4">B</option>
                    <option value="3">C</option>
                    <option value="2">D</option>
                    <option value="1">E</option>
                    <option value="0">F</option>
                  </select>
                </td>
              </tr>
            ))}
            <tr style={{ fontWeight: "800" }}>
              <td style={{ backgroundColor: "red", color: "white" }}>CGPA:</td>
              <td
                colSpan={2}
                style={{
                  textAlign: "right",
                  backgroundColor: "rgba(255, 185, 185, 0.405)",
                }}
              >
                {cgpa}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="buttons">
          <button onClick={addCourse} className="plus-course">
            ADD COURSE
          </button>
          <button onClick={addSemester} className="plus-semester">
            ADD SEMESTER
          </button>
          <button onClick={calculateCGPA} className="calculate-cgpa">
            Calculate CGPA
          </button>
          <button className="download-img" onClick={saveAsImg}>
            Download as Image
          </button>
          <button className="download-pdf" onClick={exportTableToPDF}>
            Download as pdf
          </button>
        </div>
      </div>

      {/* <h3>Semesters Data</h3>
      {semesters.map((semester, index) => (
        <div key={index}>
          <h4>Semester {index + 1}</h4>
          <pre>{JSON.stringify(semester, null, 2)}</pre>
        </div>
      ))} */}
    </div>
  );
}

export default App;
