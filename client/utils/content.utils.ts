const excludedContentTypes = ["Content", "Page", "Block", "Image", "Media"]

export function getContentType(contentTypes: string[]) {
  return contentTypes.find((x) => !excludedContentTypes.includes(x))
}

export function getContentPath(url: string) {
  return new URL(url).pathname
    .split("/")
    .filter((x) => x)
    .join("/")
}
