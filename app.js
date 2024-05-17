const express = require('express');
const path = require('path');
const app = express();

const { products } = require('./data');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    console.log('Sending home page');
    res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/omni-food', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '/index.html'));
});

app.get('/abc', (req, res) => {
    res.json([{ name: 'bilal' }, { name: 'he' }]);
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:productID', (req, res) => {
    const { productID } = req.params
    const singleProduct = products.find((product => product.id == productID))
    if (!singleProduct) {
        res.status(404).send("Product not found")
    }
    return res.json(singleProduct);
});


app.get('/api/v1/query', (req, res) => {
    let sortedProduct = [...products]

    let {search, limit} = req.query

    if(search) {
        sortedProduct = sortedProduct.filter((product) => {
            return product.name.startsWith(search)
        })
    }

    if(limit) {
        sortedProduct = sortedProduct.slice(0, Number(limit))
    }

    res.status(200).send(sortedProduct)
})

// Catch-all route for handling 404 errors
app.get('*', (req, res) => {
    res.status(404).send('Resource not found');
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000....');
});
