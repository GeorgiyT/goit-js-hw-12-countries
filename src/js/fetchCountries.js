function fetchCountries(searchQuery, mainUrl) {
  return fetch(`${mainUrl}${searchQuery}`).then(responce => responce.json());
}
export default { fetchCountries };
