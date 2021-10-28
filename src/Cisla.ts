/**
 * classa Cisla, na roztriedenie vygenerovanych cisel
 */
 class Cisla {
    public element: number;
    public parnost: Boolean;
    public delitele: number[] = [];
    public prvocislo: boolean = false;
    
    constructor(_element: number){
        this.element = _element;
        
        if (_element %2 ===0){
            this.parnost = true
        }
        else{
            this.parnost = false
        }
        //delitele
        for(let i = 1; i <= this.element; i++){
            if(this.element % i === 0) {
                this.delitele.push(i);
            } 
        }
        //prvocislo kontrola
        if (this.delitele.length === 2){
            if (this.delitele[0] = 1){
                if(this.delitele[1] = this.element){
                    this.prvocislo = true
                }
            }
            
        } 

        
    }
}

export default Cisla;