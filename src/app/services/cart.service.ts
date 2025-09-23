import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: any[] = [];
  
  constructor(){}

  addToCart(item: any){
    const existing = this.items.find(
        (p) => p.id === item.id && p.color === item.color && p.size === item.size
    );
    if(existing){
        existing.quantity+=item.quantity;
        existing.total=existing.quantity*existing.price;
    }else{
        this.items.push(item);
    }
  }
  getItems(){
    return this.items;
  }
  removeItem(item:any){
    this.items = this.items.filter(
        (p) => !(p.id === item.id && p.color === item.color && p.size === item.size)
    )
  }
  clearCart(){
    this.items = [];
  }
  getTotalPrice(){
    return this.items.reduce((sum, item) =>sum+item.total,0);
  }
  getCount(){
    return this.items.reduce((sum, item)=> sum+item.quantity, 0);
  }
}
