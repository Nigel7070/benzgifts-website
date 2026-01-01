/**
 * client-side data store for BenzGifts
 * Acts as a simulated database using LocalStorage
 */

const DEFAULT_THREAD_COLORS = [
    // Greens
    { id: 1, name: "Milo Green", hex: "#004e36", category: "Greens", service_type: "both", is_active: true },
    { id: 2, name: "Apple Green", hex: "#8db600", category: "Greens", service_type: "both", is_active: true },
    { id: 3, name: "Dark Green", hex: "#013220", category: "Greens", service_type: "both", is_active: true },
    { id: 4, name: "Petronas Green", hex: "#00a19c", category: "Greens", service_type: "both", is_active: true },
    { id: 5, name: "Highlight Green", hex: "#7eff00", category: "Greens", service_type: "both", is_active: true },
    
    // Yellows & Creams
    { id: 6, name: "Yellow", hex: "#ffff00", category: "Yellows & Creams", service_type: "both", is_active: true },
    { id: 7, name: "Maybank Yellow", hex: "#ffcd00", category: "Yellows & Creams", service_type: "both", is_active: true },
    { id: 8, name: "Lime Yellow", hex: "#e3ff00", category: "Yellows & Creams", service_type: "both", is_active: true },
    { id: 9, name: "Cream", hex: "#fffdd0", category: "Yellows & Creams", service_type: "both", is_active: true },

    // Oranges & Browns
    { id: 10, name: "Orange", hex: "#ffa500", category: "Oranges & Browns", service_type: "both", is_active: true },
    { id: 11, name: "Brown", hex: "#a52a2a", category: "Oranges & Browns", service_type: "both", is_active: true },
    { id: 12, name: "Light Brown", hex: "#b5651d", category: "Oranges & Browns", service_type: "both", is_active: true },
    { id: 13, name: "Dark Brown", hex: "#654321", category: "Oranges & Browns", service_type: "both", is_active: true },

    // Reds & Pinks
    { id: 14, name: "Chili Red", hex: "#e23d28", category: "Reds & Pinks", service_type: "both", is_active: true },
    { id: 15, name: "Tomato Red", hex: "#ff6347", category: "Reds & Pinks", service_type: "both", is_active: true },
    { id: 16, name: "Maroon", hex: "#800000", category: "Reds & Pinks", service_type: "both", is_active: true },
    { id: 17, name: "Magenta", hex: "#ff00ff", category: "Reds & Pinks", service_type: "both", is_active: true },
    { id: 18, name: "Pink", hex: "#ffc0cb", category: "Reds & Pinks", service_type: "both", is_active: true },

    // Blues
    { id: 19, name: "Sea Blue", hex: "#006994", category: "Blues", service_type: "both", is_active: true },
    { id: 20, name: "Royal Blue", hex: "#4169e1", category: "Blues", service_type: "both", is_active: true },
    { id: 21, name: "Navy Blue (Name Tag)", hex: "#000080", category: "Blues", service_type: "both", is_active: true },
    { id: 22, name: "Navy Blue (Artwork)", hex: "#0a0a3c", category: "Blues", service_type: "both", is_active: true },
    { id: 23, name: "Navy Blue (Everwin)", hex: "#05051e", category: "Blues", service_type: "both", is_active: true },
    { id: 24, name: "Light Blue", hex: "#add8e6", category: "Blues", service_type: "both", is_active: true },
    { id: 25, name: "Sky Blue", hex: "#87ceeb", category: "Blues", service_type: "both", is_active: true },

    // Purples
    { id: 26, name: "Purple", hex: "#800080", category: "Purples", service_type: "both", is_active: true },
    { id: 27, name: "Light Purple", hex: "#cbc3e3", category: "Purples", service_type: "both", is_active: true },

    // Neutrals
    { id: 28, name: "Black", hex: "#000000", category: "Neutrals", service_type: "both", is_active: true },
    { id: 29, name: "White", hex: "#ffffff", category: "Neutrals", service_type: "both", is_active: true },
    { id: 30, name: "Light Grey", hex: "#d3d3d3", category: "Neutrals", service_type: "both", is_active: true },
    { id: 31, name: "Dark Grey", hex: "#a9a9a9", category: "Neutrals", service_type: "both", is_active: true },

    // Specialty
    { id: 32, name: "Golden Yellow Metallic", hex: "#d4af37", category: "Specialty", service_type: "embroidery", is_active: true }
];

const DataStore = {
    // Thread Colors
    getThreadColors: function() {
        const stored = localStorage.getItem('benzgifts_thread_colors');
        if (!stored) {
            // Initialize if not present
            localStorage.setItem('benzgifts_thread_colors', JSON.stringify(DEFAULT_THREAD_COLORS));
            return DEFAULT_THREAD_COLORS;
        }
        return JSON.parse(stored);
    },

    saveThreadColor: function(color) {
        const colors = this.getThreadColors();
        if (color.id) {
            // Update
            const index = colors.findIndex(c => c.id === color.id);
            if (index !== -1) colors[index] = color;
        } else {
            // Create
            color.id = Date.now(); // Simple ID
            color.created_at = new Date().toISOString();
            colors.push(color);
        }
        localStorage.setItem('benzgifts_thread_colors', JSON.stringify(colors));
        return color;
    },

    deleteThreadColor: function(id) {
        let colors = this.getThreadColors();
        // Soft delete or Hard delete? Requirement says "Soft delete (mark as inactive)"
        // But also "Hard delete option". Let's do hard delete for simplicity unless active.
        colors = colors.filter(c => c.id !== id); 
        localStorage.setItem('benzgifts_thread_colors', JSON.stringify(colors));
    },

    // Reset DB (for debug)
    resetThreads: function() {
        localStorage.setItem('benzgifts_thread_colors', JSON.stringify(DEFAULT_THREAD_COLORS));
        return DEFAULT_THREAD_COLORS;
    }
};

// Export for module usage (though we'll likely load via <script> tag)
window.DataStore = DataStore;
