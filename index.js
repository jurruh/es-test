const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: process.env.HOST,
    auth: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    }
})

async function run() {
    await client.index({
        index: 'game-of-thrones',
        body: {
            character: 'Ned Stark',
            quote: 'Winter is coming.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        body: {
            character: 'Daenerys Targaryen',
            quote: 'I am the blood of the dragon.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        body: {
            character: 'Tyrion Lannister',
            quote: 'A mind needs books like a sword needs a whetstone.'
        }
    })

    await client.indices.refresh({ index: 'game-of-thrones' })

    const { body } = await client.search({
        index: 'game-of-thrones',
        body: {
            query: {
                match: { quote: 'winter' }
            }
        }
    })

    console.log(body.hits.hits)
}

setInterval(() => {
    run().catch(console.log)
}, 4000);