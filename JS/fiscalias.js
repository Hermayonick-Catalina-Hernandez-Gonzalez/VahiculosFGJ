$(document).ready(function() {
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

    $("#fiscalia_general").autocomplete({ source: fiscalias });
    $("#fiscalia_especializada").autocomplete({ source: especializadas });
    $("#vicefiscalia").autocomplete({ source: vicefiscalias });
    $("#direccion_general").autocomplete({ source: direcciones });
    $("#departamento_area").autocomplete({ source: departamentos });
});