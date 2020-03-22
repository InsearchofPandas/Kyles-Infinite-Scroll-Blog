const postsContainer = document.getElementById('post-container');

const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');


let limit = 5;
let page = 1;

// Fetch posts from API

async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/?_limit=${limit}&_page=${page}`)

    const data = await res.json()
    
    return data
}


// Show posts in DOM 
async function showPosts() {
     const posts = await getPosts()
     
     posts.forEach(post => {
         const postEl = document.createElement('div');
         postEl.classList.add('post');
         postEl.innerHTML = `
         <div class="number">${post.id}</div>
         <div class="post-info">
           <h2 class="post-title">${post.title.charAt(0).toUpperCase() + post.title.slice(1)}</h2>
           <small class="post-date">${randomDate()}</small>
           <p class="post-body">${post.body.charAt(0).toUpperCase() + post.body.slice(1)}.</p>
         </div>
       `;
         postsContainer.appendChild(postEl);

     })
}

// Show loader and fetch more post 

function showLoading() {
    loading.classList.add('show');
  
    setTimeout(() => {
      loading.classList.remove('show');
  
      setTimeout(() => {
        page++;
        showPosts();
      }, 300);
    }, 1000);
  }
  

// Filter post by input

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

function randomDate() {
	const day = Math.floor(Math.random() * 27) + 1;
	const month = Math.floor(Math.random() * 11) + 1;
	return `${month}/${day}/2019`;
}


// Show intial posts
showPosts();


// Event Listener 

window.addEventListener('scroll', ()=> {
    const {scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight -5 ) {
        showLoading()
    }

})

// Filter Lisner

filter.addEventListener('input', filterPosts)
