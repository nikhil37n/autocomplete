const FRUITS = ['Apple', 'Banana', 'Mango', 'Appricot', 'Blueberry'];

const searchInput = document.getElementById('search-input');
const suggestionBox = document.getElementById('suggestion-wrapper');

const getSuggestions = async (keyword) => {
    const result = FRUITS.filter(i => i.substr(0, keyword.length).toLowerCase() === keyword.toLowerCase());

    return new Promise(res => {
        setTimeout(() => res(result), 1000)
    });
}

const resetState = () => {
    suggestionBox.classList.remove('suggestion-visible');
}

const debounce = (fn,delay=500) => {
    let timer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(context, args), delay)
    }
}

const renderDropdownList = (list) => {
    const dropdownFragment = document.createDocumentFragment();
    list.forEach(item => {
        const el = document.createElement('div');
        el.innerHTML = item;
        el.classList.add('dropdown-item');
        el.setAttribute('data-key', item);
        dropdownFragment.appendChild(el);
    })
    suggestionBox.innerHTML = '';
    suggestionBox.appendChild(dropdownFragment)
}

const handleSearch = async (keyword) => {
    const result = await getSuggestions(keyword);
    if(result.length) {
        suggestionBox.classList.add('suggestion-visible');
        renderDropdownList(result);
    } else {
        resetState();
    }
}

const handleInputChange = (event) => {
    console.log(event.target.value)
    const value = event.target.value;
    if(value) {
        handleSearch(value);
    } else {
        resetState();
    }
}

const handleSelect = (event) => {
    const { key } = event.target.dataset;
    if(key) {
        searchInput.value = key;
        resetState();
    }
}

(() => {
    searchInput.addEventListener('input', debounce(handleInputChange, 400));
    suggestionBox.addEventListener('click', handleSelect);
})();



