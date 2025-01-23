// File configs
export const MAX_FILE_SIZE = 102400 * 7 // 700KB
export const VALID_FILE_EXT = { image: ['jpg', 'jpeg', 'png', 'webp'] }
export const ACCEPTED_IMAGES = VALID_FILE_EXT.image.map(ext => `.${ext}`).join(',')
