
// Al hacer click en el botón de enviar tendrá que llamar a la la función validar 
// que se encargará de validar el formulario.
document.getElementById("idEnviar").addEventListener('click', validar, false);
let formulario=document.forms["idFormulario"]

/****************************************************************
 * FUNCIÓN GENERAL DE VALIDACIÓN
 * Unificar los dos tipos de validación
 *          - Mediante JS
 *          - Mediante Api de acceso a validación de html
 ****************************************************************/
function validar(e){
   // IMPORTANTE!!! Realizar limpieza del formulario, a nivel de ClassName
  
   for (let i=0; i< formulario.elements.length; i++){
       formulario.elements[i].className="";
   }
   // IMPORTANTE!!! Realizar limpieza del formulario, a nivel de Spam de error
   document.querySelectorAll(".errorSpam").forEach(e=>e.innerHTML="")
  
    if(validarAPIHTML(e) && validarJS(e) && confirm("¿Deseas enviar el formulario?")){

        return true;
    }else{
        e.preventDefault();
         // IMPORTANTE!!! Deshabilitamos el botón
        this.disabled = false;
        return false  
    }
}


/********************************************************************************************
 *******************************************************************************************
 *************** FUNCIÓN PARA VALIDAR DE FORMA MANUAL MEDIANTE JAVASCRIPT
 *******************************************************************************************
 *******************************************************************************************/
function validarJS(eventopordefecto) {
    
    // Validamos cada uno de los apartados con llamadas a sus funciones correspondientes.
    return validarNombre() && validarEdad() && validarMatricula() && validarProvincia();             
}
/****************************************************************************
 * FUNCIÓN INDIVIDUALES DE CADA CAMPO
 /***************************************************************************/

function validarNombre() {
    let inputNombre= formulario.elements["idNombre"]

    if (inputNombre.value == ""){        
        formulario.elements["idNombre"].className = "error";
        formulario.elements["idNombre"].focus();
        document.getElementById('idNombreError').innerHTML="El campo: " + formulario.elements["idNombre"].name + " no puede estar en blanco"
        return false
    }
    return true
}

/***************************************************************************/
/***************************************************************************/

function validarEdad() {
 
    let inputEdad=formulario.elements["idEdad"]
    
    // IMPORTANTE!! Realizar la validación de la edad mediante javascript.
    if (inputEdad.value == ""){        
        formulario.elements["idEdad"].className = "error";
        formulario.elements["idEdad"].focus();
        document.getElementById('idEdadError').innerHTML="El campo: " + formulario.elements["idEdad"].name + " no puede estar en blanco"
        
        return false
    } else if ((inputEdad.value<0) || (inputEdad.value>100)) {
        
        formulario.elements["idEdad"].className = "error";
        formulario.elements["idEdad"].focus();
        document.getElementById('idEdadError').innerHTML="El campo: " + formulario.elements["idEdad"].name + " tiene que estar comprendido entre 0 y 100"
        return false
    }
    return true;
}
  
/***************************************************************************/
/***************************************************************************/

function validarMatricula() {
    
    let inputMatricula=formulario.elements["idMatricula"].value
    // IMPORTANTE!! Realizar la validación de la matrícula mediante javascript y utilizando expresiones regulares
   
    //Creamos la expresión regular del pattern
    let regExp = /^\d{4}\s[A-Z]{3}$/;
    
    if(inputMatricula==""){
        formulario.elements["idMatricula"].className = "error";
        formulario.elements["idMatricula"].focus();
        document.getElementById('idMatriculaError').innerHTML="El campo: " + formulario.elements["idMatricula"].name + " no puede estar en blanco"
        return false;
    }else if(regExp.test(inputMatricula)==false){
        formulario.elements["idMatricula"].className = "error";
        formulario.elements["idMatricula"].focus();
        document.getElementById('idMatriculaError').innerHTML="El campo: " + formulario.elements["idMatricula"].name + " no es correcto"
        return false;
    }
    return true;
}

/***************************************************************************/
/***************************************************************************/

function validarProvincia() {
    let selectProvincia=formulario.elements["idProvincia"]
    const valoresProvincia = new Set(["Gr","Ma"]);
   if (selectProvincia.value!="Ma" && selectProvincia.value!="Gr"){  
        formulario.elements["idProvincia"].className = "error";
        formulario.elements["idProvincia"].focus();
        document.getElementById('idProvinciaError').innerHTML="El campo: " + formulario.elements["idProvincia"].name + " no es correcto"
        return false;
    }
    return true;
}

/********************************************************************************************
 *********************************************************************************************
 ******** FUNCIÓN PARA VALIDAR, MEDIANTE EL USO DE LA API DE ACCESO A LA VALIDACIÓN DE HTML 
 *******************************************************************************************
 ********************************************************************************************/

function validarAPIHTML(eventopordefecto) {   
    //checkvalidity
    // Validamos cada uno de los apartados con llamadas a sus funciones correspondientes.
    return validarNombreHTML() && validarEdadHTML() && validarMatriculaHTML() && validarProvinciaHTML();             
}
/****************************************************************************
 * FUNCIÓN INDIVIDUALES DE CADA CAMPO
 /***************************************************************************/
    let nombre=formulario.elements["idNombre"];
    
    //Comprobar nombre
    function validarNombreHTML() {
        if(nombre.validity.valueMissing){    
            nombre.setCustomValidity("Debes poner algo en el campo"); 
            idNombreError.innerHTML = nombre.validationMessage;
            return false;
        }else if(nombre.validity.typeMismatch){
            nombre.setCustomValidity("Nombre inválido");
            idNombreError.innerHTML = nombre.validationMessage;
            return false;
        }else if(nombre.validity.patternMismatch){
            nombre.setCustomValidity("Patrón invalido");
            idNombreError.innerHTML = nombre.validationMessage;
            return false;
        }
        return true;
    }

   let edad=formulario.elements["idEdad"];
    //Comprobar edad
    function validarEdadHTML() {
        if(edad.validity.typeMismatch){
            edad.setCustomValidity("Edad inválida");
            idEdadError.innerHTML = edad.validationMessage;
            return false;
        }
        return true;
    }

   
    //Comprobar matricula
    function validarMatriculaHTML(){
        let matricula=formulario.elements["idMatricula"];
        let idMatricula=formulario.elements["idMatriculaError"]
        //Creamos la expresión regular del pattern
        let regExp = /^\d{4}\s[A-Z]{3}$/;
        
        if(regExp.test(matricula.value)==false){
            matricula.setCustomValidity("Matrícula erronea");
            idMatriculaError.innerHTML = matricula.validationMessage;
            return false;
        }
        return true;
    }
    //No se puede validar desde HTML
    let provincia=formulario.elements["idProvincia"]
    //Comprobar provincia
    function validarProvinciaHTML() {
        /*if (provincia.validity.patternMismatch){
            provincia.setCustomValidity("Patrón invalido");
            idProvinciaError.innerHTML = provincia.validationMessage;
            return false;
        }*/
        return true;
    }
