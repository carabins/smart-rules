const ruleTypes = {
justHeading : "justHeading",   // - boolean
isPermanent : "isPermanent",          // -boolean Постоянное/переменное --
bindingToLaws : "bindingToLaws",       // -[массив строк] привязка к статьям законов (по ним потом можно парсить базу ФАС и судов)
keywords : "keywords",             // теги/ключевые слова (по ним тоже парсинг)
bindingToDirectories : "bindingToDirectories", //привязка к справочникам (базы данных или оф.сайты органов)
addNewSection : "addNewSection"       // 7 добавлять поле/раздел при ответе на определенный вопрос
}

const variables = {
contractNumber : {name : "Номер контракта" , question :"Введите номер контракта"}, //номер контракта
contractDate : {name : "Дата контракта", question :"Введите дату заключения контракта"}, //Дата  заключение контракта
//city : {name : "Город", question :"Введите город заключения контракта"}, // город
//customerOrganization :{name :"Организация" , question : "Введите наименование организации-закзчика"}, // название организации или возможность выбора из списка
//customerRepresentative :{name :"Руководитель" , question : "Введите должность, фамилию, имя, отчество(при наличии) представителя заказчика"},
//customercertificateOfAuthority:{name :"Доверенность или другое" , question : "Введите название и реквизиты правового акта, удостоверяющего полномочия  представителя заказчика"},
executor :{name : "Организация исполнитель", question : "Введите наименование организации, осуществляющей образовательную деятельность "}, // исполнитель
//licenseNumber :{name : "Лицензия", question : "Введите номер лицензии организации, осуществляющей образовательную деятельность "}, // номер лицензии
//licenseDate :{name :"Дата" , question : "Введите дату выдачи лицензии"}, // Дата выдачи
//licensingAuthority :{name : "Кем выдана", question : "Введите наименование лицензирующего органа"},
//registrationNumber : {name : "Рег.номер", question :"Введите регистрационный номер в реестре организаций, оказывающих   услуги   в   области    охраны   труда по обучению работодателей и работников вопросам охраны труда"},
//registrationNumberDate :{name : "Дата", question : "Введите дату получения регистрационного номера"},
executiveRepresentative :{name :"Представитель исполнителя" , question : "Введите должность, фамилия, имя, отчество (при наличии) представителя исполнителя"},  // ФИО исполнителя
executorCertificateOfAuthority:{name :"Довереность или другое" , question : "Введите название и реквизиты правового  акта, удостоверяющего полномочия представителя исполнителя"}, // (название и реквизиты правового  акта, удостоверяющего полномочия)
//auctionType : {name : "Тип аукциона", question :"Выбирите тип аукциона"}, // сделать список
//procurementNoticeNumber : {name : "Извещение", question :"Введите номер извещенния об осуществлении закупки"}, //№ извещение об осуществлении закупки
//procurementNoticeNumberDate : {name : "Дата", question :"Введите Дату извещенния об осуществлении закупки"},// извещение об осуществлении закупки Дата
//purchaseId :{name : "Код закупки", question : "Введите идентификационный код закупки"},
//contracBasis :{name : "Основания", question : "Введите основания для закупки"},
//contracBasisNumber :{name :"номер основания" , question : "Введите номер основания для закупки"},
//contracBasisDate :{name :"Дата основания" , question : "Введите дату основания для закупки"},
programName: {name : "Название программы", question :"Введите название образовательной программы"},
numberOfStudents :{name : "Коичество студентов", question : "Введите количество Обучающихся, подлежащих обучению по Программе - цифрами(прописью)"},
numberOfStages :{name : "Коичество этапов", question : "Введите количество этапов в соответствии с календарным планом оказания Услуг"},
endDate :{name : "Дата", question : "Введите дату окончания оказания услуг"},
serviceLocation :{name : "Место оказания услуг", question : "Укажите место оказания услуг"},
reportDate :{name :"Срок сдачи отчета" , question : "Укажите срок сдачи отчета либо сроки по каждому этапу оказания Услуг"},
contractPrice : {name :"Цена контракта" , question :"Укажите цену контракта -цифрами(прописью)- руб -цифрами- коп."},
valueAddedTax :{name : "НДС в процентах", question : "Укажите налог на добавленную стоимость ___процентов"},
valueAddedTaxCash : {name :"НДС" , question : "Укажите цену налога на добавленную стоимость -цифрами(прописью)- руб -цифрами- коп."},
oneStudentPrce :{name :"Стоимость" , question : "Укажите стоимость обучения одного обучающегося -цифрами(прописью)- руб -цифрами- коп."},
priceOfStage :{name : "Стоимость", question :  "Укажите стоимость обучения по 1 этапу -цифрами(прописью)- руб -цифрами- коп."},
advancePayment :{name : "Аванс", question : "Укажите рзмер авансового платежа в процентах от цены контракта 1 -го этапа оказания услуг"},
advancePaymentCash :{name :"Аванс" , question :"Укажите размер авансового платежа в  рублях  -цифрами(прописью)- руб -цифрами- коп"},
daysToPay :{name :"Коичество дней" , question : "Укажите количество дней для внесения аванса после предоставления Исполнителем счета"},
outsoursing :{name : "Процент соисполнителям", question : "Укажите процент от цены контракта на привлечение соисполнителей"},
receivingResults :{name : "Коичество дней", question : "Укажите количество дней на приемку результата заказчиком"},
claims :{name : "Коичество дней", question : "Укажите количество дней на отправку мотивированного отказа подписания акта сдачи приемки"},
reconciliation :{name :"Коичество дней" , question : "Укажите количество дней на предоставление акта сверки расчетов по контракту"},
//fines53 :{name :"Штраф" , question : "укажите размер штрафа в процентах"},
//finesCash53 :{name :"Штраф" , question : "Укажите размер штрафа в  рублях  -цифрами(прописью)- руб -цифрами- коп"},
//fines54 : {name : "Штраф", question :"укажите размер штрафа в процентах"},
//finesCash54 :{name : "Штраф", question : "Укажите размер штрафа в  рублях  -цифрами(прописью)- руб -цифрами- коп"},
///fines55 :{name : "Штраф", question : "укажите размер штрафа в процентах"},
//finesCash55 :{name :"Штраф" , question : "Укажите размер штрафа в  рублях  -цифрами(прописью)- руб -цифрами- коп"},
//fines56 : {name : "Штраф", question :"укажите размер штрафа в процентах"},
//finesCash56 : {name : "Штраф", question :"Укажите размер штрафа в  рублях  -цифрами(прописью)- руб -цифрами- коп"},
//fines57 :{name : "Штраф", question : "укажите размер штрафа в процентах"},
//finesCash57 :{name : "Штраф", question : "Укажите размер штрафа в  рублях  -цифрами(прописью)- руб -цифрами- коп"},
//fines58 :{name : "Штраф", question : "укажите размер штрафа в процентах"},
//finesCash58 :{name : "Штраф", question :"Укажите размер штрафа в  рублях  -цифрами(прописью)- руб -цифрами- коп"},

}


let newRule = (type, data, childs) =>{
	return {
		type,
		data,
		childs
	}
}
console.log(newRule(ruleTypes.justHeading, ruleTypes.isPermanent));
//let on = {ok:3, k:[]}
//let {k} = on

//isPermanent({
////	ansv:4
//})
//function isPermanent ({ansv,type}){
	//var result=false;