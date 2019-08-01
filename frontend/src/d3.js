function importData() {
    d3.json(`${EVENTS_URL}/1/students`, function(data) {
        console.log(data)
    })
}