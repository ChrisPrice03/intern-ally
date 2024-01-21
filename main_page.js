import * as job_funcs from './internship.js'
import {FilterTool, Internship, InternshipCache, InternshipLoader} from "./internship.js";

//let x =  new Internship();

let myInternLoader = new InternshipLoader();
let myGeneralCache = new InternshipCache();
let myFilteredCache = new InternshipCache();
let ft = new FilterTool();


            function runPythonScript() {
                var pythonScriptPath = "./scraper.py";
                subprocess.run(["python", pythonScriptPath]);
            }
        

function onLoad() {
    // const { spawn } = require('child_process');
    // const scraper = spawn('python', ['scraper.py'])
    // scraper.stdout.on('data', function(data) {
    //     console.log("working");
    // });
    //makes general cache
    myGeneralCache = myInternLoader.loadCache('internship.txt');

    //myGeneralCache.internships[:].info
    myFilteredCache = myGeneralCache;
    print_postings();
}

/*
Filters internships by location, major, and city
 */

function make_filters() {

}
function filterNow() {
    onLoad();
    filter_major();
    filter_city();
    filter_skills();
    filter_salary();
}

function getSelectedMajors() {
    alert("working");
    var selectedMajors = [];
    var selectedElement_major = document.getElementById("major_select");

    var num_majors = 0;
    for (var i = 0; i < selectedElement_major.options.length; i++) {
        if (selectedElement_major[i].selected) {
            num_majors++;
            selectedMajors.push(selectedElement_major.options[i].value);
        }
    }

    return selectedMajors;
    //FilterTool.majorSearch(tempInternshipCache, selectedMajors);
}

function getSelectedCities() {
    var selectedCities = [];
    var selectedElement_city = document.getElementById("city_select");

    var num_cities = 0;
    for (var i = 0; i < selectedElement_city.options.length; i++) {
        if (selectedElement_city[i].selected) {
            num_cities++;
            selectedCities.push(selectedElement_city.options[i].value);
        }
    }

    return selectedCities;
    //FilterTool.majorSearch(tempInternshipCache, selectedMajors);
}

function getSelectedSkills() {
    var selectedSkills = [];
    var selectedElement_skill = document.getElementById("skill_select");

    for (var i = 0; i < selectedElement_skill.options.length; i++) {
        if (selectedElement_skill[i].selected) {
            selectedSkills.push(selectedElement_skill.options[i].value);
        }
    }

    return selectedSkills;
    //internship.majorSearch(tempInternshipCache, selectedMajors);
}

function load_more() {
    job_funcs.updateCache("internship.txt", internshipCache);
}

function filter_major() {
    alert("works2");
    var num_majors = getSelectedMajors().length;
    if (num_majors > 0) {
        myFilteredCache = ft.majorSearch(myFilteredCache, getSelectedMajors());
    }
    return myFilteredCache;
}

function filter_city() {
    alert("works!")
    var num_cities= getSelectedCities().length;
    if (num_cities > 0) {
        myFilteredCache = ft.citySearch(myFilteredCache, getSelectedCities());
    }
    return myFilteredCache;
}

function filter_skills() {
    var num_skills = getSelectedSkills().length;
    if (num_skills > 0) {
        myFilteredCache = ft.skillSearch(myFilteredCache, getSelectedSkills());
    }
    return myFilteredCache;
}

function get_min_salary () {
    let x = document.getElementById("salary_select").value;
    try {
        var y = parseFloat(x);
        if (isNaN(y)) {
            throw new Error();
        }
    } catch (error) {
        y = 0;
    }
    return y;
}
function filter_salary() {
    var minSalary = get_min_salary();
    myFilteredCache = ft.inSalaryRange(myFilteredCache, minSalary, 0);
}

function print_postings() {
    var internshipPostings = document.getElementbyId("internship_postings");
    myFilteredCache.forEach(function(item) {
        var divElement = document.createElement("div");
        divElement.className = "internship_post";
        divElement.id = "post_outer_box"

        var headElement = document.createElement("h2");
        headElement.textContent = item.company + ": " + item.position;
        headElement.id = "job_header";

        var job_info_div = document.createElement("div");
        job_info_div.id = "job_info_left_div";
        job_info_div.className = "job_info"

        var paragraph_info = document.createElement("p");
        paragraph_info.textContent = "Salary: " + item.salary + "\n"
            + "Location: " + item.location + "\n"
            + "Skills: " + item.skills + "\n"
            + "Degree: " + item.degree;

        job_info_div.appendChild(paragraph_info);

        var job_logo_div = document.createElement("div");
        job_logo_div.id = "job_logo_div";
        job_logo_div.className = "job_logo_div";

        var item_logo = document.createElement("img");
        item_logo.src = item.logo;

        var learn_button = document.createElement("button");
        learn_button.textContent = "Learn More"
        learn_button.onclick = alert("This is going to open a link when we fix it lol");

        job_logo_div.appendChild(job_logo_div);
        job_logo_div.appendChild(learn_button);

        divElement.appendChild(headElement);
        divElement.appendChild(job_info_div);
        divElement.appendChild(job_logo_div);

        //divElement.innerHTML = "\"<strong>Name:</strong> \" + item.name + \", <strong>Info:</strong> \" + item.company;"
        internshipPostings.appendChild(divElement);
    })
}



