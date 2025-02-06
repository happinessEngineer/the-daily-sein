// NEEDS FIXING

async function fetchProducts() {
    try {
        const response = await fetch(`./src/products-of-the-day.json`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        return [];
    }
}

function App() {
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        try {
            const loadProducts = async () => {
                const products = await fetchProducts();
                setProducts(products);
            };
            loadProducts();
        } catch (error) {
            reportError(error);
        }
    }, []);    
    

    return (
        <div>
            {Object.entries(products).map(([key, product]) => (
                <div key={key} className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">{key}</h3>
                    <a 
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img 
                            src={`../product-images/${product.image}`}
                            alt={key}
                            className="product-image mx-auto mb-4 rounded-lg shadow-lg"
                        />
                    </a>
                    <a 
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        {product.url}
                    </a>
                </div>
            ))}
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));