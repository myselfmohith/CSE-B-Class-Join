// Check for Notification Permisiions
let notificationPermission = Notification.permission === 'granted';
Notification.permission === "default" && Notification.requestPermission((res) => notificationPermission = res === "granted");

function notifyClass(className) {
    if (!serviceWorker) return;
    if (!notificationPermission) return;
    const currentTime = new Date();
    const prevNotification = JSON.parse(localStorage.getItem('notification-track') || null);
    if (prevNotification) {
        if (currentTime.getTime() < new Date(Number(prevNotification.expiry)) && className === prevNotification.className) return;
    };
    const options = {
        body: `Hello ${appData['user_name']}.\nYou have "${className}" in few Minutes`,
        icon: './icons/icon.png',
        requireInteraction: true
    }
    serviceWorker.showNotification('CSE-B Class Alert', options);
    localStorage.setItem('notification-track', JSON.stringify({
        expiry: currentTime.getTime() + 3000000,
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

    const today = timetable[time.getDay()];
    let cls = null;
    if (!today) return;
    for (var i = 0; i < classStart.length; i++) {
        let [st, et] = [classStart[i], classEnd[i]].map(customFormatToTime);
        if (st <= time && et >= time) cls = today[i];
    }
    if (cls) {
        document.getElementById('current-class').innerHTML = `<p>Current Class</p><h1><a href="${appData['classDetails'][cls].link}" target="blank" >${cls}</a></h1>`;
        notifyClass(String(cls));
    } else document.getElementById('current-class').innerHTML = "";
};

runEachSecond();
setInterval(runEachSecond, 1000);