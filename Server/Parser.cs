using Flurl;
using Flurl.Http;
using HtmlAgilityPack;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server
{
    class Parser
    {
        const string host = "http://zakupki.gov.ru";
        public static async Task<string> ParseKTRU(string search)
        {
            var url = host
                .AppendPathSegment("epz/ktru/quicksearch/search.html")
                .SetQueryParams(new
                {
                    searchString = search,
                    strictEqual = "on",
                    pageNumber = 1,
                    sortDirection = "true",
                    recordsPerPage = "_10",
                    showLotsInfoHidden = "false",
                    active = "on",
                    activeESCKLP = "on",
                    okpd2IdsWithNested = "on",
                    sortBy = "ITEM_CODE"
                });
            var response = await url.GetStringAsync();
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(response);
            var aNode = htmlDoc.DocumentNode.SelectSingleNode("/html/body/div[2]/div/div[3]/div[1]/table/tbody/tr/td[2]/dt[1]/a");
            if (aNode is null)
                return JsonConvert.SerializeObject(new { Message = "Query count 0" });
            var href = aNode.Attributes["href"].Value;
            var query = Url.ParseQueryParams(Url.Combine(host, href));
            //----
            var linkToDescriptions = host
                .AppendPathSegment("epz/ktru/ktruCard/ktru-description.html")
                .SetQueryParam("itemId", query.FirstOrDefault().Value);
            response = await linkToDescriptions.GetStringAsync();
            htmlDoc.LoadHtml(response);
            var tableNode = htmlDoc.DocumentNode.SelectSingleNode("/html/body/div/div/div/div[4]/div/div[3]/table/tbody/tr/td/div/table/tbody");
            if (tableNode is null)
                return JsonConvert.SerializeObject(new { Message = "No parameters in object" });
            var alltd = tableNode.SelectNodes("tr").Select(tr => tr.SelectNodes("td").ToList()).ToList();

            var nameCharacteristics = new List<List<List<HtmlNode>>>();
            for (var i = 0; i < alltd.Count; i++)
            {
                var characteristic = new List<List<HtmlNode>>();
                if (alltd[i].Count == 3)
                    characteristic.Add(alltd[i]);
                i++;
                while (i < alltd.Count && alltd[i].Count == 2)
                {
                    characteristic.Add(alltd[i]);
                    i++;
                }
                i--;
                nameCharacteristics.Add(characteristic);
            }

            var jsonCS = new List<dynamic>();
            foreach (var characteristic in nameCharacteristics)
            {
                var plaintd = characteristic.SelectMany(td => td).Skip(1).ToList();
                var valueList = new List<string>();
                var unitList = new List<string>();
                for (var i = 0; i < plaintd.Count; i++)
                {
                    if (i % 2 == 0)
                        valueList.Add(plaintd[i].InnerText.Replace("\n", string.Empty));
                    else
                        unitList.Add(plaintd[i].InnerText.Replace("\n", string.Empty));
                }
                jsonCS.Add(new
                {
                    Title = characteristic[0][0].SelectSingleNode("div").InnerHtml,
                    IsMandatory = characteristic[0][0].SelectSingleNode("div[2]").InnerHtml.ToLowerInvariant().Contains("характеристика является обязательной"),
                    Value = valueList,
                    Unit = unitList
                });
            }
            return JsonConvert.SerializeObject(jsonCS, Formatting.Indented);  
        }
    }
}
