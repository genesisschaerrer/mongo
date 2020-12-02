//Once you type in mongo your terminal will be in a mongo shell
// typing db is refrencing the current database you are in 
//Going to write code in this js file, make sure there is no syntax errors and then paste it in mongo shell in commnad 


// creating a user for your database. not a part of the database, but the admin for it.
db.createUser({
    user: 'genesis',
    pwd: 'password',
    customData: {startDate: new Date()},
    roles: [
        {role: "clusterAdmin", db: "admin"},
        {role: "readAnyDatabase", db: "admin"},
        'readWrite'
    ]
})


//inserting one document
db.books.insert({
    'name': 'Mansfield Park',
    "publisedDate": new Date(),
    'authors': [
        {"name": "J Austen"},
        {"name": "someone else"},
    ]
})


//inserting many documents
db.movies.insertMany([
    {
        'name': 'a',
        'date':  '1988'
    },
    {
        'name': 'b',
        'date': '1900'
    },
    {
        'name': 'c',
        'date': '2230'
    }
])


//projections.  Prjections allow you to query a specific field. bringing back only what you want from a particular object.
//second argument lets your request a specific field by giving it a value of 1
db.books.find(
    {
        name: "Mansfield Park"
    },
    {
    authors: 1
    }
).pretty()

//Regular expressions will look for a pattern and will bring back everything that matches that pattern. the i makes it case insensative.
db.books.findOne({name: /.*Man.*/i})

//removes all objects that match the criteria 
db.books.remove({name: "Mansfield Park"})

//pass in a second argument to removes a specific one
db.books.remove({name: "Mansfield Park"}, 1)


//Including nested field in queries.
//you create a projection and then do dot syntax to go into the nested field.
db.books.find(
    {
    name: "Jane Eyre"
    },
    {
    name: 1,
    publisedDate: 1,
    "authors.name":1
    }
).pretty()
//Another way to do it, when you know the value
db.books.find({"authors.name": "C Bronte"}).pretty()

