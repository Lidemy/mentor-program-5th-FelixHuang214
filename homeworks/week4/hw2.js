const request = require('request')
const process = require('process')

const data = {
  url: 'https://lidemy-book-store.herokuapp.com/books',
  form: {

  }
}
const [...argv] = process.argv

const inpusWays = argv[2]

const ways = {
  list: {
    method: 'GET',
    str: '?_limit=20'
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

function list(data, ways) {
  const temp = { ...data }
  temp.method = ways.list.method
  temp.url += ways.list.str
  request(temp, (error, response, body) => {
    const newBody = JSON.parse(body)
    for (let i = 0; i < newBody.length; i++) {
      console.log(newBody[i].id, newBody[i].name)
    }
  })
}

function read(data, ways) {
  const temp = { ...data }
  temp.method = ways.read.method
  temp.url += `/${ways.read.id}`
  request(temp, (error, response, body) => {
    const newBody = JSON.parse(body)
    console.log(newBody.id, newBody.name)
  })
}

function del(data, ways) {
  const temp = { ...data }
  temp.method = ways.delete.method
  temp.url += `/${ways.delete.id}`
  request(temp)
}

function create(data, ways) {
  const temp = { ...data }
  temp.method = ways.create.method
  temp.form.name = ways.create.form.name
  request(temp)
}

function update(data, ways) {
  const temp = { ...data }
  temp.method = ways.update.method
  temp.url += `/${ways.update.id}`
  temp.form.name = ways.update.name
  request(temp)
}

if (inpusWays === 'list') {
  list(data, ways)
}

if (inpusWays === 'read') {
  read(data, ways)
}

if (inpusWays === 'delete') {
  del(data, ways)
}

if (inpusWays === 'create') {
  create(data, ways)
}

if (inpusWays === 'update') {
  update(data, ways)
}
