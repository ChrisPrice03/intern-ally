import * as job_funcs from 'internship.js'
import {Internship} from "internship.js";

//let x =  new Internship();
function getSelectedMajors() {
    var selectedMajors = [];
    var selectElement = document.getElementById("majors");

    for (var i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].selected) {
            selectedMajors.push(selectElement.options[i].value);
        }
    }
    // Now you can use the 'selectedMajors' array as needed
}