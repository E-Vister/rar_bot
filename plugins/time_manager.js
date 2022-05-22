module.exports.ms = (timeStr) => {
    if(!timeStr) return false

    if(timeStr.length < 2) return false

    const template = timeStr.slice(-1);
    let timeValue = timeStr.slice(0, -1);

    switch (template) {
        case "s":
            return timeValue * 1000;
        case "m":
            return timeValue * 1000 * 60;
        case "h":
            return timeValue * 1000 * 60 * 60;
        case "d":
            return timeValue * 1000 * 60 * 60 * 24;
        default:
            return false
    }
}

module.exports.formatTime = (timestamp = new Date()) => {
    let date = new Date(timestamp);
    return `${checkZero(date.getDate())}.${checkZero(date.getMonth())}.${date.getFullYear()} ` +
        `${checkZero(date.getHours())}:${checkZero(date.getMinutes())}:${checkZero(date.getSeconds())}`;
}

function checkZero(value) {
    return (value < 10) ? ('0' + value) : (value)
}