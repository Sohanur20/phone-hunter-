
const loadPhone = async (searchTexts) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchTexts}`)

    const data = await res.json()
    const phones = data.data;
    //console.log(phones)
    displayPhones(phones)

}

const displayPhones = (phones) => {

    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''

    // show all

    const showContainer = document.getElementById('show-all-btn');

    if (phones.length > 12) {

        showContainer.classList.remove('hidden')
    } else {
        showContainer.classList.add('hidden')
    }

    phones = phones.slice(0, 12)


    phones.forEach(phone => {
        //
        const phoneCard = document.createElement('div')

        phoneCard.classList = `card w-96 bg-base-100 shadow-xl grid gri`
        phoneCard.innerHTML = `<figure class="px-10 pt-10">
<img src=${phone.image} alt=""
    class="rounded-xl" />
</figure>
<div class="card-body items-center text-center">
<h2 class="card-title">${phone.phone_name}</h2>

<p>${phone.brand}</p>
<p>${phone.slug}</p>
<div class="card-actions">
    <button class="btn btn-primary">Buy Now</button>
</div>
</div> `;

        phoneContainer.appendChild(phoneCard)


    });




}

const handleSearch = () => {

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText)
    loadPhone(searchText)



}


// loadPhone()