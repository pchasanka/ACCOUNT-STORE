
// DOM Elements
const loader = document.getElementById('loader');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Hide Loader when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }
    });
}

// Function to create product card HTML
function createProductCard(account) {
    // Generate badges HTML only if badges exist and is an array
    const badgesHtml = Array.isArray(account.badges) ? account.badges.map(badge => `
        <span class="bg-black/80 text-gold text-xs font-bold px-2 py-1 rounded border border-gold/30">${badge}</span>
    `).join('') : '';

    // Generate Rank HTML if rank exists
    const rankHtml = account.rank ? `
        <span class="text-xs text-gray-400 font-rajdhani border border-gray-700 px-2 rounded-full">${account.rank}</span>
    ` : '';

    // Generate Evo Gun HTML if evogun exists
    const evoHtml = account.evogun ? `
        <span class="text-xs text-orange font-rajdhani border border-orange/30 px-2 rounded-full">Evo Guns: ${account.evogun}</span>
    ` : '';

    return `
        <div class="glass-card rounded-xl overflow-hidden group">
            <a href="product.html?id=${account.id}" class="block">
                <div class="relative h-48 overflow-hidden">
                    <img src="${account.image}" alt="${account.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute top-2 right-2 flex gap-1">
                        ${badgesHtml}
                    </div>
                    <div class="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black to-transparent">
                        <div class="flex items-center gap-2 text-xs text-white">
                            <i class="fa-solid fa-fire text-orange"></i> Lvl ${account.level} &bull; <i class="fa-solid fa-thumbs-up text-blue-400"></i> ${account.likes}
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-orbitron font-bold text-white text-lg mb-1 truncate group-hover:text-gold transition-colors">${account.title}</h3>
                    <div class="flex items-center gap-2 mb-3 flex-wrap">
                        ${rankHtml}
                        ${evoHtml}
                    </div>
                    <p class="text-gray-400 text-sm font-rajdhani line-clamp-2 mb-4 h-10">${account.description}</p>
                     <!-- Price and Button Section -->
                    <div class="flex items-center justify-between mt-auto">
                        <span class="text-xl font-bold text-gold font-orbitron">${account.price}</span>
                        <span class="bg-white/10 hover:bg-gold hover:text-black text-white px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 pointer-events-none">
                            VIEW <i class="fa-solid fa-arrow-right"></i>
                        </span>
                    </div>
                </div>
            </a>
        </div>
    `;
}

// Render Products
function renderProducts() {
    // Featured Products (Home Page)
    const featuredContainer = document.getElementById('featured-products');
    if (featuredContainer && window.accountsData) {
        // Show first 3 accounts as featured
        const featuredAccounts = window.accountsData.slice(0, 3);
        featuredContainer.innerHTML = featuredAccounts.map(account => createProductCard(account)).join('');
    }

    // Shop Grid (Shop Page)
    const shopContainer = document.getElementById('shop-grid');
    if (shopContainer && window.accountsData) {
        shopContainer.innerHTML = window.accountsData.map(account => createProductCard(account)).join('');

        // Update count
        const countElement = document.getElementById('products-count');
        if (countElement) {
            countElement.innerText = `Showing all ${window.accountsData.length} accounts`;
        }
    }
}

// Initialize Render
renderProducts();

// Search Functionality (Simple client-side search)
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const shopContainer = document.getElementById('shop-grid');

        if (shopContainer && window.accountsData) {
            const filteredAccounts = window.accountsData.filter(account =>
                account.title.toLowerCase().includes(searchTerm) ||
                account.description.toLowerCase().includes(searchTerm) ||
                account.rank.toLowerCase().includes(searchTerm)
            );

            if (filteredAccounts.length > 0) {
                shopContainer.innerHTML = filteredAccounts.map(account => createProductCard(account)).join('');
            } else {
                shopContainer.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <i class="fa-solid fa-box-open text-4xl text-gray-600 mb-4"></i>
                        <p class="text-gray-400 font-orbitron">No accounts found matching "${searchTerm}"</p>
                    </div>
                `;
            }

            // Update count
            const countElement = document.getElementById('products-count');
            if (countElement) {
                countElement.innerText = `Showing ${filteredAccounts.length} accounts`;
            }
        }
    });
}
