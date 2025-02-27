import { reactive, ref } from 'vue'

export const selectedColorIndex = ref(1);

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

export function updateShow(index, boolean) {
    colorPalette[index].show = boolean;
}

export function setColorEmpty(index) {
    colorPalette[index].color = '';
}

export function changeSelectedColor(index) {
    selectedColorIndex.value = index;
}