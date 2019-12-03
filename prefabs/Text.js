//Class that will allow us to easily have the same font and text style for the whole game
class Text{
    constructor(ctx, x, y, string, style, origin) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.text = string;

        this.style = this.initStyle(style);
        this.origin = this.initOrigin(origin);

        this.obj = this.createText();
    }

    initStyle(key){
        let style = {
            // fontFamily: "arial",
            fontFamily: "clickPixel",
            fontSize: 16,
            color: '0xFFFFFF',
            align: 'center'
        };

        switch(key){
            case 'title':
                style.fontSize = '32px';
                break;
            case 'preload':
                style.fontSize = '24px';
                break;
        }
        return style;
    }

    //Be able to set an object or a number depending on what we need
    initOrigin(origin){
        if(typeof origin === 'number'){
            return{
                x : origin,
                y : origin
            };
        }else if(typeof origin === 'object'){
            return origin;
        }else{
            return{
                x : 0.5,
                y : 0.5
            }
        }
    }

    //Text object
    createText(){
        let obj = this.ctx.add.text(
            this.x,
            this.y,
            this.text,
            this.style.fontFamily,
            this.style.fontSize,
            this.style.align
        );
        // console.log(obj);

        obj.setOrigin(this.origin.x, this.origin.y);
        return obj;
    }

    destroy(){
        this.obj.destroy();
        this.obj = false;
    }

//    Setters
    setText(string){
        this.text = string;
        this.obj.setText(string);
    }

    setX(x){
        this.x = x;
        this.obj.setX(x);
    }

    setY(y){
        this.y = y;
        this.obj.setY(y);
    }

    setOrigin(origin){
        this.origin = this.initOrigin(origin);
        this.obj.setOrigin(origin);
    }

    setDepth(depth){
        this.obj.setDepth(depth);
    }

    setScrollFactor(scrollX, scrollY){
        this.obj.setScrollFactor(scrollX, scrollY);
    }

//    Getters
    getCenter(){
        return this.obj.getCenter();
    }
    getTopLeft(){
        return this.obj.getTopLeft();
    }
    getTopRight(){
        return this.obj.getTopRight();
    }
    getBottomLeft(){
        return this.obj.getBottomLeft();
    }
    getBottomRight(){
        return this.obj.getBottomRight();
    }
}