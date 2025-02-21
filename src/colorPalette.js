import { reactive } from 'vue'

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

export function updateColor(colorKey, colorCode) {
    if (colorPalette[colorKey] !== undefined) {
        colorPalette[colorKey] = `#${colorCode}`;
    }
}

export function setColorEmpty(colorKey) {
    colorPalette[colorKey] = '';
}