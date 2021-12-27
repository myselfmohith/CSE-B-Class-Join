const appData = JSON.parse(localStorage.getItem('application-data') || deafaultData);
const course_details = document.getElementById('course-details');
const time_table = document.getElementById('time-table');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const classStart = ["08:58", "09:53", "10:53", "11:48", "13:28", "14:19", "15:18", "16:10"];
const classEnd = ["09:50", "10:45", "11:45", "12:40", "14:18", "15:10", "16:08", "17:00"];

!appData ? window.location.href = "./edit.html" : null;

document.getElementById('user-info').innerText = "Hello " + appData['user_name'] + " 👋🏻";
// load course details
let appendTxt = ""
for (const [class_code, class_info] of Object.entries(appData['classDetails'])) {
    appendTxt += `
    <tr>
    <td><a target="_blank" href="${appData['classDetails'][class_code]['link']}">${class_code}</a></td>
    <td>${class_info['name']}</td>
    <td>${class_info['faculty']}</td>
    </tr>
    `
}
course_details.innerHTML += appendTxt;

// load time table
appendTxt = "<tr><th></th>"
// header
for (var i = 0; i < classStart.length; i++) appendTxt += `<th>${classStart[i]} - ${classEnd[i]}</th>`;
appendTxt += "</tr>";

const timetable = appData['timetable'];
timetable[6] = timetable[56] || null;

for (var i = 0; i < timetable.length; i++) {
    if (!timetable[i]) continue;
    appendTxt += `<tr><td class="week-header">${days[i]}</td>`;
    for (var j of timetable[i]) appendTxt += `<td>${j ? `<a target="_blank" href="${appData['classDetails'][j]["link"]}">${j}</a>` : ""}</td>`;
    appendTxt += '</tr>';
}

time_table.innerHTML += appendTxt;
