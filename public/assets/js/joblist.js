company = window.localStorage.getItem('company');
title = window.localStorage.getItem('title');


axios.get(`/api/1.0/job104list?company=${company}&title=${title}`)
    .then((response) => {
      console.log(response);
      getJoblist(response);
    });


function getJoblist(response) {
  if (response.data != 'no') {
    for (let i = 0; i < response.data.length; i++) {
      j = (i % 5) + 1;
      $(' <div class="col-lg-4 col-sm-6"><div class="single_category category_color_' + j + ' text-center mt-30 job-container">\
    <div class="category_content"> <h4 class="category_title">' + response.data[i].title + '</h4> <p class="text">' + response.data[i].company + '</p><br>\
    <p id="edu"><i class="fa fa-graduation-cap" aria-hidden="true"></i> ' + response.data[i].edu + '</p><p id="exp"><i class="fa fa-id-badge" aria-hidden="true">\
    </i> ' + response.data[i].exp + '</p> </div><a class="category_link" href="' + response.data[i].link + '"></a></div></div>').appendTo($('div #job-list'));
    }
  } else {
    $('<div class="col-lg-12 col-md-12 col-sm-12 gray-bg  "> <div class="mb-3 card ">\
    <div class="joblist card-header-tab card-header-tab-animation card-header d-flex align-items-center">\
    <div class="card-body jb"><p id="job-list-message">(ఠ్ఠ ˓̭ ఠ్ఠ)尚未有人提供相關情報</p></div></div></div></div>').appendTo($('div .job-list-message'));
  }
}
