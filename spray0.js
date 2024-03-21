function sprayArray() {
    var structureID = 0x800;
    var cellTypes = 0x01072107; // ArrayType
    i32[0] = structureID;
    i32[1] = cellTypes;
    var cell = f64[0];
    
    for(var i = 0; i < spray_count; i++) {
        for(var j = 0; j < spray_length; j++) {
            var o = {p1:1.1, p2:1.1, p3:cell, p4:unboxed, p5:2.2, p6:3.3};
            sprays[i][j] = o;
        }
    }
    console.log("Array sprayed successfully!");
}