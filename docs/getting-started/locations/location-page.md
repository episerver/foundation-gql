# I. What does location page look like?

We are going to create a single page like the below figure:

![Location page](./images/location-page.png "Location page")

# II. How to do it?
Here are the steps to do:

1. Query all location list pages.
2. Query all location items of each location page.
3. Get facets of `Country`, `Continents` and `AverageTemperature`
4. Create `LocationListPage` component

![Facet](./images/facets.png "Facet")

# III. Let's do it.

1. Query all location list pages

``` graphql
query LocationListQuery(
  $locale: [Locale] = [EN]
  $path: String
  $continents: [String] = []
  $countries: [String] = []
  $minAvgTemp: Float = 0
  $maxAvgTemp: Float = 30
  $orderBy: LocationItemPageOrderByInput
  $searchTerm: String = ""
) {
  LocationListPage(
    locale: $locale, 
    where: { RelativePath: { eq: $path } }) {
    items {
      Name
      MainBody
    }
  }
}

```

2. Query all location items of each location page.

```graphql
query LocationListQuery(
  $locale: [Locale] = [EN]
  $path: String
  $continents: [String] = []
  $countries: [String] = []
  $minAvgTemp: Float = 0
  $maxAvgTemp: Float = 30
  $orderBy: LocationItemPageOrderByInput
  $searchTerm: String = ""
) {
  LocationListPage(
    locale: $locale, 
    where: { RelativePath: { eq: $path } }) {
    items {
      Name
      MainBody
      _children {
        LocationItemPage(
          limit: 100
          where: {
            AvgTemp: { gte: $minAvgTemp, lte: $maxAvgTemp }
            Country: { in: $countries }
            Continent: { in: $continents }
            _fulltext: { like: $searchTerm }
          }
          orderBy: $orderBy
        ) {
          total
          items {
            Location: Name
            Country
            Continent
            Created
            AvgTemp
            Longitude
            Latitude
            IntroText: MainIntro
            RelativePath
          }
        }
      }
    }
  }
}

```

3. Refactor: move all fields under `LocationItemPage` items to a fragment.

```graphql
fragment LocationItemFragment on LocationItemPage {
  Location: Name
  Country
  Continent
  Created
  AvgTemp
  Longitude
  Latitude
  IntroText: MainIntro
  RelativePath
}
```
The new code should be:
```graphql
#import "./fragments/LocationItemFragment.gql"

query LocationListQuery(
  $locale: [Locale] = [EN]
  $path: String
  $continents: [String] = []
  $countries: [String] = []
  $minAvgTemp: Float = 0
  $maxAvgTemp: Float = 30
  $orderBy: LocationItemPageOrderByInput
  $searchTerm: String = ""
) {
  LocationListPage(
    locale: $locale, 
    where: { RelativePath: { eq: $path } }) {
    items {
      Name
      MainBody
      _children {
        LocationItemPage(
          limit: 100
          where: {
            AvgTemp: { gte: $minAvgTemp, lte: $maxAvgTemp }
            Country: { in: $countries }
            Continent: { in: $continents }
            _fulltext: { like: $searchTerm }
          }
          orderBy: $orderBy
        ) {
          total
          items {
            ...LocationItemFragment
          }
        }
      }
    }
  }
}
```
4. Get facets of `Country`, `Continent` and `AverageTemperature` for `LocationItemPage`.

```graphql
#import "./fragments/LocationItemFragment.gql"

query LocationListQuery(
  $locale: [Locale] = [EN]
  $path: String
  $continents: [String] = []
  $countries: [String] = []
  $minAvgTemp: Float = 0
  $maxAvgTemp: Float = 30
  $orderBy: LocationItemPageOrderByInput
  $searchTerm: String = ""
) {
  LocationListPage(locale: $locale, where: { RelativePath: { eq: $path } }) {
    items {
      Name
      MainBody
      _children {
        LocationItemPage(
          limit: 100
          where: {
            AvgTemp: { gte: $minAvgTemp, lte: $maxAvgTemp }
            Country: { in: $countries }
            Continent: { in: $continents }
            _fulltext: { like: $searchTerm }
          }
          orderBy: $orderBy
        ) {
          total
          items {
            ...LocationItemFragment
          }
          facets {
            Country(orderType: VALUE, orderBy: ASC, limit: 100) {
              name
              count
            }
            Continent(orderType: VALUE, orderBy: ASC) {
              name
              count
            }
            AverageTemperature: AvgTemp(
              ranges: [
                { from: 0, to: 5 }
                { from: 5, to: 10 }
                { from: 10, to: 15 }
                { from: 15, to: 20 }
                { from: 20, to: 25 }
                { from: 25, to: 30 }
              ]
            ) {
              name
              count
            }
          }
        }
      }
    }
  }
}

```