const isLeapYear = (year) => {
    return (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
    );
};
const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
};
let calendar = document.querySelector('.calendar');

const company_car = ['AXK-9113', 'C8-7630']

const month_names_1 = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const month_names = [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
];
let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');

month_picker.onclick = () => {
    month_list.classList.remove('hideonce');
    month_list.classList.remove('hide');
    month_list.classList.add('show');
    dayTextFormate.classList.remove('showtime');
    dayTextFormate.classList.add('hidetime');
    timeFormate.classList.remove('showtime');
    timeFormate.classList.add('hideTime');
    dateFormate.classList.remove('showtime');
    dateFormate.classList.add('hideTime');
};

const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');
    let days_of_month = [
        31,
        getFebDays(year),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];

    let currentDate = new Date();

    month_picker.innerHTML = month_names[month];

    calendar_header_year.innerHTML = year;

    let first_day = new Date(year, month);

    var myDatabase = getDatebase();


    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {

        let day = document.createElement('div');
        day.setAttribute("onclick", "choiceDay(this);");


        if (i >= first_day.getDay()) {
            var temp_day = i - first_day.getDay() + 1
            day.innerHTML = temp_day;
            var find_booking_1 = year + '-' + (month + 1) + '-' + temp_day + 'AXK-9113';
            var find_booking_2 = year + '-' + (month + 1) + '-' + temp_day + 'C8-7630';
            //console.log(find_booking_1);
            if (i - first_day.getDay() + 1 === currentDate.getDate() &&
                year === currentDate.getFullYear() &&
                month === currentDate.getMonth()
            ) {
                day.classList.add('current-date');
            }
            else if (myDatabase[find_booking_1] === true || myDatabase[find_booking_2] === true) {
                day.classList.add('booking-date');
            }


        }


        calendar_days.appendChild(day);
    }
};

let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;

    month_list.append(month);
    month.onclick = () => {
        currentMonth.value = index;
        generateCalendar(currentMonth.value, currentYear.value);
        month_list.classList.replace('show', 'hide');
        dayTextFormate.classList.remove('hideTime');
        dayTextFormate.classList.add('showtime');
        timeFormate.classList.remove('hideTime');
        timeFormate.classList.add('showtime');
        dateFormate.classList.remove('hideTime');
        dateFormate.classList.add('showtime');
    };
});

(function () {
    month_list.classList.add('hideonce');
})();
document.querySelector('#pre-year').onclick = () => {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = () => {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };

var today = {
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
}

generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');

const currshowDate = new Date();
const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
};
const currentDateFormate = new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption
).format(currshowDate);
todayShowDate.textContent = currentDateFormate;
setInterval(() => {
    const timer = new Date();
    if (today.day != timer.getDate()) {
        today.day = timer.getDate();
        today.month = timer.getMonth() + 1;
        today.year = timer.getFullYear();
    }
    const option = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
    let time = `${`${timer.getHours()}`.padStart(
        2,
        '0'
    )}:${`${timer.getMinutes()}`.padStart(
        2,
        '0'
    )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
    todayShowTime.textContent = formateTimer;
}, 1000);


var choice_information = {
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
    car: 'AXK-9113'
}



//console.log(choice_information);

function getDatebase() {
    var myDatabase;
    $.ajax({
        url: 'get_rent_car_information',
        type: 'GET', // type of the HTTP request
        async: false,
        success: function (data) {
            myDatabase = jQuery.parseJSON(data);

        }
    });

    return myDatabase;


}

function showBookingInformation(buffer_date) {
    var myDatabase = getDatebase();
    var search_index = [];
    for (let i = 0; i < company_car.length; i++) {
        search_index.push(buffer_date.year + '-' + buffer_date.month + '-' + buffer_date.day + company_car[i]);
    }
    //console.log(myDatabase)
    //console.log('showBookingInformation:')
    //console.log(search_index)
    var get_div_information = document.getElementById('booking-information');
    get_div_information.innerHTML = '';

    for (let i = 0; i < search_index.length; i++) {
        if (myDatabase[search_index[i]] === true) {
            if (i !== 0) {
                get_div_information.innerHTML += '-----------------<br>'
            }
            get_div_information.innerHTML +=
                '已被預定日期 :<br>' +
                buffer_date.year + ' - ' + buffer_date.month + ' - ' + buffer_date.day + '<br>' +
                '出租車子 :<br>' +
                company_car[i] + '<br>';
        }
    }

}

function choiceCar(license_plate_number) {
    //console.log(choice_information);
    choice_information.car = license_plate_number;
    showInformation(true);
}

function choiceDay(elem) {
    //console.log("You have clicked " + elem.textContent);
    //console.log(choice_information);
    choice_information = {
        day: elem.innerHTML,
        month: currentMonth.value + 1,
        year: currentYear.value,
        car: choice_information.car,
    }
    var change = determine_valid_date(choice_information)


    showInformation(change);
    showBookingInformation(choice_information);

}

function determine_valid_date(buffer_date) {
    //console.log(buffer_date);
    //console.log(today);
    if (buffer_date.year > today.year) {
        return true;
    }
    else if (buffer_date.year < today.year) {
        return false;
    }
    else if (buffer_date.month > today.month) {
        return true;
    }
    else if (buffer_date.month < today.month) {
        return false;
    }
    else if (buffer_date.day <= today.day) {
        return false;
    }
    return true;
}

function showInformation(change) {
    var get_div_information = document.getElementById('rent-information');
    get_div_information.innerHTML = '';
    if (change) {
        get_div_information.innerHTML =
            '選取預定日期 :<br>' +
            choice_information.year + ' - ' + choice_information.month + ' - ' + choice_information.day + '<br>' +
            '出租車子 :<br>' +
            choice_information.car;
    }


}

function postInformation() {
    var index_search = choice_information.year + '-' + choice_information.month + '-' + choice_information.day + choice_information.car;
    var myDatabase = getDatebase();
    console.log(myDatabase);
    console.log(index_search)

    if (determine_valid_date(choice_information) === false) {
        alert('此日期無法預定')
        return;
    }
    else if (myDatabase[index_search] === true) {
        alert('此日期已被預訂')
        return;
    }
    $.ajax({
        url: '/send_rent_car_day',
        data: {
            "year": choice_information.year,
            "month": choice_information.month,
            "day": choice_information.day,
            "car": choice_information.car,


        },
        type: 'POST',
        success: function (data) {
            console.log('post success')
        },
        error: function (xhr) {
            alert('Ajax request 發生錯誤');
        }
    });

}

