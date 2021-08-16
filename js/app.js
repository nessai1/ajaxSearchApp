
class App
{
    constructor(requestURL)
    {
        this.requester = new DataRequester(requestURL);
        this.searchBlock = new SearchEntity();
    }
}

class SearchEntity
{
    constructor()
    {
    }
}

class DataRequester
{
    constructor(requestURL)
    {
        this.requestURL = requestURL;
    }
}

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

function getNotFound()
{
    return document.getElementById("notFound");
}


function clearNotFound()
{
    let notFound = getNotFound();
    if (notFound === null)
    {
        return;
    }

    notFound.remove();
}

function setNotFound()
{
    if (getNotFound() !== null)
    {
        return;
    }

    let notFound = document.createElement('div');
    notFound.id = 'notFound';
    notFound.className = 'notFoundBlock';

    let notFoundText = document.createElement('h3')
    notFoundText.className = 'notFoundBlock__text';
    notFoundText.textContent = 'Ничего не найдено :(';

    notFound.appendChild(notFoundText);

    let app = document.getElementById('app');
    app.appendChild(notFound);
}

function refreshSearchList()
{
    clearSearchList();
    clearNotFound();
    setSearchList();
}

function getSearchList()
{
    return document.getElementById('searchList');
}

function setSearchList()
{
    if (getSearchList() !== null)
    {
        return;
    }

    let searchList = document.createElement('div');
    searchList.id = 'searchList';
    searchList.className = 'searchResult';
    let app = document.getElementById('app');
    app.appendChild(searchList);
}

// searchList.remove();

function clearSearchList()
{
    let searchList = getSearchList();
    if (searchList === null)
    {
        return;
    }

    searchList.remove();
}

function fillSearchList(searchItems)
{
    refreshSearchList();
    searchList = getSearchList();
    for (let i = 0; i < searchItems.length; i++)
    {
        searchList.append(createSearchItem({title: searchItems[i].email, desc: searchItems[i].body}));
    }
}

async function getSearchResult(requestValue)
{
    let searchList = getSearchList();
    if (requestValue === '')
    {
        clearSearchList();
        clearNotFound();
        return;
    }

    let searchCommentsUrl = searchUrl + '/posts/' + requestValue + '/comments';
    let response = await fetch(searchCommentsUrl);
    let commits = await response.json();
    if (commits.length === 0)
    {
        clearSearchList();
        setNotFound();
        return;
    }

    fillSearchList(commits);
}



