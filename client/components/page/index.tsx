import { RouteProps } from "client/routeMap"
import { getContentType } from "client/utils/content.utils"
import Error from "next/error"
import { lazy, Suspense, useMemo } from "react"

export const Page: React.FC<RouteProps> = ({route}) => {
  const { ContentType } = route || {}
  const concreteContentType = getContentType(ContentType as string[])

  const Content = useMemo(
    () =>
      lazy(() =>
        import(`client/components/page/${concreteContentType}`).catch((err) => {
          console.error(err)
          const title = `Missing page: ${concreteContentType}`
          return {
            default: () => <Error statusCode={404} title={title} />,
          }
        })
      ),
    [concreteContentType]
  )

  return (
    <Suspense fallback={<></>}>
      <Content {...{ 
        route: route 
      }} />
    </Suspense>
  )
}
