$(document).ready(function () {
    let fiscalias = [
        "Fiscalía General de Justicia",
        "Fiscalía Anticorrupción",
        "Fiscalía de Derechos Humanos",
        "Fiscalía de Delitos de Alto Impacto"
    ];

    let especializadas = [
        "Fiscalía Especializada en Delitos Ambientales",
        "Fiscalía Especializada en Desaparición Forzada",
        "Fiscalía Especializada en Trata de Personas"
    ];

    let vicefiscalias = [
        "Vicefiscalía de Control de Procesos",
        "Vicefiscalía de Investigación Criminal",
        "Vicefiscalía de Derechos Humanos"
    ];

    let direcciones = [
        "Dirección General de Investigación",
        "Dirección General de Periciales",
        "Dirección General de Control de Procesos"
    ];

    let departamentos = [
        "Departamento de Análisis Criminal",
        "Departamento de Atención a Víctimas",
        "Departamento de Servicios Periciales"
    ];

    // Función para inicializar autocomplete con almacenamiento en localStorage
    function setupAutocomplete(selector, dataList) {
        $(selector).autocomplete({
            source: dataList,
            select: function (event, ui) {
                localStorage.setItem(selector, ui.item.value);
            }
        });

        // Cargar datos guardados en localStorage al inicio
        let savedValue = localStorage.getItem(selector);
        if (savedValue) {
            $(selector).val(savedValue);
        }

        // Guardar en localStorage cuando el usuario escriba
        $(selector).on("input", function () {
            localStorage.setItem(selector, $(this).val());
        });
    }

    // Inicializar autocompletes con almacenamiento
    setupAutocomplete("#fiscalia_general", fiscalias);
    setupAutocomplete("#fiscalia_especializada", especializadas);
    setupAutocomplete("#vicefiscalia", vicefiscalias);
    setupAutocomplete("#direccion_general", direcciones);
    setupAutocomplete("#departamento_area", departamentos);
});

$(document).ready(function () {
    let municipiosTamaulipas = [
        "Abasolo", "Aldama", "Altamira", "Antiguo Morelos", "Burgos", "Bustamante", "Camargo",
        "Casas", "Ciudad Madero", "Cruillas", "Gómez Farías", "González", "Güémez",
        "Guerrero", "Gustavo Díaz Ordaz", "Hidalgo", "Jaumave", "Jiménez", "Llera",
        "Mainero", "El Mante", "Matamoros", "Méndez", "Mier", "Miguel Alemán",
        "Miquihuana", "Nuevo Laredo", "Nuevo Morelos", "Ocampo", "Padilla", "Palmillas",
        "Reynosa", "Río Bravo", "San Carlos", "San Fernando", "San Nicolás", "Soto la Marina",
        "Tampico", "Tula", "Valle Hermoso", "Victoria", "Villagrán", "Xicoténcatl"
    ];

    // Autocompletar municipios
    $("#municipio").autocomplete({
        source: municipiosTamaulipas,
        select: function (event, ui) {
            localStorage.setItem("municipio", ui.item.value);
        }
    });

    // Restaurar el valor guardado en localStorage al recargar la página
    let savedMunicipio = localStorage.getItem("municipio");
    if (savedMunicipio) {
        $("#municipio").val(savedMunicipio);
    }

    // Guardar en localStorage cuando el usuario escriba
    $("#municipio").on("input", function () {
        localStorage.setItem("municipio", $(this).val());
    });
});
