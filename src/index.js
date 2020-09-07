import { get } from 'axios';
import { load } from 'cheerio';

async function getLatestEvents() {
  const bonusList = [];
  const dividendList = [];
  const { data } = await get(
    'http://bvmf.bmfbovespa.com.br/cias-listadas/empresas-listadas/ResumoEventosCorporativos.aspx?codigoCvm=19348&tab=3&idioma=pt-br',
  );
  const $ = load(data);

  $('#ctl00_contentPlaceHolderConteudo_grdBonificacao_ctl01 > tbody > tr').each(
    (_idx, row) => {
      const $columns = $(row).find('td');
      const currentBonus = {};
      currentBonus.type = $columns.eq(0).text().trim();
      currentBonus.isin = $columns.eq(1).text().trim();
      currentBonus.newsDate = $columns.eq(2).text().trim();
      currentBonus.comDate = $columns.eq(3).text().trim();
      currentBonus.percentage = $columns.eq(4).text().trim();
      currentBonus.bonusIsin = $columns.eq(5).text().trim();
      currentBonus.observation = $columns.eq(6).text().trim();
      bonusList.push(currentBonus);
    },
  );

  $('#ctl00_contentPlaceHolderConteudo_grdDividendo_ctl01 > tbody > tr').each(
    (_idx, row) => {
      const $columns = $(row).find('td');
      const currentDividend = {};
      currentDividend.type = $columns.eq(0).text().trim();
      currentDividend.isin = $columns.eq(1).text().trim();
      currentDividend.newsDate = $columns.eq(2).text().trim();
      currentDividend.comDate = $columns.eq(3).text().trim();
      currentDividend.value = $columns.eq(4).text().trim();
      currentDividend.relativeTo = $columns.eq(5).text().trim();
      currentDividend.paymentDate = $columns.eq(6).text().trim();
      currentDividend.observation = $columns.eq(7).text().trim();
      dividendList.push(currentDividend);
    },
  );

  return { bonus: bonusList, dividends: dividendList };
}

async function getAllDividends(cvmCode) {
  const dividendList = [];
  const { data } = await get(
    `http://bvmf.bmfbovespa.com.br/cias-listadas/empresas-listadas/ResumoProventosDinheiro.aspx?codigoCvm=${cvmCode}&tab=3.1&idioma=pt-br`,
  );
  const $ = load(data);

  $('#ctl00_contentPlaceHolderConteudo_grdProventos_ctl01 > tbody > tr').each(
    (_idx, row) => {
      const $columns = $(row).find('td');
      const currentDividend = {};
      currentDividend.stockType = $columns.eq(0).text().trim();
      currentDividend.approvalDate = $columns.eq(1).text().trim();
      currentDividend.amount = $columns.eq(2).text().trim();
      currentDividend.amountPer = $columns.eq(3).text().trim(); // unit or thousand
      currentDividend.dividendType = $columns.eq(4).text().trim();
      currentDividend.comDate = $columns.eq(5).text().trim();
      currentDividend.lastPriceDate = $columns.eq(6).text().trim();
      currentDividend.comDatePrice = $columns.eq(7).text().trim();
      currentDividend.comDatePricePer = $columns.eq(8).text().trim(); // unit or thousand
      currentDividend.dividendByPrice = $columns.eq(9).text().trim();
      dividendList.push(currentDividend);
    },
  );

  return dividendList;
}

getAllDividends(19348)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));

getLatestEvents()
  .then((data) => {
    console.log(data.bonus);
    console.log(data.dividends);
  })
  .catch((err) => console.log(err));
