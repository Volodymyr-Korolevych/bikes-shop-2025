import categories_json from './data/mainList.json'
import products_json from './data/products.json'

declare global {
  interface Category {
    ua : string
    en: string
    short : string
    list? : string[]
  }

  interface Feature {
    td: string
    th: string
  }

  interface Product {
    index: string
    category : string
    title : string
    price : string
    description : string
    features : Feature[]
    sale? : number
  }
}
const categories = categories_json as unknown as Category[]
const products = products_json as unknown as Product[]
const category = ref<Category>({ua: '', en: '', short: ''})


let index: string | any = "1"

let filter = {
  mode: "any",
  search: '',
  sale: false
}

const useProducts = () => {

const getCategoryProducts = (watchdog : number) : Product[] => {
  console.log("getCategoryProducts", category.value.en)

   
  if (category.value.en  == '') return products

  //products.forEach( (item, index) => {
  //  console.log(index, item.category, category.value.en, item.category === category.value.en)
  //})
  
  return products.filter( item => item.category === category.value.en )
}

const ProdGetItem = (key : number) : Product | null => {
   console.log("ProdGetItem", key)
  if (key == undefined ) return null
  return products[key] || {}
}   

const ProdFindItemByName = (key : string) => {
  // console.log(list, key)
  if (key == undefined) return {}
  return Object.keys(categories).filter(elem =>categories[elem].en === key)[0]
  // console.log("ProdGetItem", result)
}
const ProdSearch = (key : string) => {
  // console.log("ProdSearch", key)
  if (key == undefined || key.length == 0) return []
  // console.log("ProdSearch", Object.keys(list))
  const k = key.toLowerCase()
  return Object.keys(categories).map(elem => categories[elem].en).filter(elem => elem.toLowerCase().includes(k))
}

const setFilter = (mode : string, value : any) => {
    console.log ("setCCFilter", mode, value)
    filter.search = ''
    category.value = {ua: '', en: '', short: ''}
    filter.sale = false
    if (mode =="search")
      filter = {mode: "search", search: value.toLowerCase(), sale: false}
    else if (mode == "tab") 
      {
      filter.mode = mode
      if (value == 0) category.value = {ua: 'Всі товари', en: '', short: ''}
      else category.value = categories[value - 1]
      console.log("Tab filter set to:", filter.mode, category.value);
    }
}

  return {
    ProdGetItem,
    ProdFindItemByName,
    ProdSearch,
    getCategoriesList: () => categories,
    getCategoryProducts,
    setFilter,
    category // reactive
  }
}
export default useProducts