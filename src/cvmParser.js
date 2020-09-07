import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const headers = [
  'CD_CVM',
  'DENOM_SOCIAL',
  'DENOM_COMERC',
  'SETOR_ATIV',
  'PF_PJ',
  'CNPJ',
  'DT_REG',
  'DT_CONST',
  'DT_CANCEL',
  'MOTIVO_CANCEL',
  'SIT_REG',
  'DT_INI_SIT',
  'SIT_EMISSOR',
  'DT_INI_SIT_EMISSOR',
  'CATEG_REG',
  'DT_INI_CATEG',
  'AUDITOR',
  'CNPJ_AUDITOR',
  'TP_ENDER',
  'LOGRADOURO',
  'COMPL',
  'BAIRRO',
  'CIDADE',
  'UF',
  'PAIS',
  'CD_POSTAL',
  'TEL',
  'FAX',
  'EMAIL',
  'TP_RESP',
  'RESP',
  'DT_INI_RESP',
  'LOGRADOURO_RESP',
  'COMPL_RESP',
  'BAIRRO_RESP',
  'CIDADE_RESP',
  'UF_RESP',
  'PAIS_RESP',
  'CEP_RESP',
  'TEL_RESP',
  'FAX_RESPEMAIL_RESP',
  'TP_MERC',
  'BOLSA',
];

function processLineByLine(filename, callback) {
  const companies = [];
  const readInterface = createInterface({
    input: createReadStream(filename, { encoding: 'utf-8' }),
    crlfDelay: Infinity,
  });
  readInterface.on('line', (line) => {
    const company = {};
    line.split('\t').forEach((field, index) => {
      company[headers[index]] = field;
    });
    companies.push(company);
  });

  readInterface.on('close', () => {
    callback(companies);
  });
}

processLineByLine('SPW_CIA_ABERTA.txt', (companies) => {
  console.log(companies);
});
