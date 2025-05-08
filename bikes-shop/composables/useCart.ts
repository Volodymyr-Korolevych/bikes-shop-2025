import products_json from './data/products.json'

const products = products_json as unknown as Product[]

declare global {
  interface CartItem {
    index: string
    quantity: number
    name?: string
    price: number
  }
}
const Cart: Array<CartItem> = []
const CartValue: number = 0

const cartStatus = ref({count: 0, total: 0}) // reactive status
const activeCart = ref(false) // reactive status

const cleaned_price = (price : string | null) => 

  parseInt ((price ?? '').replace(" ", "").replace("грн", ""))


const useCart = () => {

  const addItemToCart = (id: string): Boolean => {
    const item: CartItem | null = Cart.find(elem => elem.index === id) ?? null
    console.log("Add item to Cart", Cart, id, item)
    if (!item) {
      
      const _price : string | null = products.find(e => e.index === id)?.price ?? null
      Cart.push({ index: id, quantity: 1, price: cleaned_price(_price) })
      updateCartStatus()
      return false // record is added
    }
    Cart.splice(Cart.findIndex(elem => elem.index === id), 1)
    updateCartStatus()

    return true // record is found in the Cart array
  }

  const isItemInCart = (id: string): Boolean => {
    const item: CartItem | null = Cart.find(elem => elem.index === id) ?? null
    return (!!item)
  }

  const removeItemFromCart = (id: string): Boolean => {
    const index: number | undefined = Cart.findIndex(elem => elem.index === id)
    if (index == undefined) return false // no record found
    Cart.splice(index, 1)
    updateCartStatus()
    return true // record is added
  }

  const updateCartStatus = () => {
    console.log('getCountItemsInCart', Cart.length, Cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0))
    cartStatus.value = {
      count: Cart.length,
      total: Cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    }
  }

  const getListItemsInCart = (watch_value: number): string[] => {
    return Cart.map(elem => elem.index)
  }

  const getCart = (watch_value: number): CartItem[] => {
    return Cart.map(elem => {
      const prod : Product | null = products.find(e => e.index === elem.index) ?? null
      return {
        index: elem.index,
        quantity: elem.quantity,
        name: prod?.title,
        price: prod?.price ? cleaned_price(prod.price) : 0
      }

    })
  }

  const updateQuantityInCart = (id: string, delta: number) => {
    const index: number | undefined = Cart.findIndex(elem => elem.index === id)
    Cart[index].quantity += delta
    if (Cart[index].quantity <= 0) Cart.splice(index, 1)
      updateCartStatus()
  }

  const emptyCart = () => {
    Cart.splice(0, Cart.length)
    cartStatus.value = { count: 0, total: 0 }
  }

  return {
    addItemToCart,
    removeItemFromCart,
    isItemInCart,
    getListItemsInCart,
    getCart,
    updateQuantityInCart,
    emptyCart,
    cartStatus,
    activeCart,
    activateCart: (value: boolean) => { activeCart.value = value }
  }
}
export default useCart