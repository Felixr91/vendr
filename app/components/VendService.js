//PRIVATE
import VendingMachine from "../models/VendMachine.js";
import Product from "../models/product.js";

//instatiates an instance of the vending machine class
let fritos = new Product("Fritos", 1, 20, "https://www.myamericanmarket.com/892-large_default/fritos-corn-chips.jpg")
let tab = new Product("Tab", 1, 15, "https://pbs.twimg.com/profile_images/824647153721106432/gwLIQxqy_400x400.jpg")
let dew = new Product("Dew", 1, 6, "https://www.myamericanmarket.com/6109-large_default/mountain-dew-soda.jpg")

let vm = new VendingMachine(100, [fritos, tab, dew])

//PUBLIC
export default class VendService {
  //increases currentTransaction and returns new total
  addQuarter() {
    console.log(2)
    vm.currentTransaction += .25
    return vm.currentTransaction
  }
  //attempts to get the item requested from its index
  vendItem(productIndex) {
    //check if valid
    let product = vm.products[productIndex]
    // IF Exists    we have some            you have enough money
    if (product && product.quantity > 0 && vm.currentTransaction >= product.price) {
      this.processTransaction(product)
      return JSON.parse(JSON.stringify(product))
    }
    return false
  }
  //updates vending data on successful transaction
  processTransaction(product) {
    product.quantity--
    vm.totalMoney += product.price
    vm.currentTransaction -= product.price
  }
  //returns all products from the vending machine
  getProducts() {
    //breaks refrence in memory to protect code
    return JSON.parse(JSON.stringify(vm.products))
  }
}