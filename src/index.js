import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import api from './js/fetchCountries.js';
import countriesMurkup from './templates/countriesMarkup.hbs';
import oneCountryMarkup from './templates/oneCountryMarkup.hbs';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';

const refs = {
  countryInput: document.querySelector('.countryInput'),
  countryBox: document.querySelector('.countryBox'),
};

const mainUrl = 'https://restcountries.eu/rest/v2/name/';

refs.countryInput.addEventListener(
  'input',
  debounce(() => {
    api
      .fetchCountries(refs.countryInput.value, mainUrl)
      .then(dataFilter)
      .catch(noCountry);
  }, 500),
);

function dataFilter(data) {
  if (data.length > 10) toManyCountries();
  else if (data.length === 1) renderOneCountry(data);
  else if (data.length > 1 && data.length <= 10) renderCountries(data);
  else noCountry();
}

function noCountry() {
  error({
    text: 'Нет такой страны!',
  });
  console.log('Нет такой страны');
  refs.countryBox.innerHTML = '';
}

function renderOneCountry(data) {
  console.log(data[0].name);
  refs.countryBox.innerHTML = oneCountryMarkup(data);
}

function renderCountries(data) {
  console.log(data);
  refs.countryBox.innerHTML = countriesMurkup(data);
}

function toManyCountries() {
  error({
    text: 'Слишком много стран!',
  });
  console.log('Слишком много стран');
  refs.countryBox.innerHTML = '';
}
