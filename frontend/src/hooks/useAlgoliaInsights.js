import si from 'search-insights'

const VITE_ALGOLIA_APP_ID = process.env.REACT_APP_VITE_ALGOLIA_APP_ID
const VITE_ALGOLIA_API_KEY = process.env.REACT_APP_VITE_ALGOLIA_API_KEY
const VITE_ALGOLIA_INDEX_NAME = process.env.REACT_APP_VITE_ALGOLIA_INDEX_NAME

si('init', {
  appId: VITE_ALGOLIA_APP_ID,
  apiKey: VITE_ALGOLIA_API_KEY,
  useCookie: true
})

export default function useAlgoliaInsights () {
  const sendProductAddedToCart = objectID => {
    si('convertedObjectIDs', {
      index: VITE_ALGOLIA_INDEX_NAME,
      eventName: `Producto ${objectID} agregado al carrito`,
      objectIDs: [objectID]
    })
  }

  const sendProductView = objectID => {
    si('viewedObjectIDs', {
      index: VITE_ALGOLIA_INDEX_NAME,
      eventName: `Producto ${objectID} visto`,
      objectIDs: [objectID]
    })
  }

  return {
    sendProductAddedToCart,
    sendProductView
  }
}
