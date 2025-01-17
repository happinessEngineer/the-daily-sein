const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'dialogue.json');
const outputFilePath = path.join(__dirname, './dialogue-excluding-tiny-characters.json');

const jsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));

const excluded_characters = [
'JOANNE','POLICE','JAY','RESTAURATEUR','OLIVE','TAMMY','JOEY','REMY','HILDE','JUDY','NICK','MARISA','AUCTIONEER','WALTER','MIRANDA','KERI','PENNY','CUSTOMER','HEYMAN','WEST','DEVOLA','CABBIE','SASHA','BARBARA','ERIC','ROBERT','LOUISE','SIENA','FARMER','FELDMAN','RAQUEL','MECHANIC','SHLOMO','RIVERA','CLAIRE','ROGER','MANYA','PHOTOGRAPHER','LIBRARIAN','BECKY','SKYCAP','BRYANT','BOY','PENSKY','VICTORIA','LEW','SANDY','TIERNEY','TEACHER','KIM','PHARMACIST','MABEL','JESSIE','DUGAN','THOMASSOULO','BOTH','ISAAC','ROXANNE','ANTONIO','SHERRY','JENNY','CHELSEA','TIMMY','LADY','TUTTLE','MACKENZIE','AL','MOM','WHATLEY','STEIN','PRIEST','LOTUS','GIGGIO','CLAYTON','TEDDY','ALEX','SAM','ADAM','TARA','BOOKIE','WELLS','BAILIFF','CHOATE','VIC','ASSISTANT','LORRAINE','INTERCOM','ISABEL','CHAUFFEUR','RUSSEL','DAVOLA','PRISONER','MOLLY','MARK','STAGEHAND','RESIDENT','RADIO','TARTABULL','SCOTT','HORST','DEENSFREI','ORGANIZER','PAT','HOOKER','CHARMAINE','DOLORES','GENE','CLICKY','RICARDI','REILLY','GUILLERMO','HAFFLER','ARNIE','MINKLER','SPONSOR','MAXWELL','VOGEL','PAMELA','POLICEMAN','LARRY','GLENDA','TABACHNICK','STEWARDESS','PATTI','MOLLIKA','ANGELA','GIRLFRIEND','DENISE','KLEIN','PAUL','CHARLES','FULTON','JOHNNY','SHOWALTER','DENTIST','ILENE','CASTRO','JOAN','MANDEL','CLYDE','IAN','AMANDA','IPSWITCH','ELDRIDGE','SHELLBACH','VINCENT','MOONEY','ZUBIN','LUBECK','WATKINS','ARTIE','SUSIE','STELLA','MARION','MOTHER','REPAIRMAN','PARAMEDIC','STACEY','HOUSEKEEPER','MONA','DOCTER','GEPETTO','CROWD','LINDSAY','ARONSON','JULIO','KARL','EMPLOYEE','DENNIS','SANSEI','LELAND','MALCOLM','PASSENGER','NEIGHBOR','MARIO','MACHINE','DEPUTY','AUDIENCE','BILL','ELAIEN','CHIROPRACTOR','READER','MARIAN','ROBERTA','TEL','BOYFRIEND','KERNIS','ROCHELLE','BARTENDER','MYRA','COWORKER','STRANGER','SON','MISHA','SPEAKER','BUDDY','PHONE','UMPIRE','ZEKE','SUPER','CEDRIC','FLORIST','DOLL','JIM','LISA','LETTERMAN','PLAYER','HEAD','AGENT','LYLE','FOWLER','PARRY','USHA','SPONSER','LEADER','ZACH','EALINE','COCO','CRESPI','ROBBER','NEPHEW','JANICE','ALICIA','MARTIN','GOERGE','CABBY','TVVOICE','KRMAER','NARRATOR','EVERYONE','HAIRDRESSER','WILTON','RENE','GIULIANI','MAILMAN','DIRECTOR','FIREMAN','COUNTERPERSON','TARTBULL','BECK','ELECTRICIAN','ADA','CLOTWORTHY','UKRAINIAN','BOSS','JEFF','STEFANIE','JERY','BRIDGET','MORGANEWMAN','GARDNER','GIRL','VARGUS','JEANINE','JETER','WILKIE','VET','MCADAM','NEIL','TAN','BRADY','NUN','FAN','PINTER','CHARLIE','ALISON','MAID','GROUP','WILCOX','FOREMAN','CLAIE','EULOGIST','BENES','GREENY','MARRY','PETER','INTERVIEWER','THUG','RICHIE','JERR','GEROGE','REFEREE','BIKER','COPS','REPORTERS','RICKEY','GROSSBARD','GX','SAILOR','WIFE','HUSBAND','EVERYBODY','ALLSION','ELIANE','PATIENT','NEWS','SPIKE','ECHO','BUSINESSMAN','ANNOUNCEMENT','CHAIRMAN','INTERPRETER','PHILBIN','HOSTESS','HENRY','MARIE','VOIGHT','APPLICANT','REPORTER','MAR','PETE','PASSERBY','BUZZER','WOMANEWMAN','NEWMANEWMAN','SUNNY','LIZ','MELANIE','FRIEND','GEOGE','GUAD','DISPATCHER','DUSTIN','ORDERLY','CARRERAS','RUTHIE','BOUNCER','EDDIT','EGO','WILLIAMS','ELANE','AENT','THERAPIST','SUPERVISOR','POSTMAN','VENDER','GAURD','RUSTY','NEMWAN','PROSTITUTE','MARCELLINO,'
];

const dataExcludingTinyChars = [];

for (const item of jsonData) {
	if (!excluded_characters.includes(item.character)) {
		dataExcludingTinyChars.push(item);
	}
}

fs.writeFileSync(outputFilePath, JSON.stringify(dataExcludingTinyChars, null, 2));
console.log('JSON file created successfully!');