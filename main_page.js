function getSelectedMajors() {
    alert("working");
    var selectedMajors = [];
    var selectedElement_major = document.getElementById("major_select");

    for (var i = 0; i < selectedElement_major.options.length; i++) {
        if (selectedElement_major[i].selected) {
            selectedMajors.push(selectedElement_major.options[i].value);
        }
    }
}
