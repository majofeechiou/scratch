(function(){

    // 少年林殊
    // http://www.mingxing.com/juzhao/99/294048/12.html

    // 滑鼠位置的抓取，有參考
    // http://bioankeyang.blogspot.tw/2013/12/canvas.html
    
    // 圓形橡皮檫有參考
    // http://jsdo.it/akm2/e8CK

    // - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - 

    CanvasRenderingContext2D.prototype.clear = function() {
        this.save();
        this.globalCompositeOperation = 'destination-out';
        this.fillStyle = 'black';
        this.fill();
        this.restore();
    };

    // - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - 

    function createCanvas(num_zindex, str_imgfrom){
        var _num_width = 768, // 2048
            _num_height = 456, // 1216
            _obj_img = document.createElement('img'),
            _obj_canvas = document.createElement('canvas'),
            _obj_canvas_2d = _obj_canvas.getContext('2d');

        _obj_img.src = str_imgfrom;

        _obj_canvas.width = _num_width;
        _obj_canvas.height = _num_height;

        _obj_img.onload = function(){
            _obj_canvas_2d.drawImage( this, 0, 0, this.width, this.height, 0, 0, _num_width, _num_height );
        };

        _obj_canvas.style.boder = '1px solid #900';
        _obj_canvas.style.zIndex = num_zindex;
        _obj_canvas.style.position = 'absolute';
        _obj_canvas.style.left = '30px';
        _obj_canvas.style.top = '30px';

        document.getElementsByTagName('body')[0].appendChild(_obj_canvas);

        return {canvas:_obj_canvas, canvas_2d:_obj_canvas_2d};
    }

    // - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - 

    function getMousePos(obj_section, e){
        var rect = obj_section.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,//相對於Canvas左上角的X座標
            y: e.clientY - rect.top,//相對於Canvas左上角的Y座標
            rectLeft : rect.left,
            rectTop : rect.top,
            clientX : e.clientX,
            clientY : e.clientY
        }
    };

    // - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - 

    createCanvas( 1, './new.jpg' );

    var _json_canvas = createCanvas( 2, './origin.jpg' ),
        _obj_canvas = _json_canvas.canvas,
        _obj_canvas_2d = _json_canvas.canvas_2d;

    _obj_canvas.addEventListener('mousemove', function(e){
        var _json_pos = getMousePos(_obj_canvas, e);
        // var _num_radius = 5;
        var _num_radius = 1,
            _num_range = 50,
            _num_range_half = Math.floor(_num_range/2),
            _num_random_deg,
            _num_random_range;

        // 基本款（方形）
        // _obj_canvas_2d.clearRect( (_json_pos.x-5), (_json_pos.y-5), 10, 10 );
        
        // 基本款（圓形）
        // _obj_canvas_2d.beginPath();
        // _obj_canvas_2d.arc(_json_pos.x, _json_pos.y, _num_radius, 0, Math.PI*2, false);
        // _obj_canvas_2d.clear();
        // _obj_canvas_2d.closePath();
        
        // 散落筆刷（方形）
        // for( var i=0; i<_num_range*4; i++ ){
        //     _obj_canvas_2d.beginPath();
        //     _obj_canvas_2d.arc(_json_pos.x+Math.floor(Math.random()*_num_range)-_num_range_half, _json_pos.y+Math.floor(Math.random()*_num_range)-_num_range_half, _num_radius, 0, Math.PI*2, false);
        //     _obj_canvas_2d.clear();
        //     _obj_canvas_2d.closePath();
        // }
        
        // 散落筆刷（圓形）
        for( var i=0; i<_num_range*4; i++ ){
            _num_random_deg = Math.PI*2*Math.random();
            _num_random_range = Math.floor(_num_range_half*Math.random());
            _obj_canvas_2d.beginPath();
            _obj_canvas_2d.arc(_json_pos.x+Math.floor(_num_random_range*Math.cos(_num_random_deg)), _json_pos.y+Math.floor(_num_random_range*Math.sin(_num_random_deg)), _num_radius, 0, Math.PI*2, false);
            _obj_canvas_2d.clear();
            _obj_canvas_2d.closePath();
        }

    });

})();