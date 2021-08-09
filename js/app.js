
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

let searchList = document.getElementById('searchList');

searchList.append(createSearchItem({title: "Good job", desc: "We have some good news"}));
searchList.append(createSearchItem({title: "Hello world :))", desc: "We have some good news"}));
