import { ref } from "vue";

export const templates = [
    {
        size: "XS",
        skipRows: [0, 4, 11, 15, 30, 34, 49], // yht 43 jäljellä
    },
    {
        size: "S",
        skipRows: [4, 11, 15, 30, 34, 49], // yht 44 jäljellä
    },
    {
        size: "M",
        skipRows: [4, 11, 15, 30, 34], // yht 45 jäljellä
    },
    {
        size: "L",
        skipRows: [4, 15, 34], // yht 47 jäljellä
    },
    {
        size: "XL",
        skipRows: [34], // yht 49 jäljellä
    },
    {
        size: "XXL",
        skipRows: [],
    }
];

export function getTemplate(size) {
    return templates.find(template => template.size === size) || null;
}

export const selectedTemplate = ref(getTemplate("S"));

export function setSelectedTemplate(size) {
    selectedTemplate.value = getTemplate(size);
}