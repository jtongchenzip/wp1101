### wp1101 hw4
# TODO List in React
####  2021/11/1

## Requirements
### Basics
1. Only show the input box in the beginning, no todo-list nor the footer.
2. After entering text, the item is at the bottom of the list, and the checkbox is unchecked.
3. The checkbox becomes green and the text has decoration effect after clicking on the checkbox. 
4. The checkbox becomes unchecked after clicking on it again.
5. As long as there is more than one item, the footer shows up and displays the number of unchecked items on the left corner.
6. Show `All`, `Active`, `Completed`, and `Clear completed` buttons in the footer.

### Advance
1. `x-image` shows up when hovering on the item.
2. Delete item when clicking on the `x-image`.
3. The number of unchecked items shows the right amount after deleting items.
4. If there is no item in the list, hide the footer.
5. Show all items when clicking on the `All` button.
6. Only show unchecked items when clicking on the `Active` button.
7. Only show checked items when clicking on the `Completed` button.
8. When all the items is checked, show an empty list and a footer with `0 left`.
9. Only show `Clear completed` button when the number of checked items is bigger than 0.
10. Remove checked items when clicking on `Clear completed`.

## What I've done
1. All the basic requirements
2. All the Advance requirements
3. Reset the placeholder to `What needs to be done?` after entering a new item. 
4. Tried to classify `containers` and `components`, but I don't think it's perfect.

## Improvements
1. Duplicated codes
2. Could use more React hook
3. There's some pure JS codes, not sure of it's a bad thing


## How to run the app
`yarn install`  
`yarn start`

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.