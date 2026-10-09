export type Lang = "es" | "ru" | "uk";

export type Copy = (typeof content)[Lang];

export const content = {
  es: {
    metaTitle: "Avenya — Asesoría fiscal y contable en Alicante",
    metaDescription:
      "Asesoría fiscal y contable en Alicante. Autónomos, sociedades y no residentes. Atención en español, ruso y ucraniano. Cita previa.",
    skip: "Ir al contenido",
    nav: {
      services: "Servicios",
      calendar: "Calendario",
      approach: "Enfoque",
      alicante: "Alicante",
      faq: "Preguntas",
      contact: "Contacto",
      cta: "Pedir cita",
      legal: "Aviso legal",
      privacy: "Privacidad",
      menu: "Menú",
      close: "Cerrar",
    },
    hero: {
      eyebrow: "Alicante · Asesoría fiscal y contable",
      title: "Cifras claras. Impuestos a tiempo.",
      lead: "Avenya lleva la contabilidad y la fiscalidad de autónomos, sociedades y no residentes. Trabajamos en español, en ruso y en ucraniano, con cita previa en Alicante o por videollamada.",
      primary: "Solicitar una cita",
      secondary: "Ver servicios",
      location: "Despacho en Alicante",
      hours: "L–V, 9:00–15:00",
      languages: "ES · RU · UA",
    },
    strip: {
      items: [
        { k: "Autónomos", v: "Alta, trimestrales 130 y 303" },
        { k: "Particulares", v: "Renta anual, modelo 100" },
        { k: "Sociedades", v: "SL, cuentas, impuesto de sociedades" },
        { k: "No residentes", v: "IRNR, alquileres, modelo 210" },
        { k: "Hacienda", v: "Representación y requerimientos" },
      ],
    },
    services: {
      eyebrow: "01 — Servicios",
      title: "Lo que llevamos, de verdad.",
      lead: "No somos un mostrador de trámites sueltos. Asumimos el calendario fiscal y la contabilidad para que usted decida, no persiga modelos.",
      items: [
        {
          n: "01",
          title: "Contabilidad",
          body: "Libros, facturación, conciliaciones y cuentas anuales. Un cierre que se puede leer, no un PDF opaco a final de año.",
        },
        {
          n: "02",
          title: "Asesoría fiscal",
          body: "IVA, IRPF, impuesto de sociedades, operaciones vinculadas y planificación de pagos fraccionados. Cada modelo, en su plazo.",
        },
        {
          n: "03",
          title: "Autónomos",
          body: "Alta en Hacienda y en el RETA antes de facturar. Con actividad: pago fraccionado 130, IVA 303 y, si procede, retenciones 111 y 115. Al cerrar el año, resumen de IVA 390 y el 190 si hubo retenciones.",
        },
        {
          n: "04",
          title: "Particulares",
          body: "Para quien no es autónomo y presenta su declaración privada. La del año es el modelo 100: el IRPF — nómina, alquiler, ahorros y ganancias. Si procede, el patrimonio (714) y los bienes en el extranjero (720). Sin trimestrales de actividad.",
        },
        {
          n: "05",
          title: "Sociedades",
          body: "Constitución de SL, contabilidad mercantil, depósito de cuentas y el impuesto de sociedades con su documentación de soporte.",
        },
        {
          n: "06",
          title: "No residentes",
          body: "Vivienda en España: alquiler turístico o de temporada, imputación de rentas, modelo 210 y representación fiscal.",
        },
        {
          n: "07",
          title: "Ante Hacienda",
          body: "Requerimientos, comprobaciones limitadas y recursos. Contestamos con expediente, no con plantillas.",
        },
      ],
    },
    calendar: {
      eyebrow: "02 — Calendario",
      title: "Qué le toca presentar.",
      lead: "Elija su situación. Las fechas salen del calendario del contribuyente de la AEAT y se actualizan solas cuando Hacienda publica un nuevo año o desplaza un plazo.",
      profiles: {
        autonomo: "Autónomo",
        sociedad: "Sociedad",
        residente: "No residente",
      },
      due: "Plazo",
      days: "días",
      today: "en plazo",
      overdue: "vencido",
      note: "Fuente: calendario iCalendar de la Agencia Tributaria. El año siguiente se completa con plazos tipo hasta que Hacienda lo publique. Confirmamos cada vencimiento al llevar su expediente.",
      noteFallback: "Calendario tipo (20 de enero, abril, julio y octubre, con desplazamiento de fin de semana). La AEAT no ha respondido ahora mismo. Confirmamos cada vencimiento al llevar su expediente.",
    },
    approach: {
      eyebrow: "03 — Enfoque",
      title: "Cómo empezamos a trabajar.",
      steps: [
        {
          n: "01",
          title: "Conversación",
          body: "Media hora, sin compromiso. Qué figura tiene, qué modelos presenta, dónde duele el calendario.",
        },
        {
          n: "02",
          title: "Encargo",
          body: "Hoja de encargo clara: alcance, honorarios y representación ante la AEAT si hace falta.",
        },
        {
          n: "03",
          title: "Puesta en orden",
          body: "Recogemos facturas, accesos y el histórico. Cerramos huecos antes del siguiente trimestre.",
        },
        {
          n: "04",
          title: "Acompañamiento",
          body: "Trimestrales, avisos y un interlocutor fijo. En español, en ruso o en ucraniano, como prefiera.",
        },
      ],
    },
    cases: {
      eyebrow: "Situaciones habituales",
      title: "Para quién encaja Avenya.",
      items: [
        {
          title: "Autónomo que factura a la UE",
          body: "IVA intra, modelo 349 y una estimación directa que no se descuadra con el banco.",
        },
        {
          title: "SL en España",
          body: "Contabilidad, nóminas e impuestos sin retrasos. El modelo 200, con antelación.",
        },
        {
          title: "Vivienda de no residente",
          body: "Alquiler o uso propio, modelo 210, y un representante fiscal en España.",
        },
        {
          title: "Traslado a España",
          body: "Ayudamos con el NIE, la residencia fiscal, el alta de autónomo o de SL y la primera declaración en España.",
        },
      ],
    },
    alicante: {
      eyebrow: "04 — Alicante",
      title: "Cerca de Hacienda, y de la costa.",
      body: "Trabajamos desde Alicante: cita en despacho o videollamada, según el expediente. La Delegación de la AEAT está a un paso; los clientes, entre el centro, San Juan, El Campello y el resto de la provincia.",
      points: [
        "Cita previa, de 9:00 a 15:00",
        "Videollamada para quien vive fuera",
        "Documentación en español, ruso o ucraniano",
      ],
      caption: "Bahía de Alicante",
      deskCaption: "Mesa de trabajo",
    },
    faq: {
      eyebrow: "05 — Preguntas",
      title: "Antes de escribirnos.",
      items: [
        {
          q: "¿Trabajáis en ruso?",
          a: "Sí. El expediente puede llevarse en español, en ruso o en ucraniano. Los modelos y las notificaciones de Hacienda son en español; nosotros los traducimos y explicamos.",
        },
        {
          q: "¿Cuándo hay que darse de alta de autónomo?",
          a: "Antes de iniciar la actividad, en Hacienda (censal) y en la Seguridad Social (RETA). Si ya ha facturado sin alta, lo vemos con calma: hay regularización, no hay que improvisar.",
        },
        {
          q: "Tengo un piso en Alicante y no resido en España.",
          a: "Hay que presentar el IRNR: alquiler o imputación de rentas si está a su disposición. Conviene un representante fiscal. Lo montamos con el modelo 210 y el calendario que le corresponda.",
        },
        {
          q: "¿Lleváis sociedades y autónomos?",
          a: "Sí. SL, autónomos en estimación directa y no residentes. Si su caso es un grupo internacional o una operación corporativa compleja, se lo diremos con franqueza en la primera conversación.",
        },
        {
          q: "¿Cómo se calculan los honorarios?",
          a: "Cuota mensual según volumen (facturas, trabajadores, modelos) o un encargo cerrado para un trámite concreto. Lo dejamos por escrito antes de empezar. No hay letra pequeña a final de trimestre.",
        },
        {
          q: "¿Hace falta venir al despacho?",
          a: "No siempre. Muchos expedientes se llevan por videollamada y carpeta compartida. Para poderes, altas y algunas firmas, la cita en Alicante es más limpia.",
        },
      ],
    },
    contact: {
      eyebrow: "06 — Cita",
      title: "Cuéntenos su situación.",
      lead: "Respondemos en un día laborable. Si el plazo de un modelo aprieta, indíquelo en el mensaje.",
      name: "Nombre",
      email: "Correo",
      phone: "Teléfono (opcional)",
      profile: "Situación",
      profiles: {
        autonomo: "Autónomo",
        particular: "Particular",
        sociedad: "Sociedad",
        residente: "No residente",
        other: "Otra",
      },
      message: "Mensaje",
      messagePh: "Qué necesita y cuándo vence, si hay un plazo.",
      gdpr: "He leído la política de privacidad y acepto que Avenya use estos datos para responder a mi solicitud.",
      submit: "Enviar solicitud",
      sending: "Enviando…",
      successTitle: "Solicitud recibida.",
      successBody:
        "Le responderemos al correo indicado en un día laborable. Si el asunto es un vencimiento inmediato, menciónelo de nuevo al responder nuestro primer mensaje.",
      another: "Enviar otra solicitud",
      errors: {
        name: "Indique su nombre.",
        email: "Indique un correo válido.",
        message: "Escriba un breve mensaje.",
        gdpr: "Hace falta aceptar la privacidad para enviar.",
      },
      asideTitle: "Despacho",
      channels: [
        { label: "695 343 196", href: "tel:+34695343196" },
        { label: "avenyaglobal@gmail.com", href: "mailto:avenyaglobal@gmail.com" },
        { label: "avenyaglobal.com", href: "https://avenyaglobal.com" },
        { label: "WhatsApp", href: "https://wa.me/34695343196" },
        {
          label: "Cómo llegar",
          href: "https://maps.google.com/?q=Avenida+de+Juan+Sanchis+Candela+23A+Oficina+8+03015+Alicante",
        },
      ],
      aside: [
        "Avenida de Juan Sanchis Candela, 23A",
        "Oficina 8, 03015 Alicante",
        "España",
        "Lunes a viernes",
        "9:00–15:00",
        "Cita previa · también videollamada",
      ],
      streetCaption: "Monumento Puerta del Milenio",
    },
    footer: {
      tagline: "Asesoría fiscal y contable en Alicante.",
      address: "Avenida de Juan Sanchis Candela, 23A, Oficina 8, 03015 Alicante",
      rights: "Avenya. Todos los derechos reservados.",
    },
    legal: {
      title: "Aviso legal",
      updated: "Última actualización: septiembre de 2026",
      blocks: [
        {
          h: "Titular",
          p: "Avenya es un despacho de asesoría fiscal y contable en Avenida de Juan Sanchis Candela, 23A, Oficina 8, 03015 Alicante, España. La razón social y el NIF se facilitan en la hoja de encargo y en las facturas.",
        },
        {
          h: "Contacto",
          p: "Para cualquier comunicación: avenyaglobal@gmail.com. La atención es con cita previa, en despacho o por videollamada.",
        },
        {
          h: "Objeto",
          p: "Este sitio informa sobre los servicios de Avenya. No constituye asesoramiento fiscal personalizado. Cada encargo se documenta por escrito antes de presentar modelos o asumir representación ante la AEAT.",
        },
        {
          h: "Propiedad intelectual",
          p: "El nombre, el logotipo y los contenidos de este sitio pertenecen a Avenya. No está permitida su reproducción sin autorización, salvo el derecho de cita.",
        },
      ],
    },
    privacy: {
      title: "Política de privacidad",
      updated: "Última actualización: septiembre de 2026",
      blocks: [
        {
          h: "Responsable",
          p: "Avenya, Alicante, España. Contacto: avenyaglobal@gmail.com.",
        },
        {
          h: "Qué datos pedimos",
          p: "En el formulario de cita: nombre, correo, teléfono opcional, tipo de situación y el mensaje. Son datos de contacto para responderle, no un expediente fiscal.",
        },
        {
          h: "Finalidad y base",
          p: "Gestionar su solicitud de cita y, si hay encargo posterior, prestar el servicio. Base jurídica: medidas precontractuales a petición suya y, cuando proceda, el contrato de encargo. El recuadro de privacidad es la constancia de que ha leído esta política.",
        },
        {
          h: "Conservación",
          p: "Las solicitudes de cita se conservan el tiempo necesario para responder y, si no hay encargo, se eliminan después. Los expedientes de clientes siguen los plazos de la normativa mercantil y tributaria.",
        },
        {
          h: "Cookies y almacenamiento local",
          p: "No usamos cookies de seguimiento ni publicidad. El idioma de la web (español, ruso o ucraniano) se guarda en el almacenamiento local de su navegador, solo en su dispositivo.",
        },
        {
          h: "Derechos",
          p: "Puede acceder, rectificar, borrar, limitar u oponerse, y solicitar portabilidad, escribiendo a avenyaglobal@gmail.com. También puede reclamar ante la Agencia Española de Protección de Datos (aepd.es).",
        },
      ],
    },
  },
  ru: {
    metaTitle: "Avenya — Налоговое и бухгалтерское сопровождение в Аликанте",
    metaDescription:
      "Налоговое и бухгалтерское сопровождение в Аликанте. Autónomo, общества и нерезиденты. На русском, украинском и испанском. Приём по записи.",
    skip: "К содержанию",
    nav: {
      services: "Услуги",
      calendar: "Календарь",
      approach: "Как работаем",
      alicante: "Аликанте",
      faq: "Вопросы",
      contact: "Контакты",
      cta: "Записаться",
      legal: "Правовая информация",
      privacy: "Конфиденциальность",
      menu: "Меню",
      close: "Закрыть",
    },
    hero: {
      eyebrow: "Аликанте · Налоги и бухгалтерия",
      title: "Понятные цифры. Налоги вовремя.",
      lead: "Avenya ведёт бухгалтерию и налоги autónomo, обществ и нерезидентов. Работаем на испанском, русском и украинском — в кабинете в Аликанте или по видеосвязи, по записи.",
      primary: "Записаться на разговор",
      secondary: "Смотреть услуги",
      location: "Кабинет в Аликанте",
      hours: "Пн–пт, 9:00–15:00",
      languages: "ES · RU · UA",
    },
    strip: {
      items: [
        { k: "Autónomos", v: "Постановка на учёт, квартальные 130 и 303" },
        { k: "Физические лица", v: "Годовая декларация, modelo 100" },
        { k: "Общества", v: "SL, годовые счета, налог на общества" },
        { k: "Нерезиденты", v: "Налог нерезидента, аренда, modelo 210" },
        { k: "Hacienda", v: "Представление интересов и ответы на требования" },
      ],
    },
    services: {
      eyebrow: "01 — Услуги",
      title: "Что берём на себя.",
      lead: "Не разовые справки, а ведение учёта и налогового календаря. Вы принимаете решения — сроки modelo отслеживаем мы.",
      items: [
        {
          n: "01",
          title: "Бухгалтерия",
          body: "Книги учёта, счета, сверка с банком и годовая отчётность. Закрытие периода, которое можно прочитать, а не папка файлов в конце года.",
        },
        {
          n: "02",
          title: "Налоговое сопровождение",
          body: "IVA, IRPF, налог на общества, операции со связанными сторонами и квартальные авансы. Каждый modelo подаём в свой срок.",
        },
        {
          n: "03",
          title: "Autónomos",
          body: "Постановка на учёт в Hacienda и в RETA — до первого счёта. По деятельности: квартальный аванс 130, IVA 303 и, если есть удержания, 111 и 115. По итогам года — сводная IVA 390 и сводная по удержаниям 190.",
        },
        {
          n: "04",
          title: "Физические лица",
          body: "Для тех, кто не autónomo и подаёт личную декларацию. Годовая — modelo 100: IRPF по зарплате, аренде, сбережениям и приросту капитала. Если положено — налог на имущество (714) и декларация активов за рубежом (720). Квартальных деклараций по деятельности нет.",
        },
        {
          n: "05",
          title: "Общества",
          body: "Регистрация SL, бухгалтерский учёт, подача годовых счетов в Registro Mercantil и налог на общества с подтверждающими документами.",
        },
        {
          n: "06",
          title: "Нерезиденты",
          body: "Жильё в Испании: туристическая или сезонная аренда, вменённый доход, modelo 210 и налоговый представитель.",
        },
        {
          n: "07",
          title: "Работа с Hacienda",
          body: "Требования, ограниченные проверки и обжалование. Отвечаем по документам дела, не по шаблону.",
        },
      ],
    },
    calendar: {
      eyebrow: "02 — Календарь",
      title: "Что подавать в ближайшие сроки.",
      lead: "Выберите статус. Даты берём из календаря налогоплательщика AEAT: они обновляются, когда налоговая публикует новый год или переносит срок.",
      profiles: {
        autonomo: "Autónomo",
        sociedad: "Общество",
        residente: "Нерезидент",
      },
      due: "Срок",
      days: "дн.",
      today: "срок идёт",
      overdue: "срок прошёл",
      note: "Источник: календарь Agencia Tributaria. Пока налоговая не опубликовала следующий год, ставим типовые сроки. Точную дату подтверждаем по вашему делу.",
      noteFallback: "Типовые сроки: 20 января, апреля, июля и октября, с переносом, если день выходной. AEAT сейчас не ответила. Точную дату подтверждаем по делу.",
    },
    approach: {
      eyebrow: "03 — Как работаем",
      title: "С чего начинается сотрудничество.",
      steps: [
        {
          n: "01",
          title: "Разговор",
          body: "Полчаса, без обязательств. Какой статус, какие modelo и где уже поджимает срок.",
        },
        {
          n: "02",
          title: "Договор",
          body: "Письменное поручение: объём работ, вознаграждение и представительство в AEAT, если оно нужно.",
        },
        {
          n: "03",
          title: "Наведение порядка",
          body: "Собираем счета, доступы и историю. Закрываем пробелы до следующего квартала.",
        },
        {
          n: "04",
          title: "Сопровождение",
          body: "Квартальные декларации, напоминания и один постоянный специалист. На испанском, русском или украинском.",
        },
      ],
    },
    cases: {
      eyebrow: "Типичные ситуации",
      title: "Кому подходит Avenya.",
      items: [
        {
          title: "Autónomo с клиентами в ЕС",
          body: "IVA по операциям внутри ЕС, modelo 349 и estimación directa, которая сходится с выпиской банка.",
        },
        {
          title: "SL в Испании",
          body: "Бухгалтерия, зарплаты и налоги без задержек. Modelo 200 — заранее.",
        },
        {
          title: "Жильё нерезидента",
          body: "Аренда или личное пользование, modelo 210 и налоговый представитель в Испании.",
        },
        {
          title: "Переезд в Испанию",
          body: "Поможем разобраться с NIE, налоговым резидентством, открытием autónomo или SL и первой декларацией в Испании.",
        },
      ],
    },
    alicante: {
      eyebrow: "04 — Аликанте",
      title: "Рядом с налоговой и с морем.",
      body: "Работаем в Аликанте: встреча в кабинете или по видеосвязи — как удобнее по делу. Делегация AEAT рядом. Клиенты в центре, в Сан-Хуане, в Эль-Кампельо и по всей провинции.",
      points: [
        "По записи, с 9:00 до 15:00",
        "Видеосвязь, если вы не в городе",
        "Документы на испанском, русском или украинском",
      ],
      caption: "Бухта Аликанте",
      deskCaption: "Рабочий стол",
    },
    faq: {
      eyebrow: "05 — Вопросы",
      title: "Прежде чем писать.",
      items: [
        {
          q: "Вы ведёте дела на русском?",
          a: "Да. Объясняем и переписываемся по-русски, по-украински или по-испански. Сами modelo и уведомления Hacienda выходят на испанском: переводим и разбираем, что от вас требуется.",
        },
        {
          q: "Когда вставать на учёт как autónomo?",
          a: "До начала деятельности: в Hacienda (modelo 036 или 037) и в соцстрахе (RETA). Если счета уже выставляли без постановки на учёт, это не повод действовать наспех: смотрим, как оформить корректно.",
        },
        {
          q: "У меня квартира в Аликанте, я нерезидент.",
          a: "Нужна декларация нерезидента (IRNR): доход от аренды или вменённый доход, если жильё в вашем распоряжении. Обычно нужен налоговый представитель. Готовим modelo 210 и календарь под вашу ситуацию.",
        },
        {
          q: "Вы ведёте и общества, и autónomo?",
          a: "Да. SL, autónomo на estimación directa и нерезидентов. Если это международная группа или сложная корпоративная сделка, скажем об этом прямо на первом разговоре.",
        },
        {
          q: "Как считается вознаграждение?",
          a: "Ежемесячно — по объёму: счета, сотрудники, набор modelo. Либо фиксированная сумма за отдельное поручение. Сумма фиксируется письменно до начала работы, без доплат, которые всплывают в конце квартала.",
        },
        {
          q: "Обязательно приезжать в кабинет?",
          a: "Нет. Многие дела ведём по видеосвязи и через общую папку. Доверенность, постановку на учёт и часть подписей надёжнее оформить на встрече в Аликанте.",
        },
      ],
    },
    contact: {
      eyebrow: "06 — Запись",
      title: "Опишите вашу ситуацию.",
      lead: "Отвечаем в рабочий день. Если срок подачи уже близко — напишите об этом в сообщении.",
      name: "Имя",
      email: "Электронная почта",
      phone: "Телефон (необязательно)",
      profile: "Статус",
      profiles: {
        autonomo: "Autónomo",
        particular: "Физическое лицо",
        sociedad: "Общество",
        residente: "Нерезидент",
        other: "Другое",
      },
      message: "Сообщение",
      messagePh: "Что нужно сделать и какой срок, если он уже близко.",
      gdpr: "Я ознакомился с политикой конфиденциальности и согласен на обработку этих данных, чтобы Avenya ответила на запрос.",
      submit: "Отправить запрос",
      sending: "Отправляем…",
      successTitle: "Запрос получен.",
      successBody:
        "Ответим на указанную почту в рабочий день. Если срок подачи уже близко, повторите это в ответ на наше первое письмо.",
      another: "Отправить ещё один запрос",
      errors: {
        name: "Укажите имя.",
        email: "Укажите корректную почту.",
        message: "Напишите короткое сообщение.",
        gdpr: "Чтобы отправить, нужно принять политику конфиденциальности.",
      },
      asideTitle: "Кабинет",
      channels: [
        { label: "695 343 196", href: "tel:+34695343196" },
        { label: "avenyaglobal@gmail.com", href: "mailto:avenyaglobal@gmail.com" },
        { label: "avenyaglobal.com", href: "https://avenyaglobal.com" },
        { label: "WhatsApp", href: "https://wa.me/34695343196" },
        {
          label: "Как добраться",
          href: "https://maps.google.com/?q=Avenida+de+Juan+Sanchis+Candela+23A+Oficina+8+03015+Alicante",
        },
      ],
      aside: [
        "Avenida de Juan Sanchis Candela, 23A",
        "Oficina 8, 03015 Alicante",
        "Испания",
        "Понедельник — пятница",
        "9:00–15:00",
        "По записи · также видеосвязь",
      ],
      streetCaption: "Монумент «Пуэрта дель Миленио»",
    },
    footer: {
      tagline: "Налоговое и бухгалтерское сопровождение в Аликанте.",
      address: "Avenida de Juan Sanchis Candela, 23A, Oficina 8, 03015 Alicante",
      rights: "Avenya. Все права защищены.",
    },
    legal: {
      title: "Правовая информация",
      updated: "Обновлено: сентябрь 2026",
      blocks: [
        {
          h: "Владелец сайта",
          p: "Avenya — кабинет налогового и бухгалтерского сопровождения: Avenida de Juan Sanchis Candela, 23A, Oficina 8, 03015 Alicante, Испания. Наименование и NIF указываются в договоре поручения и в счетах.",
        },
        {
          h: "Контакт",
          p: "Пишите на avenyaglobal@gmail.com. Приём по записи, в кабинете или по видеосвязи.",
        },
        {
          h: "Содержание сайта",
          p: "Сайт описывает услуги Avenya. Это не индивидуальная консультация. Каждое поручение оформляется письменно до подачи modelo и до представительства в AEAT.",
        },
        {
          h: "Интеллектуальная собственность",
          p: "Имя, логотип и материалы сайта принадлежат Avenya. Воспроизведение без разрешения не допускается, кроме права цитирования.",
        },
      ],
    },
    privacy: {
      title: "Политика конфиденциальности",
      updated: "Обновлено: сентябрь 2026",
      blocks: [
        {
          h: "Оператор",
          p: "Avenya, Аликанте, Испания. Контакт: avenyaglobal@gmail.com.",
        },
        {
          h: "Какие данные мы запрашиваем",
          p: "В форме записи: имя, электронная почта, телефон по желанию, статус и текст сообщения. Это данные, чтобы ответить на запрос, а не налоговое досье.",
        },
        {
          h: "Зачем и на каком основании",
          p: "Чтобы ответить на запрос о встрече и, если поручение состоится, оказать услугу. Основание: меры до заключения договора по вашей просьбе и, когда договор заключён, сам договор. Отметка в форме подтверждает, что вы прочитали эту политику.",
        },
        {
          h: "Сколько храним",
          p: "Запросы о встрече храним, пока отвечаем, и удаляем, если поручения не было. Документы клиентов — в сроки торгового и налогового законодательства.",
        },
        {
          h: "Файлы cookie и локальное хранение",
          p: "Файлов cookie для слежения и рекламы нет. Выбранный язык сайта хранится только в браузере на вашем устройстве.",
        },
        {
          h: "Ваши права",
          p: "Можно запросить доступ, исправление, удаление, ограничение обработки, возражение и переносимость: avenyaglobal@gmail.com. Жалобу можно подать в Испанское агентство по защите данных (aepd.es).",
        },
      ],
    },
  },
  uk: {
    metaTitle: "Avenya — Податковий і бухгалтерський супровід в Аліканте",
    metaDescription:
      "Податковий і бухгалтерський супровід в Аліканте. Autónomo, товариства і нерезиденти. Українською, російською та іспанською. Прийом за записом.",
    skip: "До змісту",
    nav: {
      services: "Послуги",
      calendar: "Календар",
      approach: "Як працюємо",
      alicante: "Аліканте",
      faq: "Запитання",
      contact: "Контакти",
      cta: "Записатися",
      legal: "Правова інформація",
      privacy: "Конфіденційність",
      menu: "Меню",
      close: "Закрити",
    },
    hero: {
      eyebrow: "Аліканте · Податки і бухгалтерія",
      title: "Зрозумілі цифри. Податки вчасно.",
      lead: "Avenya веде бухгалтерію та податки autónomo, товариств і нерезидентів. Працюємо іспанською, російською та українською — в кабінеті в Аліканте або по відеозв’язку, за записом.",
      primary: "Записатися на розмову",
      secondary: "Дивитися послуги",
      location: "Кабінет в Аліканте",
      hours: "Пн–пт, 9:00–15:00",
      languages: "ES · RU · UA",
    },
    strip: {
      items: [
        { k: "Autónomos", v: "Постановка на облік, квартальні 130 і 303" },
        { k: "Фізичні особи", v: "Річна декларація, modelo 100" },
        { k: "Товариства", v: "SL, річні рахунки, податок на товариства" },
        { k: "Нерезиденти", v: "Податок нерезидента, оренда, modelo 210" },
        { k: "Hacienda", v: "Представництво інтересів і відповіді на вимоги" },
      ],
    },
    services: {
      eyebrow: "01 — Послуги",
      title: "Що беремо на себе.",
      lead: "Не разові довідки, а ведення обліку і податкового календаря. Ви ухвалюєте рішення — строки modelo відстежуємо ми.",
      items: [
        {
          n: "01",
          title: "Бухгалтерія",
          body: "Книги обліку, рахунки, звірка з банком і річна звітність. Закриття періоду, яке можна прочитати, а не тека файлів наприкінці року.",
        },
        {
          n: "02",
          title: "Податковий супровід",
          body: "IVA, IRPF, податок на товариства, операції з пов’язаними сторонами і квартальні аванси. Кожен modelo подаємо у свій строк.",
        },
        {
          n: "03",
          title: "Autónomos",
          body: "Постановка на облік у Hacienda і в RETA — до першого рахунку. За діяльністю: квартальний аванс 130, IVA 303 і, якщо є утримання, 111 і 115. За підсумками року — зведена IVA 390 і зведена з утримань 190.",
        },
        {
          n: "04",
          title: "Фізичні особи",
          body: "Для тих, хто не autónomo і подає особисту декларацію. Річна — modelo 100: IRPF із зарплати, оренди, заощаджень і приросту капіталу. Якщо належить — податок на майно (714) і декларація активів за кордоном (720). Квартальних декларацій за діяльністю немає.",
        },
        {
          n: "05",
          title: "Товариства",
          body: "Реєстрація SL, бухгалтерський облік, подання річних рахунків до Registro Mercantil і податок на товариства з підтвердними документами.",
        },
        {
          n: "06",
          title: "Нерезиденти",
          body: "Житло в Іспанії: туристична або сезонна оренда, умовний дохід, modelo 210 і податковий представник.",
        },
        {
          n: "07",
          title: "Робота з Hacienda",
          body: "Вимоги, обмежені перевірки й оскарження. Відповідаємо за документами справи, не за шаблоном.",
        },
      ],
    },
    calendar: {
      eyebrow: "02 — Календар",
      title: "Що подавати найближчим часом.",
      lead: "Оберіть статус. Дати беремо з календаря платника AEAT: вони оновлюються, коли податкова публікує новий рік або переносить строк.",
      profiles: {
        autonomo: "Autónomo",
        sociedad: "Товариство",
        residente: "Нерезидент",
      },
      due: "Строк",
      days: "дн.",
      today: "строк триває",
      overdue: "строк минув",
      note: "Джерело: календар Agencia Tributaria. Поки податкова не опублікувала наступний рік, ставимо типові строки. Точну дату підтверджуємо у вашій справі.",
      noteFallback: "Типові строки: 20 січня, квітня, липня й жовтня, з перенесенням, якщо день вихідний. AEAT зараз не відповіла. Точну дату підтверджуємо у справі.",
    },
    approach: {
      eyebrow: "03 — Як працюємо",
      title: "З чого починається співпраця.",
      steps: [
        {
          n: "01",
          title: "Розмова",
          body: "Пів години, без зобов’язань. Який статус, які modelo і де вже підтискає строк.",
        },
        {
          n: "02",
          title: "Договір",
          body: "Письмове доручення: обсяг робіт, винагорода і представництво в AEAT, якщо воно потрібне.",
        },
        {
          n: "03",
          title: "Упорядкування",
          body: "Збираємо рахунки, доступи й історію. Закриваємо прогалини до наступного кварталу.",
        },
        {
          n: "04",
          title: "Супровід",
          body: "Квартальні декларації, нагадування й один постійний спеціаліст. Іспанською, російською або українською.",
        },
      ],
    },
    cases: {
      eyebrow: "Типові ситуації",
      title: "Кому підходить Avenya.",
      items: [
        {
          title: "Autónomo з клієнтами в ЄС",
          body: "IVA за операціями всередині ЄС, modelo 349 і estimación directa, яка сходиться з випискою банку.",
        },
        {
          title: "SL в Іспанії",
          body: "Бухгалтерія, зарплати й податки без затримок. Modelo 200 — заздалегідь.",
        },
        {
          title: "Житло нерезидента",
          body: "Оренда або особисте користування, modelo 210 і податковий представник в Іспанії.",
        },
        {
          title: "Переїзд до Іспанії",
          body: "Допоможемо розібратися з NIE, податковим резидентством, відкриттям autónomo або SL і першою декларацією в Іспанії.",
        },
      ],
    },
    alicante: {
      eyebrow: "04 — Аліканте",
      title: "Поруч із податковою і з морем.",
      body: "Працюємо в Аліканте: зустріч у кабінеті або по відеозв’язку — як зручніше у справі. Делегація AEAT поруч. Клієнти в центрі, у Сан-Хуані, в Ель-Кампельо і по всій провінції.",
      points: [
        "За записом, з 9:00 до 15:00",
        "Відеозв’язок, якщо ви не в місті",
        "Документи іспанською, російською або українською",
      ],
      caption: "Бухта Аліканте",
      deskCaption: "Робочий стіл",
    },
    faq: {
      eyebrow: "05 — Запитання",
      title: "Перш ніж написати.",
      items: [
        {
          q: "Ви ведете справи українською?",
          a: "Так. Пояснюємо і листуємося українською, російською або іспанською. Самі modelo і повідомлення Hacienda виходять іспанською: перекладаємо і розбираємо, що від вас потрібно.",
        },
        {
          q: "Коли ставати на облік як autónomo?",
          a: "До початку діяльності: у Hacienda (modelo 036 або 037) і в соцстраху (RETA). Якщо рахунки вже виставляли без постановки на облік, це не привід діяти поспіхом: дивимося, як оформити коректно.",
        },
        {
          q: "У мене квартира в Аліканте, я нерезидент.",
          a: "Потрібна декларація нерезидента (IRNR): дохід від оренди або умовний дохід, якщо житло у вашому розпорядженні. Зазвичай потрібен податковий представник. Готуємо modelo 210 і календар під вашу ситуацію.",
        },
        {
          q: "Ви ведете і товариства, і autónomo?",
          a: "Так. SL, autónomo на estimación directa і нерезидентів. Якщо це міжнародна група або складна корпоративна угода, скажемо про це прямо на першій розмові.",
        },
        {
          q: "Як рахується винагорода?",
          a: "Щомісяця — за обсягом: рахунки, працівники, набір modelo. Або фіксована сума за окреме доручення. Суму фіксуємо письмово до початку роботи, без доплат, які спливають наприкінці кварталу.",
        },
        {
          q: "Обов’язково приїжджати в кабінет?",
          a: "Ні. Багато справ ведемо по відеозв’язку і через спільну теку. Довіреність, постановку на облік і частину підписів надійніше оформити на зустрічі в Аліканте.",
        },
      ],
    },
    contact: {
      eyebrow: "06 — Запис",
      title: "Опишіть вашу ситуацію.",
      lead: "Відповідаємо в робочий день. Якщо строк подання вже близько — напишіть про це в повідомленні.",
      name: "Ім’я",
      email: "Електронна пошта",
      phone: "Телефон (необов’язково)",
      profile: "Статус",
      profiles: {
        autonomo: "Autónomo",
        particular: "Фізична особа",
        sociedad: "Товариство",
        residente: "Нерезидент",
        other: "Інше",
      },
      message: "Повідомлення",
      messagePh: "Що потрібно зробити і який строк, якщо він уже близько.",
      gdpr: "Я ознайомився з політикою конфіденційності і погоджуюся на обробку цих даних, щоб Avenya відповіла на запит.",
      submit: "Надіслати запит",
      sending: "Надсилаємо…",
      successTitle: "Запит отримано.",
      successBody:
        "Відповімо на вказану пошту в робочий день. Якщо строк подання вже близько, повторіть це у відповідь на наш перший лист.",
      another: "Надіслати ще один запит",
      errors: {
        name: "Вкажіть ім’я.",
        email: "Вкажіть коректну пошту.",
        message: "Напишіть коротке повідомлення.",
        gdpr: "Щоб надіслати, потрібно прийняти політику конфіденційності.",
      },
      asideTitle: "Кабінет",
      channels: [
        { label: "695 343 196", href: "tel:+34695343196" },
        { label: "avenyaglobal@gmail.com", href: "mailto:avenyaglobal@gmail.com" },
        { label: "avenyaglobal.com", href: "https://avenyaglobal.com" },
        { label: "WhatsApp", href: "https://wa.me/34695343196" },
        {
          label: "Як дістатися",
          href: "https://maps.google.com/?q=Avenida+de+Juan+Sanchis+Candela+23A+Oficina+8+03015+Alicante",
        },
      ],
      aside: [
        "Avenida de Juan Sanchis Candela, 23A",
        "Oficina 8, 03015 Alicante",
        "Іспанія",
        "Понеділок — п’ятниця",
        "9:00–15:00",
        "За записом · також відеозв’язок",
      ],
      streetCaption: "Монумент «Пуерта дель Міленіо»",
    },
    footer: {
      tagline: "Податковий і бухгалтерський супровід в Аліканте.",
      address: "Avenida de Juan Sanchis Candela, 23A, Oficina 8, 03015 Alicante",
      rights: "Avenya. Усі права захищені.",
    },
    legal: {
      title: "Правова інформація",
      updated: "Оновлено: вересень 2026",
      blocks: [
        {
          h: "Власник сайту",
          p: "Avenya — кабінет податкового і бухгалтерського супроводу: Avenida de Juan Sanchis Candela, 23A, Oficina 8, 03015 Alicante, Іспанія. Найменування і NIF зазначаються в договорі доручення і в рахунках.",
        },
        {
          h: "Контакт",
          p: "Пишіть на avenyaglobal@gmail.com. Прийом за записом, у кабінеті або по відеозв’язку.",
        },
        {
          h: "Зміст сайту",
          p: "Сайт описує послуги Avenya. Це не індивідуальна консультація. Кожне доручення оформлюється письмово до подання modelo і до представництва в AEAT.",
        },
        {
          h: "Інтелектуальна власність",
          p: "Назва, логотип і матеріали сайту належать Avenya. Відтворення без дозволу не допускається, крім права цитування.",
        },
      ],
    },
    privacy: {
      title: "Політика конфіденційності",
      updated: "Оновлено: вересень 2026",
      blocks: [
        {
          h: "Оператор",
          p: "Avenya, Аліканте, Іспанія. Контакт: avenyaglobal@gmail.com.",
        },
        {
          h: "Які дані ми запитуємо",
          p: "У формі запису: ім’я, електронна пошта, телефон за бажанням, статус і текст повідомлення. Це дані, щоб відповісти на запит, а не податкове досьє.",
        },
        {
          h: "Навіщо і на якій підставі",
          p: "Щоб відповісти на запит про зустріч і, якщо доручення відбудеться, надати послугу. Підстава: заходи до укладення договору на ваше прохання і, коли договір укладено, сам договір. Позначка у формі підтверджує, що ви прочитали цю політику.",
        },
        {
          h: "Скільки зберігаємо",
          p: "Запити про зустріч зберігаємо, поки відповідаємо, і видаляємо, якщо доручення не було. Документи клієнтів — у строки торговельного і податкового законодавства.",
        },
        {
          h: "Файли cookie і локальне зберігання",
          p: "Файлів cookie для стеження і реклами немає. Обрану мову сайту зберігаємо лише в браузері на вашому пристрої.",
        },
        {
          h: "Ваші права",
          p: "Можна запитати доступ, виправлення, видалення, обмеження обробки, заперечення і перенесення: avenyaglobal@gmail.com. Скаргу можна подати до Іспанського агентства із захисту даних (aepd.es).",
        },
      ],
    },
  },
} as const;
