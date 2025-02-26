import { reactive } from 'vue'

export const colorPalette = reactive({
    mainColor: "#ba9cba",
    color1: '#ffffff',
    color2: '',
    color3: '',
    color4: '',
    color5: '',
    color6: '',
    color7: '',
});

export const colorPalette2 = reactive([
    {
        color: "#ba9cba",
        show: true,
        chosen: false,
    },
    {
        color: "#ffffff",
        show: true,
        chosen: false
    },
    {
        color: "",
        show: false,
        chosen: false
    },
    {
        color: "",
        show: false,
        chosen: false
    },
    {
        color: "",
        show: false,
        chosen: false
    },
    {
        color: "",
        show: false,
        chosen: false
    },
    {
        color: "",
        show: false,
        chosen: false
    },
    {
        color: "",
        show: false,
        chosen: false
    },
])

// export function updateColor(colorKey, colorCode) {
//     if (colorPalette[colorKey] !== undefined) {
//         colorPalette[colorKey] = `#${colorCode}`;
//     }
// }
export function updateColor(index, colorCode) {
    // if (colorPalette2[index] !== undefined) {
    colorPalette2[index].color = `#${colorCode}`;
    // }
}

// export function setColorEmpty(colorKey) {
//     colorPalette[colorKey] = '';
// }
export function setColorEmpty(index) {
    colorPalette2[index].color = '';
    colorPalette2[index].show = false;
}