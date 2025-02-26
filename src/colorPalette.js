import { reactive } from 'vue'

export const colorPalette = reactive([
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

export function updateColor(index, colorCode) {
    colorPalette[index].color = colorCode;
}

export function setColorEmpty(index) {
    colorPalette[index].color = '';
    colorPalette[index].show = false;
}