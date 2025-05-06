import categories_json from './data/mainList.json'
import products_json from './data/products.json'


interface Category {
  ua : string
  en: string
  short : string
  list? : string[]
}

interface Cat_object {
  [key: string]: Category
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

}

interface Product_object {
  [key: string]: Product
}

const categories = categories_json as unknown as Cat_object
const products = products_json as unknown as Product_object



interface keyable {
  [key: string]: any
}

let index: string | any = "1"
let filter = {
  who: "any",
  ages: [],
  search: '',
  sale: false
}

const useProducts = () => {

const getCategoriesList = () : Array<string> => {
  const list : Array<string> = Object.keys(categories)
  return list.map(((item : string) => categories[item].ua))
  
}
const getCategory = (i : any) => {
  console.log("getCategory", i, index, typeof i, Object.keys(categories))
  if (i == undefined || i == "0") return {title: "No Title", category: "1", subcats: []}
  index = i.toString()
  return {category: index, ...categories[index]}
}

const getCategoryProducts = (i : any, j : any) : product[] => {
  console.log("getCategoryProducts", i, j, index, typeof i)
  if (i == undefined || i == "0") return []
  index = i.toString()
  const product_keys = Object.keys(products)
  
  if (i.length > 4) {// "filter"
    return product_keys.reduce( (acc : product[], item : string) => {

      if ( (filter.who == "any" || products[item].target.includes(filter.who))
        &&
           (filter.ages.length == 0 || filter.ages.filter(e => products[item].age.includes(e)).length > 0)
        &&
           (filter.search.length == 0 || products[item].title.toLowerCase().includes(filter.search))
        &&
           (filter.sale == false || products[item].sale > 0)
      ) 
        acc.push({ code: item, ...products[item]}) 
      return acc
    }, [])
  
  }
  if (j == undefined)
    return product_keys.reduce( (acc : product[], item) => {
      if (products[item].cat == index) acc.push({ code: item, ...products[item]}) 
      return acc
    }, [])
  const subcat = j.toString()
  return product_keys.reduce( (acc : product[], item) => {
    if (products[item].cat == index && products[item].subcat == subcat) acc.push({ code: item, ...products[item]}) 
    return acc
  }, [])
}


const getSelectedTitle = (i : any, j : any) : string => {
  console.log("getSelectedTitle", i, j, index, typeof i)

  if (i == undefined || i == "0" ) return ''

  if (i.length > 4) {// "filter"
    if (filter.sale) return "Акційні пропозиції"
    let result = "Всі товари"
        return result
  }
  else if (j == undefined) return categories[i].ua
  return categories[i].list[parseInt(j)-1]


}

const ProdGetItem = (key : string) => {
   console.log("ProdGetItem", key)
  if (key == undefined || key == "undefined") return {}
  const result : keyable = products[key]
  result.code = key
  return result
}

const ProdGetDetails = (key : string) => {
  console.log("ProdGetmages", key)
  if (key == undefined || key == "undefined") return {}
  const count = products[key].imgs
  const images = [key + '_0.webp']
  for (let i = 0; i < count - 1; i++) images.push(key + '_' + (i+1) + '.webp')

const target = ""
const whom = ""
const specs : Array<string[]> = [...products[key].features] //!!!shallow copy
console.log( images, specs, products[key].features )

  return { images, specs }
}

const ProdFindItemByName = (key : string) => {
  // console.log(list, key)
  if (key == undefined) return {}
  return Object.keys(categories).filter(elem =>categories[elem].title === key)[0]
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
    console.log ("setFilter", mode, value)
    filter.search = ''
    filter.sale = false
    if (mode =="search")
      filter = {who: "any", ages: [], search: value.toLowerCase(), sale: false}
    else if (mode =="who") {
      filter.who = (value == 1) ? "baby" 
                 : (value == 2) ? "girls"
                 : (value == 3) ? "boys"
                 : "any"
      if (value == 5) filter = {who: "any", ages: [], search: '', sale: true}          
    } 
    else filter.ages = value
    console.log ("setFilter", mode, value, filter)
}

  return {
    ProdGetItem,
    ProdGetDetails,
    ProdFindItemByName,
    ProdSearch,
    getCategoriesList,
    getCategory,
    getSelectedTitle,
    getCategoryProducts,
    setFilter
  }
}
export default useProducts