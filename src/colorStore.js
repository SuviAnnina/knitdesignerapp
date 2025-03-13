import { reactive, ref } from 'vue'

export const selectedColorIndex = ref(1);

export const canvasColor = "#EDF9EB";

export const colorPalette = reactive([
    {
        color: "#ba9cba",
        show: true,
    },
    {
        color: "#ffffff",
        show: true,
    },
    {
        color: "",
        show: false,
    },
    {
        color: "",
        show: false,
    },
    {
        color: "",
        show: false,
    },
    {
        color: "",
        show: false,
    },
    {
        color: "",
        show: false,
    },
    {
        color: "",
        show: false,
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