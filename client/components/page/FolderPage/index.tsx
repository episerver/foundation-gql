import { Container } from "@chakra-ui/react"

import { ContentList, ContentListItemProps } from "client/components/shared/content/ContentList"
import { useRouter } from "client/hooks/optimizely/useRouter"
import { RouteProps } from "client/routeMap"
import { Locales, useFolderPageQueryQuery } from "generated"

export default function FolderPage({ route }: RouteProps) {
  const { locale } = useRouter()

  const { data } = useFolderPageQueryQuery({
    variables: {
      locale: locale as Locales,
      ancestors: route!.ContentLink!.GuidValue!,
      limit: 20,
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
      Body: item?.__typename == "TagPage" ? item?.MainBody ?? '' : ''
    }

    contentListItems?.push(contentListItemProps)
  });

  return (
    <Container maxW={"lg"} mt={10}>
      <ContentList data={contentListItems}/>
    </Container>
  )
}
