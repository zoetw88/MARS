let company = window.localStorage.getItem('company')
let title = window.localStorage.getItem('title')
test(company, title)
async function test(company, title) {
  await axios.get(`/api/1.0/comments?company=${company}&title=${title}`)
    .then(res => {
      comment_extract(res)
    })
}

function comment_extract(response) {
  for (let i = 0; i < response.data.length; i++) {
    
    let split_result=response.data[i].interview_experience.split('\n')
    
    if(split_result[1]&&split_result[1].length>1){
    let check_content=split_result[1].split("第二次面試")
    if(check_content[1].length<3){
      split_result[1]=""
    }}
    else{
      split_result[1]=""
    }
    $(' <div class="mySlides"><p class="date">評論日期：'+response.data[i].comment_date+'</p><p class="first-interview text-left">'+split_result[0]+'</p><p class="second-interview text-left">' + split_result[1] + '</p><p class="author">'+response.data[i].company + '<br>應徵職位：' + response.data[i].title + '</p></div>').appendTo($('div.slideshow-container'));

  }

}


var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
   
  };
  
  var bubblyButtons = document.getElementsByClassName("bubbly-button");
  
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }



  var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
 
  if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
  slides[slideIndex-1].style.display = "block";
}