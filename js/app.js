
function createTextBlock(tagName, text)
{
    let textBlock = document.createElement(tagName);
    let textBlock_text = document.createTextNode(text);
    textBlock.append(textBlock_text);
    return textBlock;
}

function createSearchItem(searchData)
{
    let searchItem = document.createElement('div');
    searchItem.className = "searchResult__item";

    let searchItemTitle = createTextBlock('span', searchData.title);
    searchItemTitle.className = "searchResult__item__title";

    let searchItemDescription = createTextBlock('span', searchData.desc);
    searchItemDescription.className = "searchResult__item__desc";

    searchItem.append(searchItemTitle);
    searchItem.append(searchItemDescription);
    return searchItem;
}

let searchLine = '';
let searchUrl = 'https://jsonplaceholder.typicode.com'

searchField = document.getElementById('searchField');
searchField.onkeydown = searchField.onkeyup = searchField.onkeypress = searchHandler;

function searchHandler(e)
{
    let newSearchField = searchField.value;
    if (searchLine !== newSearchField)
    {
        searchLine = newSearchField;
        getSearchResult(searchLine);
    }
}

// searchList.remove();

function clearSearchList()
{
    for (let i = searchList.childNodes.length-1; i >= 0; i--)
    {
        console.log("removing child....", searchList.lastElementChild);
        searchList.removeChild(searchList.lastElementChild);
    }
}

async function getSearchResult(requestValue)
{
    if (requestValue === '')
    {

    }
    else
    {
        searchList.append(createSearchItem({title: "Good job", desc: "We have some good news"}));
        searchList.append(createSearchItem({title: "Hello world :))", desc: "We have some good news"}));
    }
    let searchCommentsUrl = searchUrl + '/' + requestValue + '/comments';
    let response = await fetch(searchCommentsUrl);
    let commits = await response.json();
    console.log(commits);
}


let searchList = document.getElementById('searchList');

searchList.append(createSearchItem({title: "Good job", desc: "We have some good news"}));
searchList.append(createSearchItem({title: "Hello world :))", desc: "We have some good news"}));

