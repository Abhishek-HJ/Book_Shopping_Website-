import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'

import NewCollection from '../components/NewCollections/NewCollection'
import News from '../components/NewsLetter/News';

const Shop = () => {
  return (
    <div>
        <Hero/>
        <Popular/>
       
        <NewCollection/>
        <News/>
        
    </div>
  )
}

export default Shop