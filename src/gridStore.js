import { reactive } from 'vue'

export const grid = reactive([])

export const resizeGrid = (template) => {
    grid.splice(0, grid.length, ...Array.from(
        { length: template.rows },
        () => Array(template.columns).fill(0)
    ));
};

export const setGridValue = (x, y, value) => {
    grid[y][x] = value;
}