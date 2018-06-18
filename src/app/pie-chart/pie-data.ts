export class PieData{

    public startAngle:number;
    public endAngle:number;
    public percentage:number;

    constructor(    
        public name:string,
        public value: number,
        public colour: string,
        public unitType: string){}

}

