import { ref } from "vue";

export const yokeTexture = ref(null);

export const fillerTexture = ref(null);

export const filledYokeTexture = ref(null);

// TODO: Clear textureStore ?? cleanup?

export function setFillerTexture(newTexture) {
    fillerTexture.value = newTexture;
}

export function setFilledYokeTexture(newTexture) {
    filledYokeTexture.value = newTexture;
}
