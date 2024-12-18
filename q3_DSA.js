// User authentication and product management for a kiosk ordering system
// user data for authentication
const user = [
    { username: 'seller', password: 'pass123' }
];

//products categorized by type
const products = {
    Pasta: [
        { name: 'Spaghetti', price: 25 },
        { name: 'Carbonara', price: 30 },
        { name: 'Lasagna', price: 100 }
    ],
    Desserts: [
        { name: 'Cheesecake', price: 55 },
        { name: 'Brownie', price: 45 },
        { name: 'Ice Cream', price: 30 }
    ],
    Drinks: [
        { name: 'Soda', price: 18 },
        { name: 'Juice', price: 15 },
        { name: 'Water', price: 10 }
    ]
};

// Cart for customers to store their selected items
let cart = [];

// Function to authenticate seller
function authenticateSeller() {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");
    
    // Check if the entered username and password match any user
    return user.some(user => user.username === username && user.password === password);
}

// Function to add an item to the cart
function addToCart(category) {
    // Check if the category exists
    if (products[category]) {
        const itemName = prompt(`Choose an item from ${category}: ${products[category].map(item => item.name).join(', ')}`);
        const quantityInput = prompt("Enter quantity:");

        // Validate that the user didn't cancel the prompt
        if (quantityInput !== null) {
            const quantity = parseInt(quantityInput);

            // Validate quantity input
            if (!isNaN(quantity) && quantity > 0) {
                // Find the selected item in the products
                const selectedItem = products[category].find(item => item.name === itemName);
                if (selectedItem) {
                    // Check if the item is already in the cart
                    const existingItem = cart.find(item => item.name === selectedItem.name);
                    if (existingItem) {
                        // Update quantity if item exists in the cart
                        existingItem.quantity += quantity;
                    } else {
                        // Add new item to the cart
                        cart.push({ name: selectedItem.name, price: selectedItem.price, quantity });
                    }
                    alert(`${quantity} ${selectedItem.name}(s) added to cart.`);
                } else {
                    alert("Item not found!"); // Item not found in the selected category
                }
            } else {
                alert("Please enter a valid quantity."); // Invalid quantity input
            }
        }
    } else {
        alert("Invalid category!"); // Invalid category input
    }
}

// Function to remove an item from a specific product category
function removeItem(category) {
    if (products[category]) {
        const name = prompt("Enter item name to remove:");
        // Filter out the item with the specified name from the category
        products[category] = products[category].filter(item => item.name !== name);
        alert(`${name} has been removed from ${category}.`);
    } else {
        alert("Invalid category!");
    }
}

// Function to print the contents of the cart
function printCart() {
    console.log("Your Cart:");
    let total = 0; // Initialize total price
    if (cart.length === 0) {
        console.log("Your cart is empty."); // Notify if the cart is empty
    } else {
        // Loop through cart items and display their details
        cart.forEach(item => {
            console.log(`${item.name} - Price: ${item.price} - Quantity: ${item.quantity}`);
            total += item.price * item.quantity; // Calculate total price
        });
        console.log(`Total Price: ${total}`); // Display total price
    }
}

// Function to checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }
    printCart();
    alert("Thank you for your purchase!");
    cart = []; // Clear the cart after checkout
}

// Function to sort cart items by name (simple bubble sort)
function sortCart() {
    for (let i = 0; i < cart.length - 1; i++) {
        for (let j = 0; j < cart.length - i - 1; j++) {
            if (cart[j].name > cart[j + 1].name) {
                // Swap items if they are in the wrong order
                [cart[j], cart[j + 1]] = [cart[j + 1], cart[j]];
            }
        }
    }
}

// Main program loop
function main() {
    while (true) {
        const userType = prompt("Are you a SELLER or CUSTOMER?").toUpperCase();
        
        // Seller actions
        if (userType === 'SELLER') {
            if (authenticateSeller()) {
                while (true) {
                    const action = prompt("Choose: LOGOUT, ADD, REMOVE, PRINT").toUpperCase();

                    // Log out if requested
                    if (action === 'LOGOUT') break;

                    const category = prompt("Which CATEGORY? (Pasta, Desserts, Drinks)").trim();

                    // Perform actions based on user input
                    if (action === 'ADD') {
                        addToCart(category); // Call the updated add function
                    } else if (action === 'REMOVE') {
                        removeItem(category); // Remove item from category
                    } else if (action === 'PRINT') {
                        printCart(); // Print cart contents
                    } else {
                        alert("Invalid action! Please choose again.");
                    }
                }
            } else {
                alert("Authentication failed!"); // Notify on authentication failure
            }
        } 
        // Customer actions
        else if (userType === 'CUSTOMER') {
            while (true) {
                const action = prompt("Choose: VIEW PRODUCTS, ADD TO CART, VIEW CART, CHECKOUT, LOGOUT").toUpperCase();

                // Log out if requested
                if (action === 'LOGOUT') break;

                if (action === 'VIEW PRODUCTS') {
                    console.log("Available Products:");
                    for (const category in products) {
                        console.log(`${category}: ${products[category].map(item => item.name).join(', ')}`);
                    }
                } else if (action === 'ADD TO CART') {
                    const category = prompt("Which CATEGORY? (Pasta, Desserts, Drinks)").trim();
                    addToCart(category); // Call the add to cart function
                } else if (action === 'VIEW CART') {
                    printCart(); // Print cart contents
                } else if (action === 'CHECKOUT') {
                    checkout(); // Proceed to checkout
                } else {
                    alert("Invalid action! Please choose again.");
                }
            }
        }
    }
}

// Start the program
main();