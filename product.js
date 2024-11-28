document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    fetch('./products.json')
        .then(res => res.json())
        .then(data => {
            const product = data.find(item => item.id == productId);

            if (product) {
                document.getElementById('productImage').src = product.image;
                document.getElementById('productTitle').textContent = product.title;
                // document.getElementById('productDescription').textContent = product.description;
                document.getElementById('productPrice').textContent = product.price;
                document.getElementById('productButton').href = product.button;
            } else {
                console.error('Product not found');
            }
        })
    .catch(error => console.error('Error fetching product data:', error));
});