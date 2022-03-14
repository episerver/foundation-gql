import Error from "next/error"
import { lazy, Suspense, useMemo } from "react"

type DynamicContentProps = {
  contentType: string | undefined
}

export const DynamicContent: React.FC<DynamicContentProps> = ({ contentType }) => {
  const Content = useMemo(
    () =>
      lazy(() =>
        import(`client/components/content/${contentType}`).catch((err) => {
          console.error(err)
          return {
            default: () => <Error statusCode={404}></Error>,
          }
        })
      ),
    [contentType]
  )

  return (
    <Suspense fallback={<></>}>
      <Content />
    </Suspense>
  )
}
