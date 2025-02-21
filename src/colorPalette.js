import { reactive } from 'vue'

/* export const colorPalette = reactive(
    [
        {
            mainColor: "#ba9cba",
            show: true
        },
        {
            color1: '#ffffff',
            show: true
        },
        {
            color2: '',
            show: false
        },
        {
            color3: '',
            show: false
        },
        {
            color4: '',
            show: false
        },
        {
            color5: '',
            show: false
        },
        {
            color6: '',
            show: false
        },
        {
            color7: '',
            show: false
        },

    ]
);
 */
export const colorPalette = reactive({
    mainColor: "#ba9cba",
    color1: '#ffffff',
    color2: '',
    color3: '',
    color4: '',
    color5: '',
    color6: '',
    color7: ''
});

// an array of objects holding maincolor: #code and boolean show: true / false?

export function updateColor(colorKey, colorCode) {
    if (colorPalette[colorKey] !== undefined) {
        colorPalette[colorKey] = `#${colorCode}`;
    }
}
/* export function updateColor(colorKey, colorCode) {
    for (let colorObject of colorPalette) {
        // Use Object.prototype.hasOwnProperty to avoid ESLint warning
        if (Object.prototype.hasOwnProperty.call(colorObject, colorKey)) {
            colorObject[colorKey] = `#${colorCode}`;
            break;
        }
    }
} */
export function setColorEmpty(colorKey) {
    colorPalette[colorKey] = 'leikisti tyhjä';
}

/* export function setColorEmpty(colorKey) {
    for (let colorObject of colorPalette) {
        // Use Object.prototype.hasOwnProperty to avoid ESLint warning
        if (Object.prototype.hasOwnProperty.call(colorObject, colorKey)) {
            colorObject[colorKey] = 'leikisti tyhjä';  // Modify as needed
            break;
        }
    }
} */