// Check for Notification Permisiions
let notificationPermission = Notification.permission === 'granted';
Notification.permission === "default" && Notification.requestPermission((res) => notificationPermission = res === "granted");

let userName = localStorage.getItem('user-name') || null;

function notifyClass(className) {
    if (!serviceWorker) return;
    if (!notificationPermission) return;
    const currentTime = new Date();
    const prevNotification = JSON.parse(localStorage.getItem('notification-track') || null);
    if (prevNotification) {
        if (currentTime.getTime() < new Date(Number(prevNotification.expiry)) && className === prevNotification.className) return;
    };
    const options = {
        body: `Hey ${userName}.\nYou have "${className}" in few Minutes`,
        icon: './icons/icon.png',
    }
    serviceWorker.showNotification('CSE-B Class Alert', options);
    localStorage.setItem('notification-track', JSON.stringify({
        expiry: currentTime.getTime() + 2700000,
        className
    }))
}



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
        notifyClass(String(cls));
    }
};

runEachSecond();
setInterval(runEachSecond, 1000);


// Get user deatils
if (!userName) {
    userName = prompt('Enter Your username');
    if (userName === "") userName = null;
    else {
        localStorage.setItem('user-name', userName);
    }
}