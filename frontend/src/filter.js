function filterCategory(studentId) {
    const filterCategoryList = document.getElementById('filter-category')
    categoryAdapter.getAll().then(categories => {
        categories.forEach(category => {
            filterCategoryList.innerHTML += `<option value=${category.id}>${category.name}</option>`
        })
    })

    let filterDisplay = false
    document.getElementById('filter').addEventListener('click', (e) => {
        filterDisplay = !filterDisplay
        const filterContainer = document.getElementById('filter-container')
        if (filterDisplay) {
            filterContainer.style.display = 'block'
            const filterBar = document.getElementById('filter-bar')
            filterBar.addEventListener('submit', (e) => {
                e.preventDefault()
                const selectedCategoryId = e.target[0].value
                categoryAdapter.get(selectedCategoryId).then(cat => {
                    // console.log(cat)
                    const eventDiv = document.querySelector('div#events')
                    eventDiv.innerHTML = ''
                    cat.events.forEach(event => {
                        // debugger
                        showEvent(event, studentId)
                    })
                })
            })
        } else {
            filterContainer.style.display = 'none'
        }
    })
}
