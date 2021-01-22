const span = document.querySelector(".pname");

// Jason File here >>>>>
const info = `{
    "links": {
      "INT18R371": "//meet.google.com/obf-rgqt-tpt",
      "CSE18R173": "//meet.google.com/dev-tgvn-hov",
      "CSE18R273": "//meet.google.com/wqr-ecgm-awx",
      "CSE18R260": "//meet.google.com/pyf-ftxx-cdc",
      "MAT18R207": "//meet.google.com/pbo-ubqb-zjm",
      "BIT18R101": "//meet.google.com/woa-pzxk-mwz",
      "NONE": "index.html"
    },
    "1": {
      "Day": "Monday",
      "1": "BIT18R101",
      "2": "CSE18R273",
      "3": "CSE18R173",
      "4": "CSE18R260",
      "5": "MAT18R207",
      "6": "CSE18R273",
      "7": "INT18R371"
    },
    "2": {
      "Day": "Tuesday",
      "1": "INT18R371",
      "2": "INT18R371",
      "3": "CSE18R173",
      "4": "CSE18R173",
      "5": "CSE18R273",
      "6": "CSE18R173",
      "7": "MAT18R207"
    },
    "3": {
      "Day": "Wednesday",
      "1": "CSE18R273",
      "2": "BIT18R101",
      "3": "CSE18R173",
      "4": "CSE18R260",
      "5": "NONE",
      "6": "MAT18R207",
      "7": "NONE"
    },
    "4": {
      "Day": "Thrusday",
      "1": "BIT18R101",
      "2": "NONE",
      "3": "CSE18R273",
      "4": "CSE18R273",
      "5": "CSE18R173",
      "6": "MAT18R207",
      "7": "INT18R371"
    },
    "5": {
      "Day": "Friday",
      "1": "CSE18R273",
      "2": "CSE18R260",
      "3": "CSE18R260",
      "4": "CSE18R260",
      "5": "CSE18R173",
      "6": "MAT18R207",
      "7": "INT18R371"
    },
    "6": {
        "Day": "Saturday",
        "1": "NONE",
        "2": "NONE",
        "3": "NONE",
        "4": "NONE",
        "5": "NONE",
        "6": "NONE",
        "7": "NONE"
    }
  }
  `;



function parseTime(text) {
  var mxm = new Date();
  var c = text.split(":");
  mxm.setHours(Number(c[0]), Number(c[1]), 0, 0);
  return mxm;
}

function parseText(date) {
  var res = date.getHours() + ":" + date.getMinutes();
  return res;
}

const timetable = JSON.parse(info);
const tstart = [
  parseTime("8:57"),
  parseTime("9:57"),
  parseTime("10:57"),
  parseTime("11:57"),
  parseTime("13:57"),
  parseTime("14:48"),
  parseTime("15:38"),
];
const tend = [
  parseTime("9:50"),
  parseTime("10:50"),
  parseTime("11:50"),
  parseTime("12:50"),
  parseTime("14:48"),
  parseTime("15:38"),
  parseTime("16:30"),
];
var cclass, clink, forhtml;

function changeClass() {
  var xyz = new Date();
  for (var i = 0; i < 7; i++) {
    if (xyz >= tstart[i] && xyz < tend[i]) {
      cclass = timetable[xyz.getDay()][i + 1];
      if (cclass === "NONE") break;
      clink = timetable["links"][cclass];
      forhtml =
        "<a target='_blank' onClick='javascript:setTimeout(window.close, 1);' href='" +
        clink +
        "'>" +
        cclass +
        "</a";
      span.innerHTML = forhtml;
      return;
    }
  }
  forhtml = "NONE";
  span.innerHTML = forhtml;
}

// Alert to Join
var timenow = new Date();
function alertUser() {
  for (var i = 0; i < 7; i++) {
    if (timenow >= tstart[i] && timenow < tend[i]) {
      var ccclass = timetable[timenow.getDay()][i + 1];
      if (ccclass === "NONE") break;
      cclink = timetable["links"][ccclass];
      var alertmessage = "Would you like to be Redirected 🚗 to " + ccclass + " class";
      if (confirm(alertmessage)) {
        setTimeout(window.close, 1000);
        window.open(cclink, '_blank');
      }
    }
  }
}

if (timenow.getDay() != 7) {
  changeClass();
  setTimeout(alertUser, 100);
  setInterval(changeClass, 40000);
}
