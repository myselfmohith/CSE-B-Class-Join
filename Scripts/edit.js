// Load prevoius data
const localappData = JSON.parse(localStorage.getItem('application-data') || deafaultData);
const Inputs = document.querySelector('form');
const daycodes = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri'];


function loadAppData(appData) {
    // Set Course Name
    const classDetails = appData['classDetails'];
    const timetable = appData['timetable'];

    count = 1;
    Inputs['user_name'].value = appData['user_name'];
    for (const [class_code, class_info] of Object.entries(classDetails)) {
        Inputs[`cls-code-${count}`].value = class_code;
        Inputs[`cls-name-${count}`].value = class_info.name;
        Inputs[`cls-fa-${count}`].value = class_info.faculty;
        Inputs[`cls-link-${count}`].value = class_info.link;
        count++;
    }


    // Set Time table
    for (var i = 0; i < timetable.length; i++) {
        if (!timetable[i]) continue;
        for (var j = 0; j < timetable[i].length; j++) {
            Inputs[`${daycodes[i]}-${j + 1}`].value = timetable[i][j];
        }
    }
}

// Formats -> cls-code-1 cls-name-1 cls-fa-1 cls-link-1 & '<week>-<Number>'

// Accept New Data

Inputs.addEventListener('submit', (e) => {
    e.preventDefault();
    const classList = []
    const classDetails = {};
    const timetable = [null];

    // Add Course details
    const user_name = Inputs['user_name'].value;
    for (var i = 1; i <= 8; i++) {
        const class_code = Inputs[`cls-code-${i}`].value.toUpperCase();
        if (class_code === "") break;
        classList.push(class_code);
        classDetails[class_code] = {}
        classDetails[class_code]['name'] = Inputs[`cls-name-${i}`].value;
        classDetails[class_code]['faculty'] = Inputs[`cls-fa-${i}`].value;
        classDetails[class_code]['link'] = Inputs[`cls-link-${i}`].value;
    }

    // Add time table
    for (var i = 1; i <= 5; i++) {
        const dayClass = []
        for (var j = 1; j <= 8; j++) {
            const className = Inputs[`${daycodes[i]}-${j}`].value.toUpperCase();
            dayClass.push((className !== "" & classList.includes(className) & className.search(" ") === -1) ? className : null);
        }
        timetable.push(dayClass);
    }
    timetable.push(null);

    localStorage.setItem('application-data', JSON.stringify({ user_name, classDetails, timetable }));
    window.location.href = "./";
})


function shareTimeTable() {
    const params = new URLSearchParams(new FormData(Inputs));
    const link = window.location.origin + window.location.pathname + `?${params}`;

    navigator.share({
        title: "Share Time Table",
        url: link
    }).then(() => {
        window.location.search = ""
        window.location.pathname += "/..";
    })
}


if (window.location.href.indexOf('?') !== -1) {
    const params = new URLSearchParams(window.location.search)
    params.forEach((val, key) => {
        try {
            Inputs[key].value = val;
        } catch (err) {
            null;
        }
    })
} else localappData && loadAppData(localappData);