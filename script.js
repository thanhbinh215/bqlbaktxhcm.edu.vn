document.addEventListener('DOMContentLoaded', () => {
    let navbar = document.querySelector('.navbar');
    let searchForm = document.querySelector('.search-form');
    let cartItem = document.querySelector('.cart-items-container');
    let myOrderContainer = document.querySelector('.my-order-container');
    const applyFilterButton = document.getElementById('apply-filter');
    const priceFilter = document.getElementById('price-filter');
    const flavorFilter = document.getElementById('flavor-filter');
    const menuItems = document.querySelectorAll('.menu .box');
    const searchBtn = document.querySelector('#search-btn');
    const cartBtn = document.querySelector('#cart-btn');
    const wishlistBtn = document.querySelector('#wishlist-btn');
    let wishlistContainer = document.querySelector('.wishlist-container');

    
    applyFilterButton.addEventListener('click', filterItems);

    searchBtn.onclick = () => {
        if (!searchForm.classList.contains('active')) {
            searchForm.classList.add('active');
            navbar.classList.remove('active');
            cartItem.classList.remove('active');
            wishlistContainer.classList.remove('active');
        } else {
            searchForm.classList.remove('active');
        }
    };
    wishlistBtn.onclick = () => {
        if (!wishlistContainer.classList.contains('active')) {
            wishlistContainer.classList.add('active');
            navbar.classList.remove('active');
            cartItem.classList.remove('active');
            searchForm.classList.remove('active');
        } else {
            wishlistContainer.classList.remove('active');
        }
    };
    
    // Toggle the cart item container when clicking the cart button
    cartBtn.onclick = () => {
        if (!cartItem.classList.contains('active')) {
            cartItem.classList.add('active');
            navbar.classList.remove('active');
            searchForm.classList.remove('active');
            wishlistContainer.classList.remove('active');
        } else {
            cartItem.classList.remove('active');
        }
    };
    
    // Close the search form or cart item container when clicking outside of them
    window.onclick = (event) => {
        if (!searchForm.contains(event.target) && event.target !== searchBtn) {
            searchForm.classList.remove('active');
        }
    
        if (!cartItem.contains(event.target) && event.target !== cartBtn) {
            cartItem.classList.remove('active');
        }
        if (!wishlistContainer.contains(event.target) && event.target !== wishlistBtn) {
            wishlistContainer.classList.remove('active');
        }
    };

    document.querySelector('#my-order-btn').onclick = () => {
        myOrderContainer.classList.toggle('active');//Order container shown
        cartItem.classList.remove('active');
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
    };


    window.onscroll = () => {
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
        cartItem.classList.remove('active');
        wishlistContainer.classList.remove('active');

    };
    function filterItems() {
        const selectedPrice = priceFilter.value;
        const searchFlavor = flavorFilter.value.toLowerCase();

        menuItems.forEach(item => {
            const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
            const flavor = item.querySelector('h3').textContent.toLowerCase();
            let showItem = true;

            // Price filter
            if (selectedPrice !== 'all') {
                if (selectedPrice === 'under-15' && price >= 15) showItem = false;
                if (selectedPrice === '15-20' && (price < 15 || price > 20)) showItem = false;
                if (selectedPrice === 'over-20' && price <= 20) showItem = false;
            }

            // Flavor filter
            if (searchFlavor && !flavor.includes(searchFlavor)) showItem = false;

            item.style.display = showItem ? 'block' : 'none';
        });
    }
});

let wishlist = [];


document.addEventListener('DOMContentLoaded', () => {
    // ... existing event listeners ...

    // Filter functionality
    const applyFilterButton = document.getElementById('apply-filter');
    const priceFilter = document.getElementById('price-filter');
    const flavorFilter = document.getElementById('flavor-filter');
    const menuItems = document.querySelectorAll('.menu .box');

    applyFilterButton.addEventListener('click', filterItems);

    function filterItems() {
        const selectedPrice = priceFilter.value;
        const searchFlavor = flavorFilter.value.toLowerCase();

        menuItems.forEach(item => {
            const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
            const flavor = item.querySelector('h3').textContent.toLowerCase();
            let showItem = true;

            // Price filter
            if (selectedPrice !== 'all') {
                if (selectedPrice === 'under-15' && price >= 15) showItem = false;
                if (selectedPrice === '15-20' && (price < 15 || price > 20)) showItem = false;
                if (selectedPrice === 'over-20' && price <= 20) showItem = false;
            }

            // Flavor filter
            if (searchFlavor && !flavor.includes(searchFlavor)) showItem = false;

            item.style.display = showItem ? 'block' : 'none';
        });
    }
});
// Remove filter funtion 
document.getElementById('remove-filter').addEventListener('click', function() {
    // Reset filters
    document.getElementById('price-filter').value = 'all';
    document.getElementById('flavor-filter').value = '';

    // Show all boxes
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.style.display = 'block';
    });
});
// Function to add items to cart



function addToWishlist(productName, price) {
    const existingItem = wishlist.find(item => item.name === productName);
    if (!existingItem) {
        wishlist.push({ name: productName, price: price });
        displayWishlist();
    } else {
        alert(`${productName} is already in your wishlist!`);
    }
}

function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    displayWishlist();
}

function displayWishlist() {
    const wishlistItemsElement = document.getElementById('wishlistItems');
    const wishlistPageElement = document.getElementById('wishlist-items');
    let wishlistItemsHTML = '';

    wishlist.forEach((item, index) => {
        wishlistItemsHTML += `
            <li>
                ${item.name} - $${item.price.toFixed(2)}
                <button class="add-to-cart-btn" onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
                <button class="remove-from-wishlist-btn" onclick="removeFromWishlist(${index})">Remove</button>
            </li>`;
    });

    wishlistItemsElement.innerHTML = wishlistItemsHTML;
}

function clearWishlist() {
    wishlist = [];
    displayWishlist();
}

let quantities = {
    'Nutty Butterscotch': 1,
    'Berry Pops': 1,
    'Cherry Sherbet Pops': 1,
    'Dripping Vannila': 1,
    'Very Berry Strawberry': 1,
    'Rainbow Classic Cone': 1,
    'Orange Pops': 1,
    'Choco Hazel Pops': 1,
    'Very Very Peachy': 1
  };
  
  // Increase quantity
  function increaseQuantity(itemId) {
    quantities[itemId]++;
    document.getElementById(`itemQuantity-${itemId}`).innerText = quantities[itemId];
  }
  
  // Decrease quantity
  function decreaseQuantity(itemId) {
    if (quantities[itemId] > 1) {
      quantities[itemId]--;
      document.getElementById(`itemQuantity-${itemId}`).innerText = quantities[itemId];
    }
  }


  function getCart() {
    const cartString = localStorage.getItem('cart');
    return cartString ? JSON.parse(cartString) : []; // Parse the JSON string or return an empty array
}

// Function to save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart)); // Convert cart to JSON string and save
}

// Initialize cart from localStorage
let cart = getCart();



// Function to add items to the cart
function addToCart(productName, price,imageUrl) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        // Add the product to the cart
        cart.push({ name: productName, price: price,image: imageUrl });
         // Notify the user
        displayCart(); // Update the cart display
        
        saveCart(cart); 

        // Show notification tooltip
        const notification = document.getElementById('notification-tooltip');
        notification.classList.add('show');

        // Hide notification after 2 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
        
        // Optionally remove item from wishlist if necessary
        const wishlistIndex = wishlist.findIndex(item => item.name === productName);
        if (wishlistIndex !== -1) {
            removeFromWishlist(wishlistIndex);
        }
    } else {
        cart.push({ name: productName, price: price,image:imageUrl });
        // Notify the user
        saveCart(cart); 
       displayCart(); 
      
    }
    console.log(cart);
}
// Function to remove items from the cart
function removeFromCart(index) {
    
    cart.splice(index, 1);
    saveCart(cart);  // Remove item from cart array
    displayCart(); // Update the cart display
    
}

// Function to display cart items and calculate total
// Function to display cart items and calculate total
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from localStorage

    // Calculate the total number of items in the cart
    const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

    // Update the cart count element
    const cartCountElement = document.getElementById('cart-count'); // Element to show item count
    cartCountElement.textContent = `(${itemCount})`;

    console.log('Cart:', cart); // For debugging purposes
}
    
    window.onload = displayCart;

function showSection(section) {
    // Hide all sections
    document.querySelector('.home').style.display = 'none';
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.blogs').style.display = 'none';
    document.querySelector('.cart-items-container').style.display = 'none'; 
    document.getElementById('payment-section').style.display = 'none'; 

    // Show the selected section
    document.querySelector(`.${section}`).style.display = 'block';
}

// Example event listeners for navigation links
// document.getElementById('home-link').addEventListener('click', () => showSection('home'));
// document.getElementById('about-link').addEventListener('click', () => showSection('about'));
// document.getElementById('menu-link').addEventListener('click', () => showSection('menu'));
// document.getElementById('blogs-link').addEventListener('click', () => showSection('blogs'));



function checkout() {

    
    // Hide other sections
    document.querySelector('.home').style.display = 'none';
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.blogs').style.display = 'none';

    // Hide the cart section
    document.querySelector('.cart-items-container').style.display = 'none';
    
     // Display the payment section
     const paymentSection = document.getElementById('payment-section');
     paymentSection.style.display = 'block';
    
    // Update order summary dynamically 
    updateOrderSummary();
}

document.getElementById('checkout-button').addEventListener('click', checkout);

function updateOrderSummary() {
    // Fetch order items and total from cart 
    const totalItems = 3; 
    const totalPrice = 45.99; 

    document.getElementById('order-items').textContent = `Total Items: ${totalItems}`;
    document.getElementById('order-total').textContent = `Total Price: $${totalPrice}`;
}

// Payment method selection logic
document.querySelectorAll('input[name="payment-method"]').forEach((input) => {
    input.addEventListener('change', function() {
        if (this.value === 'credit-card') {
            document.getElementById('card-details').style.display = 'block';
        } else {
            document.getElementById('card-details').style.display = 'none';
        }
    });
});

function togglePaymentDetails() {
    const cardDetails = document.getElementById('card-details');
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    if (paymentMethod === 'credit-card') {
        cardDetails.style.display = 'block';
    } else {
        cardDetails.style.display = 'none';
    }
}

function showPaymentDetails() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const cardDetails = document.getElementById('card-details');
    const paypalDetails = document.getElementById('paypal-details');
    const codMessage = document.getElementById('cod-message'); 

    // Show/hide payment details based on selected payment method
    if (paymentMethod === 'credit-card') {
        cardDetails.style.display = 'block'; 
        paypalDetails.style.display = 'none'; 
        codMessage.style.display = 'none'; 
    } else if (paymentMethod === 'paypal') {
        cardDetails.style.display = 'none'; 
        paypalDetails.style.display = 'block'; 
        codMessage.style.display = 'none'; 
    } else if (paymentMethod === 'cod') {
        cardDetails.style.display = 'none'; 
        paypalDetails.style.display = 'none';
        codMessage.style.display = 'block'; 
    }
}
// review part contributed



function confirmPayment() {
    alert("Payment confirmed! Your order is being processed.");
}



function displayOrder() {
    const orderDetailsElement = document.getElementById('order-details');
    if (cart.length === 0) {
        orderDetailsElement.innerHTML = '<p>No active order.</p>';
        return;
    }

    let orderHTML = '<h3>Current Order:</h3><ul>';
    cart.forEach((item, index) => {
        orderHTML += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
    });
    orderHTML += '</ul>';

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    orderHTML += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;

    orderDetailsElement.innerHTML = orderHTML;
}

function trackOrder() {
    if (cart.length === 0) {
        alert('No active order to track.');
        return;
    }
    // Simulating order tracking
    alert('Your order is being prepared and will be delivered soon!');
}

function editOrder() {
    if (cart.length === 0) {
        alert('No active order to edit.');
        return;
    }
    // For simplicity, we'll just clear the cart and allow the user to add items again
    if (confirm('Do you want to clear your current order and start over?')) {
        cart = [];
        displayCart();
        displayOrder();
        alert('Your order has been cleared. You can now add new items.');
    }
}
displayOrder();


//function for annimation on about us
document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.querySelector('.about');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight / 5 * 4;
        const aboutTop = aboutSection.getBoundingClientRect().top;

        if (aboutTop < triggerBottom) {
            aboutSection.classList.add('animate');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); 
});


window.onscroll = function () {
    const button = document.getElementById('backToTop');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        button.style.display = "block";
    } else {
        button.style.display = "none"; 
    }
};

window.addEventListener('resize', () => {
    const container = document.querySelector('.product-container');
    container.style.height = 'auto'; // Reset chiều cao
});

document.getElementById('backToTop').onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

document.getElementById("flavor-filterr").addEventListener("input", function () {
    let filter = this.value.toLowerCase(); // Lấy giá trị nhập vào, chuyển thành chữ thường
    let blogs = document.querySelectorAll(".blog"); // Lấy danh sách tất cả các bài viết

    blogs.forEach(blog => {
        let title = blog.querySelector("h3").textContent.toLowerCase();
        let desc = blog.querySelector("p").textContent.toLowerCase();

        if (title.includes(filter) || desc.includes(filter)) {
            blog.classList.remove("hidden"); // Hiển thị nếu tìm thấy
        } else {
            blog.classList.add("hidden"); // Ẩn nếu không khớp
        }
    });
    
});
