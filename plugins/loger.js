function checkZero(value){
    return (value < 10)?('0' + value):(value)
}

module.exports.formatData = (data) => {
    return `${checkZero(data.getDate())}.${checkZero(data.getMonth())}.${data.getFullYear()} ` +
        `${checkZero(data.getHours())}:${checkZero(data.getMinutes())}:${checkZero(data.getSeconds())}`;
}