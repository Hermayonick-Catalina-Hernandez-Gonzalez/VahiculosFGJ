function final() {
    Swal.fire({
        icon: 'success',
        title: '¡Se ha Guardado Exitosamente!',
        timer: 1500,
        showConfirmButton: false,
        backdrop: false
    }).then(() => {
        window.location.href = '../../vistas/formulario/pdfs.html';
    });
}
function generarPDF() {
    const { jsPDF } = window.jspdf;

    const img = new Image();
    img.src = '../img/Logo.png';
    img.src = '../../img/Logo.png';

    img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL('image/png'); // Convertir la imagen a base64

        // Generar URLs de los PDFs
        const pdf1 = generarPDF1(imgData);
        const pdf2 = generarPDF2(imgData);

        // Mostrar en iframes dentro de la página
        document.getElementById("preview1").src = pdf1;
        document.getElementById("preview2").src = pdf2;

    };
}
function generarPDF1(imgData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [612, 1200]
    });

    doc.addImage(imgData, 'PNG', 40, 30, 80, 40);

    doc.setFontSize(12);
    doc.setTextColor(255, 0, 0);
    doc.text("N° 0342", 500, 70);

    // Restablecer color a negro para el resto del documento
    doc.setTextColor(0, 0, 0);

    // **Tabla de información del vehículo**
    doc.autoTable({
        startY: 80,
        head: [["MARCA", "SUBMARCA", "SERIE", "MODELO", "PLACA", "N° ECO"]],
        body: [
            ["Toyota", "Corolla", "3XXAAB", "2022", "ABC-123", "0218"],
            [{ content: "AREA", styles: { textColor: [255, 255, 255], fontStyle: "bold" } },
            { content: " ", colSpan: 5, styles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], halign: "center" } }]
        ],
        theme: "grid",
        styles: {
            fontSize: 10,
            cellPadding: 5,
            halign: "center",
            fillColor: [26, 35, 65],
            textColor: [0, 0, 0]
        },
        headStyles: {
            fillColor: [26, 35, 65],
            textColor: [255, 255, 255]
        },
        alternateRowStyles: {
            fillColor: [240, 240, 240]
        }
    });

    let y = doc.autoTable.previous.finalY + 20;

    // **Lista de reglas**
    const reglas = [
        "1.- Las unidades deberán ser conducidas por servidores públicos que conozcan el Reglamento de Tránsito en vigor y cuenten con licencia para conducir vigente y credencial institucional de la FGJET.",
        "2.- El usuario es responsable de mantener la unidad en perfectas condiciones de uso, por lo que deberá cumplir con los programas de revisión y mantenimiento preventivo y/o correctivo, según se mencione en la póliza de garantía del vehículo.",
        "3.- El usuario no deberá transferir la unidad a otro usuario sin previo aviso por escrito a la Dirección de Recursos Materiales y Servicios, para que se genere un nuevo formato de resguardo vehicular",
        "4.- El usuario no podrá realizar cambios en las características físicas de la unidad.",
        "5.- El vehículo no se destinará para uso distinto del entregado, ni podrá subarrendar ni prestarlo; de lo contrario, el usuario será responsable por los daños y perjuicios que pudieran ocasionarse.",
        "6.- El usuario se obliga a entregar el vehículo en el momento que se requiera por la Dirección de Recursos Materiales y Servicios, entregándose en el mismo contexto y estado físico con el que se recibió (pese al desgaste natural del vehículo), con todos sus accesorios.",
        "7.- El usuario tiene la responsabilidad de carácter administrativo, por cualquier daño y/o faltante ocasionado intencionalmente, por negligencia, mal uso, etc.., de la unidad que tenga Asignada, así como de la documentación, placas, llaves, equipo y accesorios entregados a su cuidado.",
        "8.- Será responsabilidad del El Usuario, una vez que reciba la documentación oficial (tarjeta de circulación, holograma y copia de la póliza de seguro) colocarla en la unidad, a fin de que circule con documentos actualizados.",
        "9.- En caso de colisión o accidente, El usuario sea responsable en cualquiera de las modalidades, este deberá cubrir todos lo daños, multas y demás conceptos derivados que no sean cubiertos por el seguro y deberá reportar de manera inmediata el siniestro a la aseguradora y dar aviso por escrito , en un plazo no mayor de 72 horas a la Dirección General de Administración, para determinar las responsabilidades a las que pudiera ser acreedor, y de igual forma se le dará vista a la Dirección de Recursos Materiales y Servicios.",
        "10.- En caso de colisión o accidente El  Usuario será responsable de la  verificación y situación que guarde con relación a la reparación efectuada a la unidad, debiendo notificar por escrito a la Dirección el estatus de esta.",
        "11.- En caso de robo o incendio parcial o total de la unidad, El Usuario deberá levantar el acta correspondiente ante el ministerio Público y dar aviso a la Dirección General de Administración para los trámites correspondientes .",
        "12.- El Usuario, sin excepciones, está obligado a acudir a cualquier citatorio enviado por la Dirección General de Administración de esta Fiscalía General de Justicia del Estado de Tamaulipas, para realización de aclaraciones y/o revisiones relacionadas con las unidades que tiene asignadas.",
        "13.- El usuario será responsable de administrar y darle buen uso a la tarjeta de combustible asignada al vehículo; así como de comprobar en el tiempo establecido, el gasto de combustible asignado, dicha tarjeta no podrá ser utilizada para otro vehiculo .",
        "Cualquier acto u omisión a lo aquí establecido se regulará conforme a las atribuciones y responsabilidades inherentes al orden jurídico aplicable, la Ley de Responsabilidades Administrativas del Estado de Tamaulipas y el reglamento para el uso y control de vehículos oficiales.",
        "En caso de que se realice un cambio de resguardo, deberá ser informado a la Dirección General de Administración vía oficio y mediante correo electrónico a: actualizar.resguardovehicular@fgjtam.gob.tam en un plazo no mayor a 24 horas. En caso contrario, la responsabilidad por negligencia, mal uso, siniestro y cualquier uso indebido de la unidad oficial recaerá en el último resguardante registrado en esta Dirección General de Administración.",
        "Con fundamento en el artículo 93, fracción I del reglamento de la Ley Orgánica de la Fiscalía General de Justicia del Estado de Tamaulipas, así como en los capítulos segundo (numerales IV, V y VI) y tercero (numerales VII, VIII, IX, X, XI, XII, XIII, XIV, XV y XVI) de los Lineamientos para la asignación, uso y control de vehículos, combustibles y cajones de estacionamiento de la Fiscalía General de Justicia del Estado de Tamaulipas."
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    // Justificar el texto 
    reglas.forEach((texto) => {
        const lines = doc.splitTextToSize(texto, 520);
        lines.forEach((line, index) => {
            const lineY = y + (index * 15);
            doc.text(line, 40, lineY, {
                align: 'justify',
                lineHeightFactor: 1.5,
                maxWidth: 520
            });
        });
        y += lines.length * 15 + 10;
    });

    y += 30;
    doc.setFont("helvetica", "bold");
    doc.text("Firma del Resguardante Interno", doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
    y += 40;
    doc.line(doc.internal.pageSize.getWidth() / 2 - 80, y + 5, doc.internal.pageSize.getWidth() / 2 + 80, y + 5);
    y += 10;
    doc.text("Nombre y Firma", doc.internal.pageSize.getWidth() / 2, y + 12, { align: 'center' });

    return doc.output("bloburl"); // Devuelve la URL para previsualización
}

function generarPDF2(imgData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [612, 1400]
    });

    doc.addImage(imgData, 'PNG', 40, 30, 80, 40);

    // Encabezado
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text("DIRECCIÓN GENERAL DE ADMINISTRACIÓN", 250, 50);
    doc.text("DIRECCIÓN DE RECURSOS MATERIALES Y SERVICIOS", 220, 60);
    doc.text("RESGUARDO VEHICULAR", 290, 70);

    doc.setFontSize(12);
    doc.setTextColor(255, 0, 0);
    doc.text("N° 0342", 500, 74);
    doc.setTextColor(0, 0, 0);

    let y = 100;

    function drawCell(x, y, width, height, text, fillColor = [255, 255, 255]) {
        doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
        doc.rect(x, y, width, height, 'F'); // Relleno
        doc.rect(x, y, width, height); // Borde
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text(text, x + 5, y + 13);
    }

    // Datos generales 
    drawCell(40, y, 80, 20, "FECHA:", [220, 220, 220]);
    drawCell(120, y, 100, 20, "");
    drawCell(220, y, 90, 20, "MUNICIPIO:", [220, 220, 220]);
    drawCell(300, y, 120, 20, "");
    drawCell(400, y, 80, 20, "FGJRM:", [220, 220, 220]);
    drawCell(480, y, 90, 20, "");
    y += 30;


    let fields = [
        "RESGUARDANTE:", "CARGO:", "LICENCIA:", "VIGENCIA:", "FISCALÍA GENERAL:",
        "FISCALÍA ESPECIALIZADA EN:", "VICEFISCALÍA EN:", "DIRECCIÓN GENERAL:", "DEPARTAMENTO/ÁREA:"
    ];
    fields.forEach(label => {
        drawCell(40, y, 160, 20, "");
        drawCell(200, y, 370, 20, "");
        let textX = 40 + 160 - 5;
        doc.text(label, textX, y + 14, { align: "right" });

        y += 20;
    });
    y += 10;

    let internalFields = ["RESGUARDANTE INTERNO:", "CARGO:", "LICENCIA:", "VIGENCIA:", "NÚMERO EMPLEADO:", "CELULAR:"];
    internalFields.forEach(label => {
        drawCell(40, y, 160, 20, "");
        drawCell(200, y, 370, 20, "");

        let textX = 40 + 160 - 5;
        doc.text(label, textX, y + 14, { align: "right" });
        y += 20;
    });
    y += 10;

    // Datos de la unidad
    doc.setFont('helvetica', 'bold');
    doc.text("DATOS DE LA UNIDAD:", 250, 460);
    doc.setFont('helvetica', 'normal');
    y += 20;

    //tabla de unidad
    let unidadHeaders = ["PLACA", "N° ECONÓMICO", "SERIE", "COLOR"];
    let unidadData = [["ABC-123", "1001", "XYZ789456", "Azul"]];

    let unidadH = ["CLASE", "MARCA", "SUBMARCA", "MODELO"];
    let unidadD = [["Sedán", "Toyota", "Corolla", "2022"]];

    // Dibujar primera tabla (Unidad)
    doc.setFont('helvetica', 'bold');
    unidadHeaders.forEach((label, index) => {
        let cellX = 40 + (index * 130);
        let cellY = y + 10;
        doc.text(label, cellX + 65, cellY, { align: 'center' });
    });
    y += 17;

    doc.setFont('helvetica', 'normal');
    unidadData.forEach(row => {
        row.forEach((data, index) => {
            drawCell(40 + (index * 130), y, 130, 20, data);
        });
        y += 20;
    });
    y += 5;

    // Dibujar segunda tabla (Clase, Marca, etc.)
    doc.setFont('helvetica', 'bold');
    unidadH.forEach((label, index) => {
        let cellX = 40 + (index * 130);
        let cellY = y + 10;
        doc.text(label, cellX + 65, cellY, { align: 'center' });
    });
    y += 17;

    doc.setFont('helvetica', 'normal');
    unidadD.forEach(row => {
        row.forEach((data, index) => {
            drawCell(40 + (index * 130), y, 130, 20, data);
        });
        y += 20;
    });

    y += 10;
    // Definir los textos y sus posiciones
    let opciones = [
        { texto: "PROPIO:", x: 40 },
        { texto: "ARRENDADO:", x: 180 },
        { texto: "DECOMISADO:", x: 320 }
    ];
    // Dibujar los recuadros alrededor de los textos y los cuadros de selección
    opciones.forEach(opcion => {
        let textWidth = doc.getTextWidth(opcion.texto) + 13;
        let rectHeight = 15; // Altura del rectángulo
        let padding = 5; // Espacio interno

        // Dibujar el rectángulo del texto
        doc.rect(opcion.x, y, textWidth, rectHeight);
        doc.text(opcion.texto, opcion.x + padding, y + 11);

        // Dibujar el cuadro de selección al lado derecho del texto
        let checkBoxSize = 12; // Tamaño del cuadro de selección
        let checkBoxX = opcion.x + textWidth + 5; // Posición del cuadro de selección
        doc.rect(checkBoxX, y, checkBoxSize, checkBoxSize);
    });

    // Dibujar el texto "KM." 
    doc.text("KM.", 420, y + 10);
    // Dibujar la línea debajo del bloque de opciones
    doc.line(40, y + 15, 560, y + 15);
    y += 35;

    // 📌 Tabla Exterior
    const colWidthsExterior = [70, 35, 35, 35, 70, 35, 35, 35, 80, 35, 35, 35];
    const cellHeight = 20;
    const startX = 40;
    let startY = y;

    // Encabezados de la tabla Exterior
    let tableHeadersExterior = ["Exterior", "B", "R", "M", "Interior", "B", "R", "M", "Observaciones", "B", "R", "M"];

    doc.setFont('helvetica', 'bold');
    let xPos = startX;

    // Dibujar encabezados con bordes
    tableHeadersExterior.forEach((header, index) => {
        drawCell(xPos, startY, colWidthsExterior[index], cellHeight, header, [220, 220, 220]);
        xPos += colWidthsExterior[index];
    });

    startY += cellHeight; // Mover hacia abajo para los datos

    // Dibujar filas de la tabla Exterior
    let numRowsExterior = 10;
    for (let i = 0; i < numRowsExterior; i++) {
        xPos = startX;
        for (let j = 0; j < tableHeadersExterior.length; j++) {
            drawCell(xPos, startY, colWidthsExterior[j], cellHeight, ""); // Celda vacía
            xPos += colWidthsExterior[j];
        }
        startY += cellHeight;
    }

    // 📌 Tabla Interior 
    let tableHeadersInterior = [
        "Interior", "B", "R", "M",
        "Interior", "B", "R", "M",
        "Observaciones"
    ];
    const colWidthsInterior = [
        70, 35, 35, 35,
        70, 35, 35, 35,
        185  // 📌 Observaciones ocupa todo el alto de la tabla
    ];

    let startYInterior = startY + 1; // 📍 Agregar espacio entre tablas

    doc.setFont('helvetica', 'bold');
    xPos = startX;

    // 📌 Dibujar encabezados con bordes para la Tabla Interior
    tableHeadersInterior.forEach((header, index) => {
        drawCell(xPos, startYInterior, colWidthsInterior[index], cellHeight, header, [220, 220, 220]);
        xPos += colWidthsInterior[index];
    });

    startYInterior += cellHeight; // Mover hacia abajo para los datos

    // 📌 Dibujar filas de la tabla Interior
    let numRowsInterior = 5;
    for (let i = 0; i < numRowsInterior; i++) {
        xPos = startX;

        for (let j = 0; j < tableHeadersInterior.length - 1; j++) { // Omitimos "Observaciones"
            drawCell(xPos, startYInterior, colWidthsInterior[j], cellHeight, ""); // Celda vacía
            xPos += colWidthsInterior[j];
        }

        startYInterior += cellHeight;
    }

    // 📌 Dibujar un solo cuadro grande para "Observaciones"
    drawCell(xPos, startYInterior - (numRowsInterior * cellHeight), colWidthsInterior[colWidthsInterior.length - 1], numRowsInterior * cellHeight, "");


    // 📌 Tabla Accesorios
    let tableHeadersAccesorios = [
        "Accesorio", "Sí", "No",
        "Interior", "Sí", "No",
        "Tipo de ocupación"
    ];
    const colWidthsAccesorios = [
        80, 40, 40,
        80, 40, 40,
        215
    ];

    let startYAccesorios = startYInterior + 1; // 📍 Espacio entre tablas

    doc.setFont('helvetica', 'bold');
    xPos = startX;

    // 📌 Dibujar encabezados con bordes para la Tabla Accesorios
    tableHeadersAccesorios.forEach((header, index) => {
        drawCell(xPos, startYAccesorios, colWidthsAccesorios[index], cellHeight, header, [220, 220, 220]);
        xPos += colWidthsAccesorios[index];
    });

    startYAccesorios += cellHeight; // Mover hacia abajo para los datos

    // 📌 Dibujar filas de la tabla Accesorios
    let numRowsAccesorios = 5;
    for (let i = 0; i < numRowsAccesorios; i++) {
        xPos = startX;

        for (let j = 0; j < tableHeadersAccesorios.length - 1; j++) { // Omitimos "Tipo de ocupación"
            drawCell(xPos, startYAccesorios, colWidthsAccesorios[j], cellHeight, ""); // Celda vacía
            xPos += colWidthsAccesorios[j];
        }

        startYAccesorios += cellHeight;
    }

    // 📌 Dibujar un solo cuadro grande para "Tipo de ocupación"
    drawCell(xPos, startYAccesorios - (numRowsAccesorios * cellHeight), colWidthsAccesorios[colWidthsAccesorios.length - 1], numRowsAccesorios * cellHeight, "");

    // 📌 Texto informativo sobre el cambio de resguardante
    doc.setFont('helvetica', 'normal');

    let textoAviso = "AL MOMENTO DE CAMBIO DE RESGUARDANTE DEL VEHÍCULO, DEBERÁ INFORMAR A LA " +
        "DIRECCIÓN GENERAL DE ADMINISTRACIÓN DE FORMA INMEDIATA, " +
        "al correo: actualizar.reguardovehicular@fgjtam.gob.mx " +
        "o a los tels. 834 318 51 00 ext. 70258 y 70234.";

    // 📌 Ajustar texto automáticamente para que no se corte
    let textoFormateado = doc.splitTextToSize(textoAviso, 550);

    doc.text(textoFormateado, 40, 1073);


    // 📌 Posición inicial para las imágenes
    let imgStartX = 40;  // Margen izquierdo
    let imgStartY = 1100; // Debajo del texto de aviso
    let imgWidth = 120;   // Ancho de cada imagen
    let imgHeight = 90;   // Alto de cada imagen
    let spacingX = 20;    // Espaciado entre imágenes

    // 📌 Lista de imágenes (pueden ser URLs o base64)
    const images = [
        "../carro/Delantero.jpg",
        "../carro/Posterior.jpg",
        "../carro/LadoDerecho.jpg",
        "../carro/LadoIzquerdo.jpg"
    ];

    // 📌 Cargar y agregar las imágenes al PDF
    images.forEach((imgSrc, index) => {
        let x = imgStartX + (index * (imgWidth + spacingX));
        let y = imgStartY;

        let img = new Image();
        img.src = imgSrc;

        img.onload = function () {
            doc.addImage(img, 'JPEG', x, y, imgWidth, imgHeight);
        };
    });

    // 📌 Posición de las firmas (después de las imágenes)
    y = imgStartY + imgHeight + 100; // Ajustar para que las firmas no se sobrepongan

    doc.setFont("helvetica", "bold");

    const firmas = [
        "Resguardante Oficial",
        "Resguardante Interno",
        "Verificador",
        "Autorizacion Depto.REC.MAT"
    ];

    const pageWidth = doc.internal.pageSize.getWidth();
    const startXFirma = 40; // Margen izquierdo
    const spacing = (pageWidth - startXFirma * 2) / firmas.length; // Espacio entre firmas

    firmas.forEach((texto, index) => {
        let x = startXFirma + index * spacing;

        doc.text(texto, x + spacing / 2, y, { align: "center" });
        doc.line(x, y + 40, x + spacing - 15, y + 40);
    });

    return doc.output('bloburl');

}

