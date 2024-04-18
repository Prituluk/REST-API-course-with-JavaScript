  const API_KEY ="live_Nllg6DCM3CdCM2UTa8TTsoP8Z5RFkA3nR3ATyWKAa0LjmVWBG4edCED8AxIATQCG";
  const URL_API_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=7&api_key=${API_KEY}` ;
  const URL_API_FAVORITES = `https://api.thecatapi.com/v1/favourites`;
  const URL_API_UPLOAD = 'https://api.thecatapi.com/v1/images/upload'

  const refreshButton = document.getElementById('refresh')

async function getCatRandom() {
  const container = document.getElementById('content')

  container.querySelectorAll('li:not(:first-child)').forEach(child => child.remove());

  const res = await fetch(URL_API_RANDOM)
  const data = await res.json()
  data.map(cat => {
    const content_li = document.createElement('li');
    content_li.classList.add('li-cat')
    const img_cat = document.createElement('img');
    const buttonLike = document.createElement('button');
    const iconFav = document.createElement('img');
    iconFav.classList.add('icon-fav');
    iconFav.src = '../../css/img/heart.svg';
    buttonLike.classList.add('btn-like');
    img_cat.classList.add('img-cat')
    img_cat.setAttribute('src', cat.url);
    container.appendChild(content_li); 
    content_li.appendChild(buttonLike);
    buttonLike.append(iconFav);
    content_li.appendChild(img_cat);


    buttonLike.addEventListener('click', () => {
      const svg = buttonLike.querySelector('.icon-fav');
      
      if (svg.classList.contains('liked')) {
        svg.classList.remove('liked');
      }else {
        svg.classList.add('liked');
        postFavorite(cat.id);
      }
    })
  })
  
}
if (refreshButton) {
  refreshButton.addEventListener('click', () => {
    
    getCatRandom();
  })
}  

async function postFavorite(id) {
  const res = await fetch(URL_API_FAVORITES, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'x-api-key': API_KEY} ,
    body: JSON.stringify({
      image_id: id
    })
});
  // const fav = await res.json();
}
async function loadFavorites() {
  const containerFav = document.getElementById('content-fav');
  if (containerFav) {
    const res = await fetch(URL_API_FAVORITES, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    const data = await res.json();
    containerFav.innerHTML="";
    data.map(cat => {
      const content_li_fav = document.createElement('li');
      content_li_fav.classList.add('li-cat')
      const img_cat = document.createElement('img');
      const buttonLike = document.createElement('button');
      const iconFav = document.createElement('img');
      iconFav.classList.add('icon-fav');
      iconFav.classList.add('liked')
      iconFav.src = '../../css/img/heart.svg';
      buttonLike.classList.add('btn-like');
      img_cat.classList.add('img-cat')
      img_cat.setAttribute('src', cat.image.url);
      containerFav.appendChild(content_li_fav); 
      content_li_fav.appendChild(buttonLike);
      buttonLike.append(iconFav);
      content_li_fav.appendChild(img_cat);
  
  
      buttonLike.addEventListener('click', () => {
        const svg = buttonLike.querySelector('.icon-fav');
        
        if (svg.classList.contains('liked')) {
          svg.classList.remove('liked');
          deleteFavorite(cat.id);
          loadFavorites();
        }else {
          svg.classList.add('liked');
          postFavorite(cat.id);
        }
      })
    })
  }
}

async function deleteFavorite(id) {
  const res = await fetch(`${URL_API_FAVORITES}/${id}`, {
    method: 'DELETE',
    headers: {
      'x-api-key': API_KEY
    }
  })
} 

async function uploadCat () {
  const form = document.getElementById('upload-form-cat');
  const formData = new FormData(form);
  const res = await fetch(URL_API_UPLOAD, {
    method: 'POST', 
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'x-api-key': API_KEY,
    },
    body: formData
  })
  const data = await res.json();
}
loadFavorites();
// getCatRandom();