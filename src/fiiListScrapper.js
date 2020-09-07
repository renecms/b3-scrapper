import axios from 'axios';
import cheerio from 'cheerio';

async function getAllFiis() {
  const fiiList = [];
  const { data } = await axios.get(
    'http://bvmf.bmfbovespa.com.br/Fundos-Listados/FundosListados.aspx?tipoFundo=imobiliario&Idioma=pt-br',
  );
  const $ = cheerio.load(data);

  $('#ctl00_contentPlaceHolderConteudo_divResultado > table > tbody > tr').each(
    (_idx, row) => {
      const $columns = $(row).find('td');
      fiiList.push({
        name: $columns.eq(0).text().trim(),
        fund: $columns.eq(1).text().trim(),
        segment: $columns.eq(2).text().trim(),
        ticker: $columns.eq(3).text().trim(),
      });
    },
  );

  return fiiList;
}

getAllFiis()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
