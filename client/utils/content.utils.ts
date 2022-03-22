const excludedContentTypes = ["Content", "Page", "Block", "Image", "Media"]

export function getContentType(contentTypes: string[]) {
  return contentTypes.find((x) => !excludedContentTypes.includes(x))
}
