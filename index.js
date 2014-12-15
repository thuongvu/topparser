

	function parseLine(_result,_name,_line){
		var line=_line.split(":")[1].replace(RegExp(" ","g"),"")
			_result[_name]={}
			var line_items=line.split(",")

			for(var i=0,item=line_items[i];i<line_items.length;item=line_items[++i]){
				var value=parseFloat(item)
				if(value==0&&item.indexOf(".")!=-1){value="0.0"}
				var name=item.replace(value,"")
				_result[_name][name]=parseFloat(value)
			}//for
	}//parseLine

	function parseProces(_result,_line){
		var items=_line.split(",")
		var process={
				pid:items[0],
				user:items[1],
				pr:items[2],
				ni:items[3],
				virt:items[4],
				res:items[5],
				shr:items[6],
				s:items[7],
				cpu:items[8],
				mem:items[9],
				time:items[10],
				command:items[11]
		}
		_result.process.push(process)
	}//parseProces

	function parse(data){
		if(!data){return}
		var result={process:[]}
		var data_line=data.split("\n")
	//sys info
	//parseLine("top",data_line[0])
	parseLine(result,"task",data_line[1])
	parseLine(result,"cpu",data_line[2])
	parseLine(result,"ram",data_line[3])
	parseLine(result,"swap",data_line[4].replace("free.","free,"))	

	//process
	for(var i=7,item=data_line[i];i<data_line.length-1;item=data_line[++i]){
		var line=item.replace(/\s{1,}/g, ',').substring(1)
			if(line!=""){
				parseProces(result,line)
			}//if
				}//for process

	return result
	}//parse


exports.parse=parse;
