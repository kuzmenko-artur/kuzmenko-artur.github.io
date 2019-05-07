function raschitat() {
print1  = document.getElementById('print1').value;
switch (print1) {
   case "circle":
      cena1 = 0;
      break
   case "rectangle":
      cena1 = 0;
      break   
   case "square":
      cena1 = 0;
      break
   case "triangle":
      cena1 = 0;
      break 
   default:
      cena1 = 0;
      break 
}
print2  = document.getElementById('print2').value;
switch (print2) {
   case "fast_1":
      cena2 = 400;
      break
   case "normal_1":
      cena2 = 0;
      break   
   default:
      cena2 = 0;
      break
}
print3  = document.getElementById('print3').value;
switch (print3) {
   case "delivery_1":
      cena3 = 350;
      break
   case "pickup_1":
      cena3 = 0;
      break   
   default:
      cena3 = 0;
      break
}
print4  = document.getElementById('print4').value;
switch (print4) {
   case "rubber_1":
      cena4 = 0;
      break
   case "polymer_1":
      cena4 = 0;
      break   
   default:
      cena4 = 0;
      break
}
print5  = document.getElementById('print5').value;
switch (print5) {
   case "simple_1":
      cena5 = 400;
      break
   case "automatic_1":
      cena5 = 750;
      break  
   case "metal_1":
      cena5 = 1600;
      break 
   case "pocket_1":
      cena5 = 800;
      break  
   default:
      cena5 = 0;
      break
}
{
stoimost = cena1+cena2+cena3+cena4+cena5;
document.getElementById('stoimost').innerHTML = stoimost +"Р";
}
}



function raschitat2() {
print3_2  = document.getElementById('print3_2').value;
switch (print3_2) {
   case "fast_2":
      cena2 = 400;
      break
   case "normal_2":
      cena2 = 0;
      break   
   default:
      cena2 = 0;
      break
}
print4_2  = document.getElementById('print4_2').value;
switch (print4_2) {
   case "delivery_2":
      cena3 = 350;
      break
   case "pickup_2":
      cena3 = 0;
      break   
   default:
      cena3 = 0;
      break
}
print5_2  = document.getElementById('print5_2').value;
switch (print5_2) {
   case "rubber_2":
      cena4 = 0;
      break
   case "polymer_2":
      cena4 = 0;
      break   
   default:
      cena4 = 0;
      break
}
print6_2  = document.getElementById('print6_2').value;
switch (print6_2) {
   case "simple_2":
      cena5 = 400;
      break
   case "automatic_2":
      cena5 = 750;
      break  
   case "metal_2":
      cena5 = 1600;
      break 
   case "pocket_2":
      cena5 = 800;
      break  
   default:
      cena5 = 0;
      break
}
shirina  = document.getElementById('shirina').value;
visota  = document.getElementById('visota').value;
if(shirina == ""){
alert("Вы не указали ширину");
} else if(visota == ""){
alert("Вы не указали высоту");
} else {
ploschad = parseFloat (shirina)* parseFloat (visota);
stoimost2 = ploschad*0.6+cena2+cena3+cena4+cena5;
stoimost2 = stoimost2.toFixed(0);
document.getElementById('stoimost2').innerHTML = stoimost2 +"Р";
}
}



$(document).ready(function(){
   $('#print6_2').change(function(){
      $('#selmimg').find('img:first').attr('src', $('#print6_2 option:selected').attr('data-path'));
   });
});
$(document).ready(function(){
   $('#print5').change(function(){
      $('#selmimg2').find('img:first').attr('src', $('#print5 option:selected').attr('data-path'));
   });
});