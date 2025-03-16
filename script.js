let productList = [];

// Event listener to add product
document.getElementById('addProductButton').addEventListener('click', addProduct);

function addProduct() {
    const name = document.getElementById('productName').value.trim();
    const price = document.getElementById('productPrice').value.trim();
    const desc = document.getElementById('productDesc').value.trim();
    const image = document.getElementById('productImage').value.trim();

    if (!name || !price || !desc || !image) {
        alert('Please fill in all fields');
        return;
    }

    const newProduct = {
        id: Date.now(),
        name,
        price,
        desc,
        image
    };

    productList.push(newProduct);
    renderProducts();
    clearForm();
}

function renderProducts() {
    const productListContainer = document.getElementById('productList');
    productListContainer.innerHTML = '';

    productList.forEach(product => {
        const productItem = document.createElement('li');
        productItem.classList.add('product-item');
        productItem.dataset.id = product.id;

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const textContainer = document.createElement('div');
        textContainer.innerHTML = `
            <strong>${product.name}</strong><br>
            ${product.desc}<br>
            <span>Price: $${product.price}</span>
        `;

        const updateButton = document.createElement('button');
        updateButton.classList.add('update-button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', () => updateProduct(product.id));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteProduct(product.id));

        productItem.appendChild(img);
        productItem.appendChild(textContainer);
        productItem.appendChild(updateButton);
        productItem.appendChild(deleteButton);

        productListContainer.appendChild(productItem);
    });
}

function updateProduct(productId) {
    const product = productList.find(p => p.id === productId);
    
    const newName = prompt('Update Product Name', product.name);
    const newPrice = prompt('Update Product Price', product.price);
    const newDesc = prompt('Update Product Description', product.desc);
    const newImage = prompt('Update Product Image URL', product.image);

    if (newName && newPrice && newDesc && newImage) {
        product.name = newName;
        product.price = newPrice;
        product.desc = newDesc;
        product.image = newImage;
        renderProducts();
    }
}

function deleteProduct(productId) {
    productList = productList.filter(p => p.id !== productId);
    renderProducts();
}

function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDesc').value = '';
    document.getElementById('productImage').value = '';
}
