
const loadPhone = async (searchTexts = 'oppo', isShowAll) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchTexts}`)

    const data = await res.json()
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones, isShowAll)

}

const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''

    // show all

    const showContainer = document.getElementById('show-all-btn');

    if (phones.length > 12 && !isShowAll) {

        showContainer.classList.remove('hidden')
    } else {
        showContainer.classList.add('hidden')
    }

    // console.log('isShow all', isShowAll)
    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }


    phones.forEach(phone => {
        // console.log(phone)
        const phoneCard = document.createElement('div')

        phoneCard.classList = `card w-96 bg-base-100 shadow-xl grid gri`
        phoneCard.innerHTML = `<figure class="px-10 pt-10">
<img src=${phone.image} alt=""
    class="rounded-xl" />
</figure>
<div class="card-body items-center text-center">
<h2 class="card-title">${phone.phone_name}</h2>

<p>${phone.brand}</p>

<div class="card-actions">
    <button onclick="handleShowDetails('${phone.slug}');
    my_modal_details.showModal()" class="btn btn-primary">Show Details</button>
</div>
</div> `;

        phoneContainer.appendChild(phoneCard)


    });

    toggleSpiner(false)


}

const handleSearch = (isShowAll) => {
    toggleSpiner(true)

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText)
    loadPhone(searchText, isShowAll)


}

const toggleSpiner = (isLoading) => {

    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    } else {
        loadingSpinner.classList.add('hidden')
    }
}


const handleShowAll = () => {

    handleSearch(true)
}

// card details

const handleShowDetails = async (id) => {



    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)

    const data = await res.json()
    const phone = data.data

    showPhoneDetails(phone)
}



const showPhoneDetails = (phone) => {
    console.log(phone)

    const phoneName = document.getElementById('phone-name-modal')
    phoneName.innerText = phone.name

    const showContainer = document.getElementById('container-details')
    showContainer.innerHTML = `
    <img  src=${phone.image} alt="">
    <p class="py-4 text-center">${phone.brand}</p>

    }</p>
    
    `

    my_modal_details.showModal()

}



loadPhone()