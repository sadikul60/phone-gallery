// phonesLoad
const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
};


// displayPhones
const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phones-container');

    phonesContainer.textContent = '';
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
    

    // no display phones
    const noPhone = document.getElementById('no-phone-found');
    if (phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }

    // display all
    phones.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-5 text-center">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title">${phone.phone_name}</h3>
                    <p class="card-text">${phone.slug}</p>
                    <footer><button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> Show Details </button></footer>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop loader or spinner 
    toggoleSpinner(false);
};


// processSearch added function 
const processSearch = (dataLimit) =>{
    toggoleSpinner(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

// search your phone (search button event handlar)
document.getElementById('search-btn').addEventListener('click', function(){
    // start loader or spinner
    processSearch(10);
});

// Enter key press function (search enter key press event handler)
document.getElementById('search-field').addEventListener('keypress', function(event){
    // console.log(event.key)
    if (event.key === 'Enter'){
        processSearch(10);
    }
})

// toggoleSpinner Loader adding condition
const toggoleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

// show all button added event handler
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

// loadPhoneDetails
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

// displayPhoneDetails
const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsModal');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p class="text-start mb-4 h3">Brand: ${phone.brand ? phone.brand : 'No Brand Found'} </p>
    <img src="${phone.image}">
    <p class="text-start mt-4 h4">Name: ${phone.name ? phone.name : 'No Name Found'} </p>
    <p class="text-start h4">Slug: ${phone.slug ? phone.slug : 'No Name Found'} </p>
    <p class="text-start h4">ChipSet: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No ChipSet Information'} </p>
    <p class="text-start h4">Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No ChipSet Information'} </p>
    <p class="text-start h4">Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'No Memory Information'} </p>
    <p class="text-start h4"> Bluetooth: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'} </p>
    <p class="text-start h4"> GPS: ${phone.others ? phone.others.GPS : 'No GPS Information'} </p>
    <p class="text-start h4"> NFC: ${phone.others ? phone.others.NFC : 'No NFC Information'} </p>
    <p class="text-start h4"> Radio: ${phone.others ? phone.others.Radio : 'No Radio Information'} </p>
    <p class="text-start h4"> USB: ${phone.others ? phone.others.USB : 'No USB Information'} </p>
    <p class="text-start h4"> WLAN: ${phone.others ? phone.others.WLAN : 'No WLAN Information'} </p>
    `;
}
loadPhones('apple');