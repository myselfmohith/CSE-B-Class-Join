const jsonData = JSON.parse(data);
const time_table = document.getElementById('time-table');
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Rendering the Table.
// Table Header -- Timings
let appendString = "<tr class='table-header'><th class='week-header'></th>";
for (var i = 0; i < jsonData.classStart.length; i++) {
    appendString += `<th>${jsonData["classStart"][i]} - ${jsonData["classEnd"][i]}</th>`;
};
appendString += "</tr>";
time_table.innerHTML += appendString;


// Time-table -- Classes
// Set Saturday Time Table
jsonData.timetable[6] = jsonData.timetable[56] || null;
const classLinks = jsonData.timetable.links;
appendString = "";
for (var i = 0; i < jsonData.timetable.length; i++) {
    if (jsonData.timetable[i] === null) continue;
    appendString += `<tr><td class="week-header">${days[i]}</td>`;
    for (var j = 0; j < jsonData.timetable[i].length; j++) {
        appendString += `<td><a href="${jsonData.links[jsonData.timetable[i][j]]}" target="blank" >${jsonData.timetable[i][j] || ''}</a></td>`;
    }
    appendString += "</tr>";
};
time_table.innerHTML += appendString;