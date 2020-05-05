const links = document.querySelectorAll('a');
links.forEach(link => {
  link.addEventListener('click', handleClick);
});

function handleClick(event) {
  event.preventDefault();
  pageLoad(event.target.href);
  window.history.pushState(null, null, event.target.href);
}

async function pageLoad(url) {
  document.querySelector('.content').innerHTML = 'Carregando';
  const promisePage = await fetch(url);
  const responsePage = await promisePage.text();

  const newHtml = document.createElement('div');
  newHtml.innerHTML = responsePage;

  renderPage(newHtml);
}

function renderPage(html) {
  const newContent = html.querySelector('.content').innerHTML;
  document.title = html.querySelector('title').innerText;
  const oldContent = document.querySelector('.content');
  oldContent.innerHTML = newContent;
}

window.addEventListener('popstate', () => {
  pageLoad(window.location.href);
});