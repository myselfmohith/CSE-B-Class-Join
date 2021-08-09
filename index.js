function customFormatToTime(timeString) {
    const [hr, min] = timeString.split(":").map(i => Number(i));
    const time = new Date();
    time.setHours(hr);
    time.setMinutes(min);
    return time;
}

function runEachSecond() {
    const time = new Date();
    document.getElementById('time').innerText = `${time.toDateString()} - ${time.toLocaleTimeString()}`;

    const today = jsonData.timetable[time.getDay()];
    let cls = null;
    if (!today) return;
    for (var i = 0; i < jsonData.classStart.length; i++) {
        let [st, et] = [jsonData.classStart[i], jsonData.classEnd[i]].map(customFormatToTime);
        if (st <= time && et >= time) cls = today[i];
    }
    if (cls) {
        document.getElementById('current-class').innerHTML = `<p>Current Class</p><h1><a href="${jsonData.links[cls]}" target="blank" >${cls}</a></h1>`;
    }
};

runEachSecond();
setInterval(runEachSecond, 1000);