/*
 * This needs some work but a quick fix would be to change the template so
 * that the string concatenation done here is not needed and, instead, the
 * various bits are defined in that file. A different solution would be to
 * provide for a formatting string in the JSON containing the seed/plant
 * name data. I (dshadowwolf) haven't done this yet as I've been busy with
 * a lot of other work.
 */
const fs = require("fs");
const util = require("util");

var base_data = JSON.parse(fs.readFileSync("input_data.json"));
var template_base = fs.readFileSync("data/plant_template.json").toString();

for( var i = 0; i < base_data.seeds.length; i++ ) {
    var this_seed = base_data.seeds[i];
    if( this_seed.drops == undefined ) {
	this_seed.drops = (this_seed.name.toLowerCase()+"_essence").replace(/\s/g, "_");
    }

    // cover for me being brain-dead in naming shit in the input file
    if( this_seed.dict == undefined ) {
	this_seed.seed = (this_seed.name.toLowerCase()+"_seeds").replace(/\s/g, "_");
    } else {
	this_seed.seed = this_seed.dict;
    }
    
    if( this_seed.crop == undefined ) {
	this_seed.crop = this_seed.name.toLowerCase().replace(/\s/g, "_");
    }
    
    this_seed.filename = this_seed.name.toLowerCase();
    this_seed.filename = this_seed.filename.replace(/\s/g, "_");
    
    var new_ent = template_base.replace(/\${(\w+)}/g, (match, string, offset) => {
	var id = string.toLowerCase();
	return this_seed[id];
    });

    var temp_obj = JSON.parse(new_ent);
    
    fs.writeFileSync( "plants/"+this_seed.filename+"_plant.json", JSON.stringify( temp_obj, null, 4 ) );
}

