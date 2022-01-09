import React from 'react';
import Banner from '../components/banner/banner';
import FilterBar from '../components/filterBar/FilterBar';
import ProductPreview from '../components/productPreview/productPreview'
import dbConnect from '../lib/dbConnect'
import { getProducts } from '../lib/dbAccess'
import { useRouter } from 'next/router'
import { getProductsByCollection, getProductsByType } from '../lib/atlasSearch';
function products({query, products}) {
    const router = useRouter();
    console.log(products)
    return (
        <div className='centered-cont'>
            <Banner />
            <FilterBar />
            <div className='product-list'>
                {products.map((product, i) => {
                    return (
                        <ProductPreview 
                            i={i}
                            src={product.image[0] || product.image[1]} 
                            prodTitle={product.title} 
                            prodPrice={`${product.price}`}
                            // prodPage={() => router.push("products/" + product._id)} Use template literal with ``
                            prodPage={() => router.push(`products/${product._id}`)}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default products


export async function getServerSideProps({query}) {
    await dbConnect() // always confirm connection from global cache with this line
    let products = {}; // initialize variable products so we can fill it accordingly
    let [key] = Object.keys(query) // grab the key from the query object, either type or collection
    let value = query[key];
    if(!key) { // query param will be empty on index
        products = await getProducts()
    } else {
        if(key === 'type') {
            // when using type as a search, we send the 
            // value to this function to activate the atlas search query
            products = await getProductsByType(value)
        }
        if(key === 'collection') {
            // when using collectionName as a search, we send the 
            // value to this function to activate the atlas search query
            products = await getProductsByCollection(value)
        }
    }
    console.log()
    return {
      props: {
          query,
          products: JSON.parse(JSON.stringify(products))
        }, // will be passed to the page component as props
    }
  }