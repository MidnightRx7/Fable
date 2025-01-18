document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Listen for input in the search bar
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim().toLowerCase();

        // Call a function to fetch and display search results
        fetchSearchResults(query);
    });

    // Fetch and display search results
    async function fetchSearchResults(query) {
        try {
            // Simulate fetching results from the server (replace with your actual API call)
            const results = await simulateFetchResults(query);
            
            // Update the results dropdown
            updateResultsDropdown(results, query);
        } catch (error) {
            console.error('Error fetching or processing data:', error);
        }
    }

    async function simulateFetchResults(query) {
        try {
            const response = await fetch('products.json');
            const data = await response.json();

            // Filter the data based on the query
            const filteredResults = data.filter(result => result.title.toLowerCase().includes(query));
            // Return the filtered results
            
            return filteredResults;
        } catch (error) {
            console.error('Error fetching or processing data:', error);
            // Return an empty array or handle the error as appropriate for your application
            return [];
        }
    }

    async function fetchPageMatches(query){
        const data =[
            {title: "Home", keywords: "index, lobby, home"},
            {title: "Shop", keywords: "plants, plant, store, buy, equipment, pots, accessories"}, 
            {title: "Contact", keywords: "help, support, contact, support"},
            {title: "About us", keywords: "buddybox, bb, give, donate, support"}
        ]
        const filteredResults = data.filter(result => result.title.toLowerCase().includes(query) || result.keywords.toLowerCase().includes(query));
        return filteredResults;
    }

    // Update the results dropdown
    async function updateResultsDropdown(results, query) {
        const dropdown = document.getElementById('searchResults');
    
        // Clear previous results
        dropdown.innerHTML = '';
    
        // Display "Pages:" header only if there are page results
        const pageResults = await fetchPageMatches(query);
        if (pageResults.length > 0) {
            const pageElement = document.createElement('div');
            pageElement.className = 'result-title';
            pageElement.textContent = "Pages:";
            dropdown.appendChild(pageElement);
    
            // Display page results in the dropdown
            pageResults.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.textContent = result.title;
    
                // Add an event listener to navigate to the result's link when clicked
                resultItem.addEventListener('click', function () {
                    window.location.href = `/${result.title.replaceAll(' ', '_').toLowerCase()}/`;
                    console.log("oi");
                });
                dropdown.appendChild(resultItem);
            });
        }
    
        // Display "Products:" header and product results in the dropdown
        if(results.length>0){
            const productElement = document.createElement('div');
            productElement.className = 'result-title';
            productElement.textContent = "Products:";
            dropdown.appendChild(productElement);
        }
    
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.textContent = result.title;
    
            // Add an event listener to navigate to the result's link when clicked
            resultItem.addEventListener('click', function () {
                window.location.href = `/product/?id=${result.id}`;
            });
            dropdown.appendChild(resultItem);
        });
    
        // Show the dropdown
        dropdown.style.display = results.length > 0 || pageResults.length>0 ? 'block' : 'none';
    }

    // Close the dropdown when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.search-container')) {
            searchResults.style.display = 'none';
        }

    });
});
