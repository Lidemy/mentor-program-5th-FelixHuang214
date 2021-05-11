const request = require('request')
const process = require('process')

const option = {
  url: 'https://lidemy-book-store.herokuapp.com/books',
  form: {

  }
}
const { argv } = process
const inpusWays = argv[2]

const ways = {
  list: {
    method: 'GET',
    queryString: '?_limit=20'
  },
  read: {
    method: 'GET',
    id: `${argv[3]}`
  },
  delete: {
    method: 'DELETE',
    id: `${argv[3]}`
  },
  create: {
    method: 'POST',
    form: {
      name: `${argv[3]}`
    }
  },
  update: {
    method: 'PATCH',
    id: `${argv[3]}`,
    name: `${argv[4]}`
  }
}

function list(option, ways) {
  option.method = ways.list.method
  option.url += ways.list.queryString
  request(option, (error, response, body) => {
    const newBody = JSON.parse(body)
    for (let i = 0; i < newBody.length; i++) {
      console.log(newBody[i].id, newBody[i].name)
    }
  })
}

function read(option, ways) {
  option.method = ways.read.method
  option.url += `/${ways.read.id}`
  request(option, (error, response, body) => {
    const newBody = JSON.parse(body)
    console.log(newBody.id, newBody.name)
  })
}

function del(option, ways) {
  option.method = ways.delete.method
  option.url += `/${ways.delete.id}`
  request(option)
}

function create(option, ways) {
  option.method = ways.create.method
  option.form.name = ways.create.form.name
  request(option)
}

function update(option, ways) {
  option.method = ways.update.method
  option.url += `/${ways.update.id}`
  option.form.name = ways.update.name
  request(option)
}

if (inpusWays === 'list') {
  list(option, ways)
}

if (inpusWays === 'read') {
  read(option, ways)
}

if (inpusWays === 'delete') {
  del(option, ways)
}

if (inpusWays === 'create') {
  create(option, ways)
}

if (inpusWays === 'update') {
  update(option, ways)
}
