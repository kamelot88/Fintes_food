'use script';
window.addEventListener('DOMContentLoaded', () => {

//! Tabs
const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParend = document.querySelector('.tabheader__items');


function hideTabContent() {
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
}

function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

tabsParend.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.matches('.tabheader__item')) {
        tabs.forEach((item, i) => {
            if (item === target) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});

//! Timer
const deadline = '2023-02-21';

function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if (t <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24));
        hours = Math.floor((t / (1000 * 60 *60)) % 24);
        minutes = Math.floor((t / 1000 / 60) % 60);
        seconds = Math.floor((t / 1000) % 60);
    }
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function addClockforTimer(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeinterval = setInterval(updateClock, 1000);

updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);
        days.innerHTML = addClockforTimer(t.days);
        hours.innerHTML = addClockforTimer(t.hours);
        minutes.innerHTML = addClockforTimer(t.minutes);
        seconds.innerHTML = addClockforTimer(t.seconds);
        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }
}

setClock('.timer', deadline);

//! Modal wondow 
const btnsModal = document.querySelectorAll('[data-modal]'),
      closeModal = document.querySelector('[data-close]'),
      modal = document.querySelector('.modal');

btnsModal.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
    });
});

function closeModals() {
    modal.classList.toggle('show');
    document.body.style.overflow = '';
}
closeModal.addEventListener('click', closeModals);

modal.addEventListener('click', (e) => {
    if (e.target.matches('.modal')) {
        closeModals();
    }
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModals();
    }
});









});