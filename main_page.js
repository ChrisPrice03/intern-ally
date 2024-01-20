import * as job_funcs from 'internship.js'
import {FilterTool, Internship, InternshipCache, InternshipLoader} from "internship.js";

//let x =  new Internship();

let myInternLoader = new InternshipLoader();
let myGeneralCache = new InternshipCache();
let myFilteredCache = new InternshipCache();
let ft = new FilterTool();

function onLoad() {
    //makes general cache
    myGeneralCache = myInternLoader.loadCache('internship.txt');

    //myGeneralCache.internships[:].info
    myFilteredCache = myGeneralCache;
}

function filterNow() {
    filter_major();
    filter_city();
    filter_skills();
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
    var num_majors = getSelectedMajors().length;
    if (num_majors > 0) {
        myFilteredCache = ft.majorSearch(myFilteredCache, getSelectedMajors());
    }
    return myFilteredCache;
}

function filter_city() {
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



