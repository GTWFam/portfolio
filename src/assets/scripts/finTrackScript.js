export function loadFinTrack() {
    const tabs = document.querySelectorAll('.tabs li');
    const tabContents = document.querySelectorAll('#tabs-content > div');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('is-active'))
            tab.classList.add('is-active')

            const target = tab.dataset.target;
            tabContents.forEach(month => {
                if (month.getAttribute('id') === target) {
                    month.classList.remove('is-hidden');
                } else {
                    month.classList.add('is-hidden');
                }
            })
        })
    })
}