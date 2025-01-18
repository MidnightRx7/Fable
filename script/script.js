document.addEventListener('DOMContentLoaded', function() {
    const listEl = document.querySelector('.middleproducts');
    const colors = ['#548F72']; // Define a color palette

    // Counter to limit the displayed products to 4
    let displayedCount = 0;

    fetch("/resources/products.json")
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            data.forEach((product, index) => {
                if (displayedCount < 4) { // Limit the number of products
                    const randomColorIndex = Math.floor(Math.random() * colors.length);
                    const bgColor = colors[randomColorIndex];

                    const productHTML = `
                        <div class="product" id="productDiv${index}" style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0; margin: 10px; border-radius: 8px; background-color: white; overflow: hidden;">
                            <img src="${product.image}" alt="${product.title}" style="width: 100%; aspect-ratio: 1/1; object-fit: cover; margin: 0;">
                            <div style="background-color: ${bgColor}; padding: 10px; width: 100%; box-sizing: border-box; margin-top: 10px;">
                                <h1 style="margin: 0; color: white;">${product.title}</h1>
                                <p style="margin: 10px 0 0; color: white;">${product.price}</p>
                            </div>
                        </div>`;
                    listEl.insertAdjacentHTML('beforeend', productHTML);

                    const productDiv = document.getElementById(`productDiv${index}`);
                    productDiv.addEventListener('click', function() {
                        window.location.href = `/product/?id=${encodeURIComponent(product.id)}`;
                    });

                    displayedCount++; // Increment the counter for displayed products
                }
            });
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
            listEl.innerHTML = '<p style="color: red;">Failed to load products. Please try again later.</p>';
        });
});