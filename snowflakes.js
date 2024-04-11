let popups = []; // Store active popups
var spacingTop = 80;

var backgroundColor = "#051738"
var textColor = 'white'

function createPopup(message) {
    let popup = document.createElement('div');
    // Set the popup to use flex display
    popup.style.display = 'flex';
    popup.style.alignItems = 'center'; // Align items vertically in the center
    // Use innerHTML to include a Font Awesome icon and wrap message in a span
    popup.innerHTML = `<svg style="margin-right: 8px;" width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.182 11.072c0-.048 0-.096-.008-.144C22.014 5.424 17.558 1 12.094 1s-9.92 4.424-10.08 9.928c-.008.056-.008.104-.008.152a.536.536 0 0 0 0 .16c.024.464.232.904.624 1.272l7.352 6.12H8.726a.572.572 0 0 0-.568.576v2.912a.57.57 0 0 0 .568.568h6.464a.57.57 0 0 0 .568-.568v-2.912a.572.572 0 0 0-.568-.576h-1.224l7.616-6.152c.36-.336.576-.776.6-1.24.008-.024.008-.04.008-.064 0-.032 0-.064-.008-.104ZM12.094 3c3.168 0 5.912 1.856 7.24 4.56a4.006 4.006 0 0 0-1.168-.176c-.992 0-1.912.376-2.632 1.04a4.142 4.142 0 0 0-3.44-1.84c-1.432 0-2.704.744-3.456 1.864a3.737 3.737 0 0 0-2.624-1.064c-.4 0-.792.064-1.16.176C6.182 4.856 8.926 3 12.094 3Zm-8.08 8.064c.192-.968 1.024-1.68 2-1.68 1.36 0 1.904 1.408 2.04 1.84l1.68 4.6-5.72-4.76Zm7.976 5.096-2.032-5.552s-.008-.024-.016-.04c.112-1.112 1.032-1.984 2.152-1.984s1.984.824 2.136 1.896l-2.24 5.68Zm2.288-.344 1.896-4.824c.016-.056.048-.12.08-.2.232-.496.8-1.408 1.912-1.408.976 0 1.816.712 2 1.672l-5.888 4.76Z"></path></svg> <span>${message}</span>`;
    // Rest of the style setup remains the same
    popup.style.position = 'fixed';
    popup.style.top = `${spacingTop + 50 * popups.length}px`;
    popup.style.right = '25px';
    popup.style.backgroundColor = backgroundColor;
    popup.style.color = textColor;
    popup.style.padding = '10px';
    popup.style.boxShadow = '0px 0px 5px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = '1000';
    popup.style.marginBottom = "30px";
    popup.style.fontFamily = "Roboto";
    document.body.appendChild(popup);

    popups.push(popup);

    setTimeout(function () {
        popup.remove();
        popups = popups.filter(p => p !== popup);
        updatePopupPositions();
    }, 2000);
}


function updatePopupPositions() {
    popups.forEach((popup, index) => {
        popup.style.top = `${spacingTop + 50 * index}px`; // Update position
    });
}

function showPopups() {
    let timeout = Math.random() * (12000 - 1000);
    setTimeout(function () {

        createPopup(`${generateEthereumAddress()} just claimed ${getRandomNumber()} ETH!`);
        showPopups(); // Schedule the next popup
    }, timeout);
}

// Start the loop
showPopups();

function getRandomNumber() {
    let min = 0.1;
    let max = 1;
    let randomNumber = Math.random() * (max - min) + min;
    return Math.round(randomNumber * 100) / 100;
}

function generateSolanaAddress() {
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'; // Base58 characters
    let address = '';

    // Generate 44 characters for the address
    for (let i = 0; i < 44; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        address += chars[randomIndex];
    }

    // Return the formatted string (first 4 and last 4 characters for display)
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
}

function generateEthereumAddress() {
    let address = '0x';

    // Generate 40 hexadecimal characters
    for (let i = 0; i < 40; i++) {
        address += Math.floor(Math.random() * 16).toString(16);
    }

    // Return the formatted string (first 2 and last 2 characters)
    return `${address.substring(0, 4)}...${address.substring(address.length - 2)}`;
}
