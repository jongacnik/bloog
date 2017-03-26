var path = require('path')
var choo = require('choo')
var html = require('choo/html')
var read = require('read-directory')
var nmd = require('nano-markdown')

var app = choo()
app.use(store)
app.route('/', layout(archiveView))
app.route('/:page', layout(archiveView))
app.route('/p/:id', layout(singleView))
app.mount('body')

function store (state, emitter) {
  state.title = 'Bloog ✨'
  state.posts = read.sync(path.join(__dirname, 'posts'))
  state.ids = Object.keys(state.posts).sort().reverse()
  state.perPage = 5
  state.pages = Math.ceil(state.ids.length / state.perPage)
}

function layout (view) {
  return function (state, emit) {
    return html`
      <body>
        <h1>${state.title}</h1>
        ${view(state, emit)}
      </body>
    `
  }
}

function archiveView (state, emit) {
  var posts = paginate(state.ids, state.params.page, state.perPage)
  return html`
    <div>
      ${posts.map(function (id) {
        return postEl(id, state.posts[id], true)
      })}
      ${prevNextEl(state)}
    </div>
  `
}

function singleView (state, emit) {
  var id = state.params.id
  return postEl(id, state.posts[id])
}

function paginate (posts, page, perPage) {
  page = Number(page) || 1
  return posts.slice(perPage * (page - 1), page * perPage)
}

function postEl (id, content, permalink) {
  var article = html`<article></article>`
  article.innerHTML = nmd(content)
  if (permalink) {
    article.appendChild(html`<p>${linkEl('/p/' + id, '🔗')}</p>`)
  }
  return article
}

function prevNextEl (state) {
  var page = Number(state.params.page) || 1
  var hasNext = page - 1
  var hasPrev = page + 1 <= state.pages
  return html`
    <nav>
      ${hasNext ? linkEl(page - 1 === 1 ? '/' : '/' + (page - 1), 'Next') : ''}
      ${hasPrev ? linkEl('/' + (page + 1), 'Previous') : ''}
    </nav>
  `
}

function linkEl (url, text) {
  return html`<a href="${url}">${text}</a>`
}
