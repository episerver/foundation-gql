import Error from "next/error"
import { lazy, Suspense, useMemo } from "react"

export const Page: React.FC<RouteProps> = ({ route }) => {
  const { contentType } = route || {}
  const Content = useMemo(
    () =>
      lazy(() =>
        import(`client/components/page/${contentType}`).catch((err) => {
          console.error(err)
          const title = `Missing page: ${contentType}`
          return {
            default: () => <Error statusCode={404} title={title} />,
          }
        })
      ),
    [contentType]
  )

  return (
    <Suspense fallback={<></>}>
      <Content {...{ route }} />
    </Suspense>
  )
}
