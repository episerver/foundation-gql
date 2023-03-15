import { Container } from "@chakra-ui/react"
import { ContentList, ContentListItemProps, ContentListProps } from "client/components/shared/content/ContentList"
import { useRouter } from "client/hooks/optimizely/useRouter";
import { RouteProps } from "client/routeMap";
import { Locales, useBlogListPageQueryQuery } from "generated"

export default function BlogListPage({ route }: RouteProps) {
  const { locale } = useRouter()
  const { data } = useBlogListPageQueryQuery({
    variables: {
      locale: locale as Locales,
      id: route!.ContentLink!.GuidValue!
    }
  });

  let contentListItems: ContentListItemProps[] = []
  data?.Content?.items?.map((item) => {
    const contentListItemProps: ContentListItemProps = {
      Name: item?.Name ?? '',
      RouteSegment: item?.RouteSegment ?? '',
      Url: item?.Url ?? '',
      RelativePath: item?.RelativePath ?? '',
      ContentType: item?.ContentType as string[],
      ContentLink: { GuidValue: item?.ContentLink?.GuidValue ?? '' } ,
      Body: item?.__typename == "BlogListPage" ? item?.MainBody ?? '' : ''
    }

    contentListItems?.push(contentListItemProps)
  });

  return (
    <Container maxW={"lg"} mt={10}>
      <ContentList data={contentListItems} />
    </Container>
  )
}
