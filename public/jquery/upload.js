window.onload = function(){
    function LoadImage(filesInput, output){
            
            filesInput.addEventListener("change", function(event){ 
                var files = event.target.files; //FileList object
                for(var i = 0; i< files.length; i++)
                {
                    var file = files[i];
                    //Only pics
                    if(!file.type.match('image'))
                      continue;
                    var picReader = new FileReader();
                    
                    picReader.addEventListener("load",function(event){
                        
                        var picFile = event.target;
                        
                        output.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
                                "title='" + picFile.name + "'/>";
                    });
                    
                     //Read the image
                    picReader.readAsDataURL(file);
                }                         
            });
    }
    
    //Check File API support
    if(window.File && window.FileList && window.FileReader)
    {
        var filesInput_1 = document.getElementById("files1");        
        var output1 = document.getElementById("result1");
        LoadImage(filesInput_1,output1);

        var filesInput_2 = document.getElementById("files2");
        var output2 = document.getElementById("result2");
        LoadImage(filesInput_2,output2);

        var filesInput_3 = document.getElementById("files3");
        var output3 = document.getElementById("result3");
        LoadImage(filesInput_3,output3);
    }
    else
    {
        console.log("Your browser does not support File API");
    }
}
    