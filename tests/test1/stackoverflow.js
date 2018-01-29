class cExample
{  

   // ********************************************************************* 
   // Initialize the index
	// ********************************************************************* 
	static init_index() {
		cExample.index = 0;
	}	
	
	// ********************************************************************* 
   // Bump the index and return it
   // ********************************************************************* 
	static () {
		return cExample.index;
	}	
	
}


example.init();

example = new cExample();
console.log(example.index());
	
example = new cExample();
console.log(example.index());
	
example = new cExample();
console.log(example.index());
	
