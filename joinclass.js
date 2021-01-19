const span = document.querySelector(".pname");

const info = `{
    "links": {
      "INT18R371": "https://meet.google.com/obf-rgqt-tpt",
      "CSE18R173": "https://meet.google.com/dev-tgvn-hov",
      "CSE18R273": "https://meet.google.com/wqr-ecgm-awx",
      "CSE18R260": "https://meet.google.com/pyf-ftxx-cdc",
      "MAT18R207": "https://meet.google.com/pbo-ubqb-zjm",
      "BIT18R101": "https://meet.google.com/ygc-vvgz-xmh"
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
      "6": "MAT18R207"
    },
    "4": {
      "Day": "Thrusday",
      "1": "BIT18R101",
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
      "6": "CSE18R173",
      "7": "MAT18R207"
    },

    "5": {
        "Day": "Friday"
    }
  }
  `;

function parseTime(text) {
    var mxm = new Date();
    var c = text.split(":");
    mxm.setHours(Number(c[0]), Number(c[1]), 0)
    return mxm;
}

const timetable = JSON.parse(info);
tstart = [parseTime("9:0"),parseTime("10:0"),parseTime("11:0"),parseTime("12:0"),parseTime("14:0"),parseTime("14:50"),parseTime("15:40")]
tend = [parseTime("9:50"),parseTime("10:50"),parseTime("11:50"),parseTime("12:50"),parseTime("14:50"),parseTime("15:40"),parseTime("16:30")]
var cclass , clink ,forhtml;

function changeClass() {
    var xyz = new Date();
    for (var i = 0; i < 7; i++){
        if (xyz>=tstart[i] && xyz<tend[i]) {
            cclass = timetable[xyz.getDay()][i+1]; 
            clink = timetable["links"][cclass];
            forhtml = "<a target='_blank' href='" + clink + "'>" + cclass + "</a";
            span.innerHTML = forhtml;
            return;
        }
    }
    forhtml = "NONE";
    span.innerHTML = forhtml;
}

setTimeout(changeClass, 0);
setInterval(changeClass, 20000);
