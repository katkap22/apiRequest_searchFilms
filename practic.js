//OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=13bb1f00
//s фильм
//type тип
//y год выпуска 

const apiKey = '13bb1f00';
const apiUrl = 'http://www.omdbapi.com/';

const form = document.querySelector('.searchForm');
const resultWrapper = document.querySelector('.resultWrapper');

form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
  const searchValue = form.querySelector('#searchInput').value;
  const typeValue = form.querySelector('#typeInput').value;
  const yearValue = form.querySelector('#yearInput').value;

  const params = new URLSearchParams();
  params.append("apikey", apiKey);
  params.append("s", searchValue);
  params.append("type", typeValue);
  params.append("y", yearValue);
  
  fetch(`${apiUrl}?${params}`)
    .then(data => data.json())
    .then(data => {
      const output = resultWrapper.querySelector('.resultOutput');
      clearResulOutput();
      if (data.Response === "True") { 
        data.Search.forEach(film => {
          const filmTemplate = `
            <div class="filmItem">
              <h3>${film.Title}</h3>
              <img src="${film.Poster}" alt="${film.Title}">
              <p class="filmItem_year">${film.Year}</p>
            </div>
          `;
          output.innerHTML += filmTemplate;
        }); 
      } else {
        output.innerHTML = `<p>По вашему запросу ничего не нашлось</p>`;
      }
      showResultOutput();
   });
}

function clearResulOutput() {
  resultWrapper.classList.remove('isShown');
  const output = resultWrapper.querySelector('.resultOutput');
  output.innerHTML = '';
}

function showResultOutput() {
  resultWrapper.classList.add('isShown');
}
