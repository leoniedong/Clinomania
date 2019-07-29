function displayDate(dateString) {
    let date = new Date(dateString)
    var options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false, timeZone: "Zulu"};
    let formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
    return formattedDate
}