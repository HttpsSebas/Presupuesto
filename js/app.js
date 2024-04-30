const ingresos = [

];

const egresos = [

];

let cargarApp =()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
};


let totalIngresos = ()=>{
    let totalIngresos = 0;

    for(let ingreso of ingresos){
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
};


let totalEgresos = ()=>{
    let totalEgresos = 0;

    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
};



let cargarCabecero =()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalIngresos()/totalEgresos();
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
        document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
        document.getElementById("ingreso").innerHTML = formatoMoneda(totalIngresos());
        document.getElementById("egreso").innerHTML = formatoMoneda(totalEgresos());
};



const formatoMoneda = (valor)=>{
    return valor.toLocaleString("en-US",{style: "currency", currency:"USD", minimumFractionDigits:2});
};

const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString("en-US",{style:"percent", minimumFractionDigits:2});
};


let cargarIngresos = ()=>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresosHTML(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresosHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                               onclick="eliminarIngreso(${ingreso.id})" ></ion-icon>
                            </button>
                        </div>
                    </div>
    </div>
    `;
    return ingresoHTML;
};

const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);

    ingresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarIngresos();
}

let cargarEgresos = ()=>{
    let egresosHTML = '';

    for(let egreso of egresos){
        egresosHTML += crearEgresosHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML; 
};

const crearEgresosHTML = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">+ ${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                               onclick="eliminarEgreso(${egreso.id})" ></ion-icon>
                            </button>
                        </div>
                    </div>
    </div>
    `;
    return egresoHTML;
};

const eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);

    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}


let agregarDato = ()=>{
    const forma = document.forms["forma"];
    const descripcion = forma["descripcion"];
    const valor = forma["valor"];
    const tipo = forma["tipo"];

    if(descripcion.value !== '' && valor.value !== '' && valor.value > 0){
        if(tipo.value === "ingreso"){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === "egreso"){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}