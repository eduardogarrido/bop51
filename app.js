const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const WebWhatsappProvider = require('@bot-whatsapp/provider/web-whatsapp')
const MockAdapter = require('@bot-whatsapp/database/mock')

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowAGLUSZEWICZLeandro = addKeyword(['069-135', '069135']).addAnswer(
    [
        '🚀 Alumno/a: *AGLUSZEWICZ, Leandro de 1° A*',
        '🚀 Sus calificaciones a la fecha son:',
        '\n*Lengua* 7.00 (1T), ',
        '*Matemática* 8.00 (1T), ',
        '*Historia* 9.00 (1T), ',
        '*Geografía* 10.00 (1T), ',
        '*Historia* 7.00 (1T), ',
        '*Formación Etica y Ciudadana* 7.00 (1T), ',
        '*Biología* 9.00 (1T), ',
        '*Lengua Extranjera* 8.00 (1T), ',
        '*Educación Física* 10.00 (1T), ',
        '*Tecnología* 9.00 (1T), ',
        '*Educación Artistica* 7.50 (1T), ',
        '*EDI* 8.00 (1T), ',
        '\n *hola* Para volver al menu principal.',
    ],
    [flowSecundario]
)

const flow2 = addKeyword(['2', 'plan', 'estudio']).addAnswer(
    [
        '🎓 Titulo *Bachiller en Economía y Administración*',
        '\n *1° Año:* Lengua, Matemática, Geografía, Historia, F. Ética y Ciud., Biología, Educ. Artística Plástica, Tecnología, EDI, Educ. Física, Ingles o Portugues.',
        '\n *2° Año:* Lengua, Matemática, Geografía, Historia, F. Ética y Ciud., Biología, Educ. Artística Música, Tecnología, Fisicoquimica, Educ. Física, Ingles o Portugues.',
        '\n *3° Año:* Literatura I, Matemática I, Geografía, Historia, F. Ética y Ciud., Biología, Educ. Artística Plástica, Física, Sist. Inf. Contable I, Educ. Física, Ingles o Portugues.',
        '\n *4° Año:* Literatura II, Matemática II, Ciudadania y Trabajo, Psicología, Quimica, Economía, Introducción al Derecho, Teoría y Gestión de las Org., Sist. Inf. Contable II, Educ. Física, Ingles o Portugues.',
        '\n *5° Año:* Literatura III, Matemática II, Ciudadania y Trabajo, Psicología, Quimica, Economía, Introducción al Derecho, Teoría y Gestión de las Org., Sist. Inf. Contable II, Educ. Física, Ingles o Portugues.',
        '\n*atras* Para volver al menu principal.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowKratt = addKeyword(['3', 'horario']).addAnswer(
    [
        '🙌 Estos son nuestros horarios de atención:',
        '\nLunes a Viernes: *07:00 a 12:05* - (Administración y Clases)',
        'Lunes y Miércoles: *12:00 a 14:00* - (Educación Física)',
        'Viernes: *12:00 a 13:00* - (Educación Física)',
        '\n*atras* Para volver al menu principal.',
    ],
    null,
    null,
    [flowSecundario]
)

const flow1 = addKeyword(['1','requisitos']).addAnswer(
    [
        '🚀 Para inscribir al alumno/a necesita presentar lo siguiente',
        '\n*Documentación del alumno/a*',
        '> Fotocopia 1 y 2 hoja del DNI',
        '> Constancia de CUIL sino figura en el DNI',
        '> Fotocopia de la partida de nacimiento',
        '> Certificado de 7mo, Libreta año anterior o Pase Definitivo',
        '> Exámen Médico (con electro) y Bucodental',
        '> Libreta de vacunas',
        '\n*Documentación de Padres o Tutores*',
        '> Copia de 1 y 2 hoja del DNI',
        '> Constancia de CUIL sino figura en el DNI',
        '\n*atras* Para volver al menu principal.',
    ],
    null,
    null,
    [flowSecundario]
)

const flow4 = addKeyword(['4','alumno','alumna']).addAnswer(
    [
        '🚀 Escriba *ultimos 3 numeros del DNI del tutor y ultimos 3 números del DNI del alumno Ej 069-135 o 069135*',
        '\n*atras* Para volver al menu principal.',
    ],
    null,
    null,
    [flowSecundario, flowAGLUSZEWICZLeandro]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'atras', 'buen', 'buenos', 'dia', 'dias', 'tarde', 'tardes'])
    .addAnswer('🙌 Hola bienvenido al *Chat del BOP 51*')
    .addAnswer(
        [
            '*Escriba el número* indicado para obtener información:',
            '\n👉 *1* para ver Requisitos de Inscripción',
            '👉 *2* para ver Plan de Estudio',
            '👉 *3* para ver Horario Escolar',
            '\n👨‍🎓👩‍🎓 *4* Si quiere ver información sobre su hijo/a',
        ],
        null,
        null,
        [flow2, flow1, flowKratt, flowDiscord, flow4]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(WebWhatsappProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb({port:4001})
}

main()
