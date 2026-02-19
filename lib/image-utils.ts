import imageCompression from 'browser-image-compression'

const MAX_SIZE_MB = 1
const MAX_WIDTH_OR_HEIGHT = 1024
const MAX_INPUT_SIZE_MB = 10

interface ICompressResult {
  file: File
  preview: string
}

export const compressImage = async (file: File): Promise<ICompressResult> => {
  if (!file.type.startsWith('image/')) {
    throw new Error('invalid_file_type')
  }

  if (file.size > MAX_INPUT_SIZE_MB * 1024 * 1024) {
    throw new Error('file_too_large')
  }

  const compressedFile = await imageCompression(file, {
    maxSizeMB: MAX_SIZE_MB,
    maxWidthOrHeight: MAX_WIDTH_OR_HEIGHT,
    useWebWorker: true,
    fileType: 'image/jpeg',
  })

  const preview = await imageCompression.getDataUrlFromFile(compressedFile)

  return { file: compressedFile, preview }
}
