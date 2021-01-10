
let company = window.localStorage.getItem('company')
let title = window.localStorage.getItem('title')

document.querySelector("#companyname").innerHTML = company


axios.get(`/api/1.0/comments?company=${company}&title=${title}`)
    .then((response) => {
      console.log(response);
      comment_extract(response);
    });

axios.get(`/api/1.0/keywords?company=${company}&title=${title}`)

  .then(response => {
    console.log(response)
    keyword(response)
  })
  .catch((error) => {
    console.log(error)
  })


const add_comments = [];

function comment_extract(response) {

 

  if (response.data!='no') {

    for (let i = 0; i < response.data.length; i++) {
      const split_result = response.data[i].interview_experience.split('\n');
      if (split_result[0] == 'wrong' || split_result[0] == '詢問家庭狀況' || split_result[0] == '無') {
        continue;
      }
      if (split_result[0] && split_result[0].indexOf('第一次面試') < 0) {
        split_result[0] = '第一次面試 : ' + split_result[0];
      }
      if (split_result[1] == undefined || split_result[1] == '') {
        split_result[1] = '';
      }
      if (split_result[1] && split_result[1].indexOf('第二次面試') < 0) {
        split_result[1] = '第二次面試 : ' + split_result[1];
      }

      if (split_result[1]) {
        const check_content = split_result[1].split('第二次面試');

        if (check_content[1] && check_content[1].length < 2) {
          split_result[1] = '';
        }
      }
      $(' <div class="mySlides"><a class="id">ID:' + response.data[i].id + '</a><p class="date">評論日期：' + response.data[i].comment_date + '</p><p class="first-interview text-left">' + split_result[0] + '</p><p class="second-interview text-left">' + split_result[1] + '</p><p class="author">' + response.data[i].company + '<br>應徵職位：' + response.data[i].title + '</p></div>').appendTo($('div.slideshow-container'));
    }
    $(' <div class="mySlides"><p>謝謝收看</p></div>').appendTo($('div.slideshow-container'));
  } else {
    document.querySelector('.firstslide').innerHTML = '(ఠ్ఠ ˓̭ ఠ్ఠ)尚未有人提供相關情報'
  }

}

async function keyword(response) {

  for (let i = 0; i < 10; i++) {
    if (response.data[i] == undefined || response.data[i] == '' || response.data[i].length < 2) {
      continue;
    }


    let newKeyword = document.createElement("li");
    let newContent = document.createTextNode(response.data[i]);
    newKeyword.appendChild(newContent)
    newKeyword.setAttribute('class', 'list-inline-item keyword')
    let main = document.getElementById('list-inline')
    main.appendChild(newKeyword)


  }
}







var animateButton = function(e) {
  e.preventDefault;
  e.target.classList.remove('animate');
  e.target.classList.add('animate');
};

var animateButton = function(e) {
  e.preventDefault;
  e.target.classList.remove('animate');
  e.target.classList.add('animate');
};

const bubblyButtons = document.getElementsByClassName('bubbly-button');
for (let i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName('mySlides');

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slides[slideIndex - 1].style.display = 'block';
}
