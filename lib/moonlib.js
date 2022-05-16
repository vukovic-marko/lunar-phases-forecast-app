import Astronomy from 'astronomy-engine'
import dayjs from 'dayjs'

/**Calculates moonrise and moonset times and moon phases.
 * 
 * @param {string} start start date in format 'YYYY-MM-DD'
 * @param {string} end end date in format 'YYYY-MM-DD'
 * @param {number} lat latitude
 * @param {number} lon longitude
 */
const moon = (start, end, lat, lon) => {

let currentDate = dayjs(start)
const endDate = dayjs(end)
let array = {}

// make empty object
while(!currentDate.isSame(endDate, 'date')) {
    array[currentDate.format('YYYY-MM-DD')] = { moonrise: null, moonset: null};
    currentDate = currentDate.add(1, 'day')
}

// calculate moonrise and moonset times and place them in the empty object
currentDate = dayjs(start)
while(!currentDate.isSame(endDate, 'date')) {
    let moonrise = Astronomy.SearchRiseSet('Moon', Astronomy.MakeObserver(lat, lon), 1, new Date(currentDate.$d), 1);
    let moonset = Astronomy.SearchRiseSet('Moon', Astronomy.MakeObserver(lat, lon), -1, new Date(currentDate.$d), 1);
    
    let moonriseDate = dayjs(moonrise.date).format('YYYY-MM-DD')
    // let moonriseTime = dayjs(moonrise.date).format('HH:mm')

    let moonsetDate = dayjs(moonset.date).format('YYYY-MM-DD')
    // let moonsetTime = dayjs(moonset.date).format('HH:mm')

    if (moonriseDate in array) {
        // array[moonriseDate].moonrise = moonriseTime;
        array[moonriseDate].moonrise = dayjs(moonrise);
    }
    if (moonsetDate in array) {
        // array[moonsetDate].moonset = moonsetTime;
        array[moonsetDate].moonset = dayjs(moonset);
    }
    currentDate = currentDate.add(1, 'day')
}

// moonphases 

let curDate = new Date(start)
let ar = {}

// turns moon phase value to moon phase title
const phaseToTitle = (phase) => {
    switch(phase) {
        case 0:
            return 'New Moon';
        case 1:
            return 'First Quarter';
        case 2:
            return 'Full Moon';
        case 3:
            return 'Third Quarter';
        default:
            return null;
    }
}

// finds moon quarters (new moon, first quarter, full moon, last quarter)
let phase = Astronomy.SearchMoonQuarter(new Date(start))
let phaseTitle = phaseToTitle(phase.quarter)
ar[dayjs(phase.time.date).format('YYYY-MM-DD')] = {phase: phaseTitle, local: dayjs(phase.time.date).format('YYYY-MM-DD HH:mm ZZ')}
while(dayjs(curDate).isBefore(endDate)) {
    phase = Astronomy.NextMoonQuarter(phase);
    let phaseTitle = phaseToTitle(phase.quarter)
    let key = dayjs(phase.time.date).format('YYYY-MM-DD').toString()
    ar[key] = {phase: phaseTitle, local: dayjs(phase.time.date).format('YYYY-MM-DD HH:mm ZZ')}
    curDate = phase.time.date
}

let s = dayjs(start)
const e = dayjs(end)
let a = []

// creates empty array with dates ?
while(!s.isSame(e, 'date')) {
    a.push([s.format('YYYY-MM-DD'), null])
    s = s.add(1, 'day')
}

// places found moon quarters in the empty array
a.forEach((item) => {
    if (item[0] in ar) {
        item[1] = ar[item[0]].phase;
    }
})

//recursive function to fill empty values (waxing crescent, waxing gibbous, waning gibbous, waning crescent)
const rec = (index, phase) => {    
    if (index >= 0 && a[index][1] == null) {
        a[index][1] = phase;
        rec(index-1, phase);
    }
}

//calls recursive function
a.forEach((item,index) => {
    if (item[1] === 'First Quarter') {
        rec(index-1, 'Waxing Crescent')
    } else if (item[1] === 'Full Moon') {
        rec(index-1, 'Waxing Gibbous')
    } else if (item[1] === 'Third Quarter') {
        rec(index-1, 'Waning Gibbous')
    } else if (item[1] === 'New Moon') {
        rec(index-1, 'Waning Crescent')
    }
})

//fills dates after the last quarter
let temp = ''
a.forEach((item, index) => {
    if (item[1] === 'First Quarter') {
        temp = 'Waxing Gibbous'
    } else if (item[1] === 'Full Moon') {
        temp = 'Waning Gibbous'
    } else if (item[1] === 'Third Quarter') {
        temp = 'Waning Crescent'
    } else if (item[1] === 'New Moon') {
        temp = 'Waxing Crescent'
    } else if (item[1] == null) {
        item[1] = temp
    }
})

// turns array to object
let obj = {}
a.forEach((item) => {
    obj[item[0]] = { phase : item[1] }
})

// combines two objects
for (const [key, value] of Object.entries(obj)) {
    if (key in array) {
        array[key].phase = value.phase
    }
  }

let arr = []

for (const [key, value] of Object.entries(array)) {
    arr.push({date: key, moonrise: value.moonrise, moonset: value.moonset, moonphase: value.phase})
  }


return arr
}

module.exports = { moon }