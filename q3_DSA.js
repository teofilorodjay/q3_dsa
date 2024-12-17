// Sample data for sellers and products
const sellers = [
    { username: "seller1", password: "pass1" },
    { username: "seller2", password: "pass2" }
];

const categories = {
    Pasta: [
        { name: "Spaghetti", price: 30  },
        { name: "Carbonara", price: 35 },
        { name: "Lasagne", price: 350 }
    ],
    Desserts: [
        { name: "Ice Cream", price: 50 },
        { name: "Cake", price: 50 },
        { name: "Brownie", price: 35 }
    ],
    Drinks: [
        { name: "Soft drinks", price: 20},
        { name: "Water", price: 15 },
        { name: "Juice", price: 15 }
    ]
};

// Cart for customers
let cart = [];

// Function to authenticate sellers
function authenticate(username, password) {
    return sellers.some(seller => seller.username === username && seller.password === password);
}

// Function to add item to category
function addItemToCategory(category, name, price) {
    categories[category].push({ name, price });
}

// Function to remove item from category
function removeItemFromCategory(category, name) {
    categories[category] = categories[category].filter(item => item.name !== name);
}

// Function to print cart contents
function printCart() {
    if (cart.length === 0) {
        console.log("Cart is empty.");
        return;
    }
    let total = 0;
    cart.forEach(item => {
        console.log(`Item: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}, Total: ${item.price * item.quantity}`);
        total += item.price * item.quantity;
    });
    console.log(`Total Price: ${total}`);
}

// Function to sort cart items by name
function sortCart() {
    cart.sort((a, b) => a.name.localeCompare(b.name));
}

// Main program loop
function kiosk() {
    while (true) {
        const userType = prompt("Are you a SELLER or CUSTOMER?").toUpperCase();
        
        if (userType === "SELLER") {
            const username = prompt("Enter username:");
            const password = prompt("Enter password:");
            
            if (authenticate(username, password)) {
                while (true) {
                    const action = prompt("Choose: LOGOUT, ADD, REMOVE").toUpperCase();
                    
                    if (action === "LOGOUT") break;
                    
                    const category = prompt("Enter category (Pasta, Desserts, Drinks):");
                    
                    if (action === "ADD") {
                        const name = prompt("Enter item name:");
                        const price = parseFloat(prompt("Enter item price:"));
                        addItemToCategory(category, name, price);
                        const continueAdding = prompt("Continue adding items? (yes/no)").toLowerCase();
                        if (continueAdding !== "yes") continue;
                    } else if (action === "REMOVE") {
                        const name = prompt("Enter item name to remove:");
                        removeItemFromCategory(category, name);
                        const continueRemoving = prompt("Continue removing items? (yes/no)").toLowerCase();
                        if (continueRemoving !== "yes") continue;
                    }
                }
            } else {
                console.log("Authentication failed.");
            }
        } else if (userType === "CUSTOMER") {
            while (true) {
                const customerAction = prompt("Choose: ORDER, CART, CANCEL").toUpperCase();
                
                if (customerAction === "CANCEL") break;
                
                if (customerAction === "ORDER") {
                    const category = prompt("Choose category (Pasta, Desserts, Drinks):");
                    const itemName = prompt("Choose item:");
                    const quantity = parseInt(prompt("Enter quantity:"));
                    const item = categories[category].find(item => item.name === itemName);
                    
                    if (item) {
                        cart.push({ name: item.name, price: item.price, quantity });
                    } else {
                        console.log("Item not found.");
                    }
                } else if (customerAction === "CART") {
                    while (true) {
                        const cartAction = prompt("Choose: PRINT, ADD, REMOVE, CANCEL").toUpperCase();
                        
                        if (cartAction === "CANCEL") break;
                        
                        if (cartAction === "PRINT") {
                            printCart();
                        } else if (cartAction === "REMOVE") {
                            const itemName = prompt("Enter item name to remove:");
                            cart = cart.filter(item => item.name !== itemName);
                        }
                    }
                }
            }
        }
    }
}

// Start the kiosk program
kiosk();
