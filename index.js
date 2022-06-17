const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = 5000

app.use(express.json())
app.use(cors())
// zillur-rahman
// ZvOjeYf7TrD96fgt

app.get('/', (req, res) => {
    res.send('Hello World!')
})


const uri = "mongodb+srv://zillur-rahman:ZvOjeYf7TrD96fgt@cluster0.jlsdq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async () => {
    try {
        await client.connect()

        const MyProjectsCollection = client.db("zillur-rahman").collection("MyProjects")

        app.get('/myprojects', async (req, res) => {
            const query = {}
            const projects = MyProjectsCollection.find(query)
            const result = await projects.toArray()
            res.send(result)
        })

        app.get('/project/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const project = await MyProjectsCollection.findOne(query)
            res.send(project)
        })
    }
    finally {

    }
}

run().catch(console.dir)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})