'use strict';
let co = console.log;

const zaedno = document.querySelector('.zaedno')
const centar = document.querySelector('.centar')
const items = document.querySelector('.items');
const popUp = document.querySelector('.pop-up');
const searchBox = document.querySelector('.search');

const item = items.getElementsByClassName('item');

const numOfResults = document.getElementById('numOfResults');
const showBtn = document.querySelector('.btn-footer');
const footer = document.querySelector('.footer');


window.addEventListener('DOMContentLoaded', fetchData);
items.addEventListener('click', getCountry);

let html = ``;
function fetchData() {
    fetch('https://restcountries.com/v3.1/all').then(res => res.json()).then(country => {

        if (country) {
            Array.from(country).forEach((element, index) => {
                html += `
				<div class="item" data-number=${index}>
					<div class="imgtext">
					<img src=${element.flags.png} class="img" alt="picture" >
						<div class="text"  onClick="countryInfo()">
							<p class="name"><strong>Name:</strong> ${element.name.official}</p>
							<p><strong>Region:</strong> ${element.region}</p>
							<p><strong>Subregion:</strong> ${element.subregion}</p>
							<span class="tooltiptext">Country Info</span>
						</div>
					</div>
					<button class="item-btn btn-top">add to favorites</button>
				</div>`;
            })
        }
        items.insertAdjacentHTML('afterbegin', html);
    })
}


////////////////////////////////////////////////////////
// KOGA KE SE KLIKNE NA ZEMJA DA IZLEZE INFO ZA NEA

function getCountry(e) {
    e.preventDefault();

    // imeto na zemjata se zime da se stavi vo fetch da ja povlece samo taa zemja koga ke se klikne na nea
    if (e.target.parentElement.classList.contains('text')) {
        let targetChild = e.target.parentElement.children[0];
        let countryName = targetChild.innerHTML;
        let countryInfo = countryName.split(' ').slice(1).join(' ');

        fetch(`https://restcountries.com/v3.1/name/${countryInfo}`).then(res => res.json()).then(data => {
            data.forEach(country => {
                countryModal(country)
            })
        })
    }

}

///////////////////////////////////////////////
// COUNTRY MODAL

function countryModal(country) {

    let language = Object.entries(country.languages)
    let currencies = Object.entries(country.currencies)

    let html = `
			<button class="btn-top btn-popup" onClick="returnFromInfo()">go back</button>

			<div class="pop-up-container">
				<div class="img">
					<img src=${country.flags.png} alt="">
				</div>
				<div class="pop-up-text">
					<p><strong>Name:</strong> ${country.name.official}</p>
					<p><strong>Capital:</strong> ${country.capital}</p>
					<p><strong>Population:</strong> ${country.population}</p>
					<p><strong>Region:</strong> ${country.region}</p>
					<p><strong>Subregion:</strong> ${country.subregion}</p>
					<p><strong>Language:</strong> ${language[0][1]}</p>
					<p><strong>Currencies:</strong> ${currencies[0][1].name}</p>
					<p><strong>Continents:</strong> ${country.continents}</p>
				</div>
			</div>` ;

    popUp.innerHTML = html;
}

////////////////////////////////////////////////////////
// OPTION VALUE

let page = 1;
let optionValue;
let totalPage;

numOfResults.addEventListener('change', function (ele) {

    optionValue = ele.target.value;
    let arrItems = Array.from(item);
    buttonElement(totalPage, page)

    arrItems.forEach(ele => {
        ele.style.display = '';
    })

    if (optionValue === 'all') {
        arrItems.forEach(ele => {
            ele.style.display = '';
            showBtn.classList.add('hide')
        })
    } else if (ele.target.value !== 'all') {
        arrItems.slice(optionValue).forEach(ele => {
            ele.style.display = 'none';
            showBtn.classList.remove('hide')
        })
    }
})

////////////////////////////////////////////////////////
// BUTTON

function buttonElement(totalPage, page) {
    let divTag = ``;
    let activeDiv;
    let beforePage = page - 1;
    let afterPage = page + 1;

    let arrItems = Array.from(item);

    totalPage = Math.ceil(arrItems.length / optionValue);
    let start = (page - 1) * optionValue
    let end = start + Number(optionValue);
    let pagination = arrItems.slice(start, end)

    arrItems.forEach(ele => {
        ele.style.display = 'none';
    })

    pagination.forEach(ele => {
        ele.style.display = '';
    })

    if (page > 2) {
        divTag += `<div onClick="buttonElement(totalPage, 1)">1</div>`;
    }

    if (page > 3) {
        divTag += `<div>...</div>`;
    }

    if (page === 1) {
        afterPage = afterPage + 1
    } else if (page === afterPage + 1) {
        afterPage = afterPage + 1
    }

    for (let i = beforePage; i <= afterPage; i++) {
        if (i > totalPage) {
            continue;
        }
        if (i === 0) {
            i = i + 1
        }
        if (page === i) {
            activeDiv = 'active';
        } else {
            activeDiv = '';
        }
        divTag += `<div class="btn ${activeDiv} data-number=${i}" onClick="buttonElement(totalPage, ${i})">${i}</div>`;
    }

    if (page < totalPage - 1) {
        if (page < totalPage - 2) {
            divTag += `<div>...</div>`
        }
        divTag += `<div onClick="buttonElement(totalPage, ${totalPage})">${totalPage}</div>`;
    }

    showBtn.innerHTML = divTag;
}

//////////////////////////////////////////////////////////
// ADD TO FAVORITES

























































































































function countryInfo() {
    zaedno.classList.add('hide')
    popUp.classList.remove('hide')
}

function returnFromInfo() {
    zaedno.classList.remove('hide')
    popUp.classList.add('hide')
}



// SEARCH COUNTRY
searchBox.addEventListener('input', function (e) {

    let search = e.target.value.toLowerCase().trim();

    if (search !== '') {
        footer.classList.add('hide')
    } else {
        footer.classList.remove('hide')
    }

    Array.from(item).forEach(item => {
        let p = item.getElementsByTagName('p')[0];
        let textValue = p.innerHTML || p.textContent;

        if (textValue.toLowerCase().includes(search)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    })
});




















































































