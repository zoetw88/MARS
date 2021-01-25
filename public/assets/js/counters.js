company = window.localStorage.getItem('company');
document.querySelector('#companyname').innerHTML = company;

axios.get(`/api/1.0/counts?company=${company}`)
  .then((response) => {
    counters(response);
  });


function counters(response) {
  document.getElementById('users').textContent = response.data[0]
  document.getElementById('reviews').innerHTML = response.data[1]
  document.getElementById('jobs').innerHTML = response.data[2]
  document.getElementById('search').innerHTML = response.data[3]
}