//JAVA SCRIPT HECHO POR DANIELA & TATIANA//
document.getElementById ("valor1").addEventListener("mouseover",function () { 
    document.getElementById ("respuesta1").innerHTML= "<strong> Impacto Social: </strong> Nuestra plataforma busca impactar visibilizando el TEA, educando a personas neurotípicas y ofreciendo productos accesibles para cualquier usuario involucrado con el TEA, promoviendo comprensión e inclusión."
})
document.getElementById ("valor2").addEventListener("mouseover",function () {
    document.getElementById ("respuesta2").innerHTML= " <strong> Desarrollo del Comercio Igualitario: </strong> Creemos que la oportunidad del actual mercado se basa en la igualdad y en que todo el mundo se sienta bienvenido a comprar productos para cumplir con sus deseos y necesidades."

})
document.getElementById ("valor3").addEventListener("mouseover",function () {
    document.getElementById ("respuesta3").innerHTML= "<strong> Accesibilidad: </strong>Nos aseguramos de que la interfaz sea amigable e intuitiva para todos, sin barreras tecnológicas y sensoriales. Adaptando la tecnología al usuario y no permitiendo que sea al revés."
})  
document.getElementById ("valor4").addEventListener("mouseover",function () {
    document.getElementById ("respuesta4").innerHTML= "<strong> Inclusión: </strong>Permitimos un espacio y una plataforma segura para las personas dentro del espectro autista. Diseñada especialmente para ser amigable con la mente y personalidad autista."
})

document.getElementById("valor1").addEventListener("mouseout", function () {
        document.getElementById("respuesta1").textContent = "";
    });
    document.getElementById("valor2").addEventListener("mouseout", function () {
        document.getElementById("respuesta2").textContent = "";
    });
    document.getElementById("valor3").addEventListener("mouseout", function () {
        document.getElementById("respuesta3").textContent = "";
    });
    document.getElementById("valor4").addEventListener("mouseout", function () {
        document.getElementById("respuesta4").textContent = ""; 
    });
