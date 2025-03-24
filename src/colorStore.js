import { reactive, ref } from 'vue'

export const selectedColorIndex = ref(1);

export const canvasColor = "#EDF9EB";

export const colorPalette = reactive([ // TODO: color indexes moved up; index 0 now no-color/empty; usable colors 1-8; yarnmanager logic changes
    {
        color: "#000000",
        show: false,
    },
    {
        color: "#ba9cba",
        show: true,
    },
    {
        color: "#00FF00",
        show: true,
    },
    {
        color: "#0000FF",
        show: true,
    },
    {
        color: "#FFFF00",
        show: false,
    },
    {
        color: "#FF00FF",
        show: false,
    },
    {
        color: "#00FFFF",
        show: false,
    },
    {
        color: "#FF8000",
        show: false,
    },
    {
        color: "#8000FF",
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