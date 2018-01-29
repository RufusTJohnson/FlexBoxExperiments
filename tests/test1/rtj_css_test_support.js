/**
 * CSS Tester Support Classes
 *
 * Text manipulation classes for inecting css into html files to test CSS features.
 *
 * @filename   rtj_css_test_support.js
 * @date         21 January 2018
 * @category   tbd
 * @package    tbd
 * @author     Rufus T Johnson
 * @copyright  1997-2005 The PHP Group
 * @license    MIT License
 * @version    tbd
 * @link       tbd
 */
 

/**
 * Class to do stylized logging for HTML or Text.
 *
 * Indent control, banners, multiple crlf.
 *
 * @since x.x.x
 */
class rtj_Logger
{

   // ********************************************************************* 
   // Constructor
   // ********************************************************************* 
   constructor() 
   {
      // ********************************************************************* 
      // Text contained in this class
      // ********************************************************************* 
      this.txt = "";
      // ********************************************************************* 
      // Line Termination Character
      // ********************************************************************* 
      this.lineTerm= "\r\n";
      // ********************************************************************* 
      // Space Character
      // ********************************************************************* 
      this.spaceChar= " ";
      // ********************************************************************* 
      // Indent Level
      // ********************************************************************* 
      this.indentLevel = 0;
      // ********************************************************************* 
      // Spaces to indent per Indent Level
      // ********************************************************************* 
      this.indentSpaces = 3;
   }      
      
      
      
   // ********************************************************************* 
   // Set up for HTML display
    // ********************************************************************* 
    html_setup()
    {
      this.lineTerm      = "<br/>";
      this.spaceChar   = "&nbsp;";     
    }

   // ********************************************************************* 
   // Set up to Write to a Text File
    // ********************************************************************* 
    text_setup()
    {    
      this.lineTerm      = "\r\n";
      this.spaceChar   = " ";      
    }

    // ********************************************************************* 
   // Create indent string
    // ********************************************************************* 
    indentString()
    {
      return (this.spaceChar).repeat(this.indentSize());
    }
   
    // ********************************************************************* 
   // Create indent string
    // ********************************************************************* 
    indentSize()
    {
      return(this.indentSpaces*this.indentLevel);
    }
   
    // ********************************************************************* 
   // increase the indent level
    // ********************************************************************* 
    incLevel()
    {
      this.indentLevel++;
    }
   
    // ********************************************************************* 
   // decrease the indent level
    // ********************************************************************* 
    decLevel()
    {
      if (this.indentLevel>0) this.indentLevel--;
    }
   
   // ********************************************************************* 
   // multiple carriage returns
    // ********************************************************************* 
    cr(number_of_cr=1)
    {
      return (this.lineTerm).repeat(number_of_cr);
    }

   
   // ********************************************************************
   // Append
   // ********************************************************************
   append(str)
   {
      this.txt = this.txt.str;  
   }
   
   // ********************************************************************
   // AppendCR
   // ********************************************************************
   appendCR(str="")
   {
      this.txt = this.txt.str.this.lineTerm; 
   }
   
   // ********************************************************************
   // Append Indent
   // ********************************************************************
   appendIndent(str="")
   {
      this.txt =  this.txt.this.indentString().str;  
   }
   
   // ********************************************************************
   // Append Indent CR
   // ********************************************************************
   appendIndentCR(str="",cr_after=1,cr_before=0)
   {
      this.txt +=  this.cr(cr_before)+this.indentString()+str+this.cr(cr_after);
   }   
   
   
   // ********************************************************************
   // Append Indent CR THE CALLING FUNCTION
   // ********************************************************************
   appendIndentCR_THIS_FUNCTION(str="",cr_after=1,cr_before=0)
   {
      //vDebug = debug_backtrace();
      //callingFunction = vDebug[1]['function']."()";
      this.txt +=  this.cr(cr_before)+this.indentString()+"Enter Function:"+callingFunction.str+this.cr(cr_after);
   }   
   

   // ********************************************************************
   // Banner
   // ********************************************************************
   banner(banner_text)
   {
      var banner =  this.lineTerm+"*".repeat(80)+this.lineTerm+"* "+banner_text+this.lineTerm+"*".repeat(80)+this.lineTerm;
      this.txt+=banner;   
   }   

   // ********************************************************************
   // Indented Banner
   // ********************************************************************
   indentedBanner(banner_text)
   {
      iVal    = this.indentSize();
      frame    = "// "+"*".repeat(80-iVal-3);

      this.appendIndentCR(frame );
      this.appendIndentCR("// "+banner_text);
      this.appendIndentCR(frame );
   }   
   
   // ********************************************************************
   // Append all text to file
   // ********************************************************************
   appendToFile(filename)
   {
      //fh = fopen(filename, 'a') or die("can't open file");
      //fwrite(fh, this.txt);
      //fclose(fh);
   }
      
      

   // Getter
   get area() {
      return this.calcArea();
   }
   // Method
   calcArea() {
      return this.height * this.width;
   }
}


// ************************************************************************* 
// CSS Class Generator
// *************************************************************************
class rtj_CSS
{    
   // ********************************************************************* 
   // Constructor
   // ********************************************************************* 
   constructor(selector="") 
   {    
      this.selector          = selector;
      this.declarations    = new Object();
   }
   
   // ********************************************************************* 
   // Add declaration
   // ********************************************************************* 
   addDeclaration(property,value)
   {    
      this.declarations[property] = value;
   }
   
   // ********************************************************************* 
   // Add declarations
   // ********************************************************************* 
   addDeclarations(declarations)
   {    
      Object.entries(declarations).forEach(([property, value]) => {
         this.addDeclaration(property,value);
      });
   }
   
   // ********************************************************************* 
   // Get the text of the CSS Class
   // ********************************************************************* 
   get()
   {
      var rule = this.selector+" {"+"\r\n"   ;
      
      Object.entries(this.declarations).forEach(([property, value]) => {
         rule = rule+"   "+property+": "+value+";\r\n" ;
      });
      
      rule = rule+"}"+"\r\n" ;
      
      return rule;
   }
}    




// ************************************************************************* 
// HTML and CSS Code Edit Support
// *************************************************************************
class rtj_Code_edit
{  
   // ********************************************************************* 
   // Constructor
   // ********************************************************************* 
   constructor() 
   {    
      //this.section          =    document.querySelector('section');
      this.editable         =    document.querySelector('.editable');
      //this.textareaHTML     =    document.querySelector('#code_edit_1');
      //this.textareaCSS      =    document.querySelector('#css_edit_1');
      this.reset            =    document.getElementById('reset');
      //this.htmlCode         =    this.textareaHTML.value;
      //this.cssCode          =    this.textareaCSS.value;
      this.example_index    =    rtj_Code_edit.get_example_index();
      
      this.reset.addEventListener('click', function () {
         this.textareaHTML.value   = this.htmlCode;
         this.textareaCSS.value    = this.cssCode;
         this.fillCode();
      }.bind(this));
      
		this.create_container_tags();
		
		this.textareaHTML.addEventListener('input', (this.fillCode).bind(this));
      this.textareaCSS.addEventListener('input', (this.fillCode).bind(this));
      window.addEventListener('load', (this.fillCode).bind(this));
   }
  
   // ********************************************************************* 
   // Transcribe Edited Code to actual HTML abd CSS
   // ********************************************************************* 
   fillCode() {
      this.style.innerHTML    = this.textareaCSS.value;
      this.HTML.innerHTML     = this.textareaHTML.value;
   }
   
   // ********************************************************************* 
   // Add Editable Style and HTML textareas to:
   //
   // <div id="rtj_multiple_edited_examples"></div>
   //
   // ********************************************************************* 
   create_editable_textareas() {
      var examples 				= 	document.querySelector('#rtj_multiple_edited_examples');
		var content_id				=	"rtj_content_"+this.example_index;
		var css_text_area_id		=	"rtj_css_edit_"+this.example_index;
		var code_text_area_id	=	"rtj_code_edit_"+this.example_index;
		
		
		var content		=	 "<section id=\""+content_id+"\" class=\"rtj_content\">HOLMES</section>"
								+"<textarea id=\""+css_text_area_id+"\" class=\"playable-css\"></textarea>\n"
								+"<textarea id=\""+code_text_area_id+"\" class=\"playable-html\"></textarea>";
		examples.insertAdjacentHTML('beforeend',content);
		
      this.HTML     				=    document.querySelector('#'+content_id);
      this.textareaHTML     	=    document.querySelector('#'+code_text_area_id);
      this.textareaCSS      	=    document.querySelector('#'+css_text_area_id);		
		
   }

   // ********************************************************************* 
   // Add Editable Style and HTML textareas to:
   //
   // <style id="rtj_example_n_style"></style>
	//
	// Where n is the index of the example.
   //
   // ********************************************************************* 
   create_example_style_tag() {
      var head		 	= document.querySelector("head");
		var content		=	 "<style id=\"rtj_example_"+this.example_index+"_style\"></style>\n"
		head.insertAdjacentHTML('beforeend',content);
		this.style 		= document.querySelector("#rtj_example_"+this.example_index+"_style");
   }

   // ********************************************************************* 
   // Create Tags for Editing HTML and CSS and displaying the result
   // ********************************************************************* 
   create_container_tags() {
		this.create_editable_textareas();
		this.create_example_style_tag();
   }



   // ********************************************************************* 
   // Add HTML to rtj_code_edit_n
   // ********************************************************************* 
   add_editable_html(content) {
      var code_edit_area	= document.querySelector("#rtj_code_edit_"+this.example_index);
		code_edit_area.insertAdjacentHTML('beforeend',content);
		code_edit_area.style.height = 'auto';
      code_edit_area.style.height = code_edit_area.scrollHeight+'px';
		//alert(code_edit_area.scrollHeight);
   }
	
	
	
   // ********************************************************************* 
   // Add HTML to rtj_code_edit_n
   // ********************************************************************* 
   add_editable_css(content) {
      var css_edit_area	= document.querySelector("#rtj_css_edit_"+this.example_index);
		css_edit_area.insertAdjacentHTML('beforeend',content);
		css_edit_area.style.height = 'auto';
      css_edit_area.style.height = css_edit_area.scrollHeight+'px';
		//alert(css_edit_area.scrollHeight);
   }

	

   // ********************************************************************* 
   // Initialize the Example Index
   // ********************************************************************* 
	static init() {
		rtj_Code_edit.ExampleIndex = 0;
	}	
	
	// ********************************************************************* 
   // Bump the ExampleIndex and return it
   // ********************************************************************* 
	static get_example_index() {
		return ++rtj_Code_edit.ExampleIndex;
	}	
	
}


// *****************************************************************************
// Test 1
// *****************************************************************************
function test1()
{
   var logger = new rtj_Logger(10, 10);
   logger.incLevel();
   logger.appendIndentCR("moo");
   logger.decLevel();
   logger.appendIndentCR("moo");
   logger.appendIndentCR("moo");
   logger.appendIndentCR("moo");
   logger.banner("Happy Days");
   console.log(logger.txt);
}

// *****************************************************************************
// Test 2
// *****************************************************************************
function test2()
{
   const obj = { a: 5, b: 7, c: 9 };
   Object.entries(obj).forEach(([key, value]) => {
   console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
   });
}

// *****************************************************************************
// Test 3
// *****************************************************************************
function test3()
{
   var css = new rtj_CSS("Sammo");
   css.addDeclaration("color","red");
   css.addDeclarations( {"font":"helvetica","padding":"10px"});
   console.log(css.get());
}
//test3();

// *****************************************************************************
// Test 4
// *****************************************************************************
function test4()
{
	rtj_Code_edit.init();

	// patterned on this https://www.w3schools.com/css/tryit.asp?filename=trycss3_flexbox
   var code_edit 	= new rtj_Code_edit();
	var html			=	 '<div class="box flex-container">\n'
							+'   <div>One</div>\n'
							+'   <div>Two</div>\n'
							+'   <div>Three</div>\n'
							+'</div>';
	code_edit.add_editable_html(html);
	
	var css = new rtj_CSS("#rtj_content_"+code_edit.example_index+" .flex-container");
   css.addDeclaration("display","flex");
   css.addDeclarations({"display":"flex","background-color":"DodgerBlue"});
   var css_text = css.get();
	code_edit.add_editable_css(css_text);
	
	
	
	// patterned on this https://www.w3schools.com/css/tryit.asp?filename=trycss3_flexbox
   var code_edit 	= new rtj_Code_edit();
	var html			=	 '<div class="box flex-container">\n'
							+'   <div>One</div>\n'
							+'   <div>Two</div>\n'
							+'   <div>Three</div>\n'
							+'</div>';
	code_edit.add_editable_html(html);
	
	var css = new rtj_CSS("#rtj_content_"+code_edit.example_index+" .flex-container");
   css.addDeclaration("display","flex");
   css.addDeclarations({"display":"flex","background-color":"DodgerBlue"});
   var css_text = css.get();
	code_edit.add_editable_css(css_text);

   

   
	var code_edit = new rtj_Code_edit();
	
	var code_edit = new rtj_Code_edit();
	
}
test4();
