import React from "react"

import { NavBar } from "./layout/Navbar"

import { LocationsPage } from "./location/Locations.Page"

const App: React.FC = () => (
  <>
    <NavBar />
    <LocationsPage />
  </>
)

export default App
