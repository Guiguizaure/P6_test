import { displayMedia } from "../pages/photographer.js";
import { likesInfos } from "./static.js";

 const selectSort = document.querySelector('.selectBox');

selectSort.innerHTML = `   
      <div class="works-sort">
          <div>
             <p class="sort-title">Trier par</p>
          </div>

          <div id="sort-wrapper" >
              <div class="sort-base" >
                  <button id="select-first-option" class="select-option" aria-label="Section trier par: ">
                    <span id="select-first-option-text" data-filtre="Popularit√©" >Popularit√©</span>
                  </button>
                  <span class="fas fa-chevron-up arrow-down-open"></span>
              </div>
              <div class="flex-block-button">
                <div id="select-block-options" role="listbox">
                  <button class="select-option date" data-filtre="Date" >Date</button>
                  <button class="select-option titre" data-filtre="Titre" >Titre</button>
                </div>
              </div>
          </div>
      </div>`;



      
let isOpen = false;

const selectOptions = document.querySelector('#select-block-options');

let firstButtonText = document.querySelector('#select-first-option-text');

const arrow = document.querySelector('.arrow-down-open')  

const optionsButtons = selectOptions.querySelectorAll('button');

const select = document.querySelector('.sort-base');

document.querySelector('#select-first-option').addEventListener('click', () => {
   arrow.classList.toggle("arrow-down-open");
  if (isOpen === false) {
    // Ouvrir le select

    selectOptions.style.display = 'block';
    select.style.borderRadius = '7px 7px 0 0';

    isOpen = true;

    return handleButtonsOptions();
  }

  if (isOpen === true) {
    return closeSelect();
  }
});

function closeSelect() {
  // Fermer le select

  selectOptions.style.display = 'none';
  select.style.borderRadius = '7px';

  return (isOpen = false);
}


export function handleButtonsOptions() {
  optionsButtons.forEach((button) => {
    button.onclick = () => {
      const buttonText = button.textContent;

      button.innerHTML = firstButtonText.textContent;
      button.dataset.filtre = buttonText;

      firstButtonText.innerHTML = buttonText;
      firstButtonText.dataset.filtre = buttonText;

      return closeSelect();
    };
  });
}

/*////////////////////////////////////////////////////////////////////*/

export function sortData(data, photographer, totalLikes, dayPrice) {
  function sortMedia(data) {
    for (const element of optionsButtons) {
      element.addEventListener('click', function (e) {
       

        if (e.target.dataset.filtre === 'Date') {
          const mediasSortedByDate = data.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          });
          displayMedia(mediasSortedByDate, photographer);

        } else if (e.target.dataset.filtre === 'Titre') {
          const mediasSortedByTitre = data.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          displayMedia(mediasSortedByTitre, photographer);

        } else if (e.target.dataset.filtre === 'Popularit√©') {
          const triPopularite = data.sort((a, b) => {
            return a.likes < b.likes ? 1 : -1;
          });
          displayMedia(triPopularite, photographer);
        }
      });
    }
   
  }

  sortMedia(data);
  likesInfos(totalLikes, dayPrice);
  
}